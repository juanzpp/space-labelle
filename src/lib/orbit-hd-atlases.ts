type OrbitAsset = { url: string };
const assets = import.meta.glob<OrbitAsset>('../assets/nail-hd-*.webp.asset.json', { eager: true, import: 'default' });
export const hdOrbitAtlases = Array.from({ length: 120 }, (_, index) => assets[`../assets/nail-hd-${index}.webp.asset.json`]);
export const HD_ATLAS_FRAMES = 4;
export const HD_ATLAS_COLUMNS = 2;
export const HD_FRAME_WIDTH = 1920;
export const HD_FRAME_HEIGHT = 1080;