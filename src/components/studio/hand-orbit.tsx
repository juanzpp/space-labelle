import { useEffect, useRef, useState, type RefObject } from 'react';
const poster = 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=85';
import { getOrbitFrame } from '@/lib/scroll-stages';
import { ATLAS_COLUMNS, ATLAS_FRAMES, orbitAtlases } from '@/lib/orbit-atlases';
import { HD_ATLAS_FRAMES, HD_ATLAS_COLUMNS, HD_FRAME_WIDTH, HD_FRAME_HEIGHT, hdOrbitAtlases } from '@/lib/orbit-hd-atlases';

export function HandOrbit({ progress }: { progress: RefObject<number> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const surface = canvas.current;
    const context = surface?.getContext('2d', { alpha: false });
    if (!surface || !context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cache = new Map<number, ImageBitmap>();
    const hdCache = new Map<number, ImageBitmap>();
    const hdPending = new Map<number, AbortController>();
    const pending = new Set<number>();
    let active = true;
    let desiredPage = 0;
    let painted = -1;
    let paintedHD = false;
    let desiredHDPage = 0;
    let current = progress.current;
    let last = 0;
    let animation = 0;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    const loadHD = (index: number) => {
      const asset = hdOrbitAtlases[index];
      if (!asset || hdCache.has(index) || hdPending.has(index)) return;
      const controller = new AbortController();
      hdPending.set(index, controller);
      void fetch(asset.url, { signal: controller.signal }).then(response => {
        if (!response.ok) throw new Error('HD angle unavailable');
        return response.blob();
      }).then(blob => createImageBitmap(blob)).then(bitmap => {
        if (!active || controller.signal.aborted || Math.abs(index - desiredHDPage) > 1) { bitmap.close(); return; }
        hdCache.set(index, bitmap);
        while (hdCache.size > 2) {
          const discard = [...hdCache.keys()].find(key => key !== desiredHDPage && key !== index);
          if (discard === undefined) break;
          hdCache.get(discard)?.close();
          hdCache.delete(discard);
        }
      }).catch(() => {}).finally(() => { if (hdPending.get(index) === controller) hdPending.delete(index); });
    };
    const load = (index: number) => {
      const asset = orbitAtlases[index];
      if (!asset || cache.has(index) || pending.has(index)) return;
      pending.add(index);
      void fetch(asset.url).then(response => {
        if (!response.ok) throw new Error('Angle unavailable');
        return response.blob();
      }).then(blob => createImageBitmap(blob)).then(bitmap => {
        if (!active || Math.abs(index - desiredPage) > 1) { bitmap.close(); return; }
        cache.set(index, bitmap);
      }).catch(() => {}).finally(() => { pending.delete(index); });
    };
    const tick = (time: number) => {
      animation = requestAnimationFrame(tick);
      const delta = last ? Math.min(50, time - last) : 1000 / 60;
      last = time;
      if (document.hidden) return;
      current += (progress.current - current) * (1 - Math.exp(-delta / 85));
      const angle = reduced.matches ? 0 : getOrbitFrame(current);
      const page = Math.floor(angle / ATLAS_FRAMES);
      const hdPage = Math.floor(angle / HD_ATLAS_FRAMES);
      desiredHDPage = hdPage;
      for (const [index, controller] of hdPending) {
        if (Math.abs(index - hdPage) > 1) { controller.abort(); hdPending.delete(index); }
      }
      loadHD(hdPage);
      if (!reduced.matches) loadHD(hdPage + (progress.current >= current ? 1 : -1));
      desiredPage = page;
      load(page);
      if (!reduced.matches) { load(page + 1); load(page - 1); }
      const hdBitmap = hdCache.get(hdPage);
      const bitmap = hdBitmap ?? cache.get(page);
      const isHD = !!hdBitmap;
      if (bitmap && (angle !== painted || isHD !== paintedHD)) {
        const local = angle % (isHD ? HD_ATLAS_FRAMES : ATLAS_FRAMES);
        const columns = isHD ? HD_ATLAS_COLUMNS : ATLAS_COLUMNS;
        const width = isHD ? HD_FRAME_WIDTH : 640;
        const height = isHD ? HD_FRAME_HEIGHT : 360;
        context.drawImage(bitmap, (local % columns) * width, Math.floor(local / columns) * height, width, height, 0, 0, surface.width, surface.height);
        surface.dataset['frame'] = String(angle);
        surface.dataset['quality'] = isHD ? 'full-hd' : 'preview';
        if (painted < 0) setReady(true);
        painted = angle;
        paintedHD = isHD;
      }
      for (const [index, image] of cache) {
        if (Math.abs(index - page) > 1) { image.close(); cache.delete(index); }
      }
      for (const [index, image] of hdCache) {
        if (Math.abs(index - hdPage) > 1) { image.close(); hdCache.delete(index); }
      }
    };
    animation = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(animation);
      for (const image of cache.values()) image.close();
      cache.clear();
      for (const controller of hdPending.values()) controller.abort();
      for (const image of hdCache.values()) image.close();
      hdCache.clear();
    };
  }, [progress]);
  return <div className="hand-orbit" data-ready={ready}>
    <img className="orbit-poster" src={poster} alt="Mãos com unhas amendoadas em rosa e pequenos detalhes de cereja" width={1600} height={1008} fetchPriority="high" />
    <canvas ref={canvas} className="orbit-angles" width={HD_FRAME_WIDTH} height={HD_FRAME_HEIGHT} role="img" aria-label="Giro das unhas em tela inteira acompanhado pela rolagem" />
  </div>;
}