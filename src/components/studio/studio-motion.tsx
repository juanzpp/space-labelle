import { useEffect, useRef, type ReactNode } from 'react';

export function useStageMotion(stage: number) {
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let active = true;
    let dispose = () => {};
    void import('gsap').then(({ gsap }) => {
      if (!active || !scope.current) return;
      const context = gsap.context(() => {
        gsap.from('.stage-content > *', { y: 12, opacity: 0, duration: .55, stagger: .06, ease: 'power2.out', clearProps: 'transform,opacity' });
      }, scope);
      dispose = () => context.revert();
    }).catch(() => {
      // Optional motion must never turn a failed module download into a page error.
      scope.current?.querySelectorAll<HTMLElement>('.stage-content > *').forEach(element => {
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
      });
    });
    return () => { active = false; dispose(); };
  }, [stage]);
  return scope;
}

export function StudioMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let active = true;
    let dispose = () => {};
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!active || !scope.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = scope.current?.querySelectorAll('.studio-choice, .nail-item, .service-row, .booking-band');
        targets?.forEach(target => {
          gsap.from(target, { y: 24, opacity: 0, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: target, start: 'top 94%', once: true }, clearProps: 'transform,opacity' });
        });
      }, scope);
      dispose = () => media.revert();
    }).catch(() => {
      // Keep the studio fully visible and usable if the animation bundle is unavailable.
      dispose();
      scope.current?.querySelectorAll<HTMLElement>('.studio-choice, .nail-item, .service-row, .booking-band').forEach(element => {
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
      });
    });
    return () => { active = false; dispose(); };
  }, []);
  return <div ref={scope}>{children}</div>;
}