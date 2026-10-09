import { describe, expect, it } from 'vitest';
import { HD_FRAME_WIDTH, HD_FRAME_HEIGHT, HD_ATLAS_FRAMES, hdOrbitAtlases } from './orbit-hd-atlases';
describe('Full HD orbit', () => {
  it('uses original 1920 by 1080 frame resolution', () => {
    expect(HD_FRAME_WIDTH).toBe(1920);
    expect(HD_FRAME_HEIGHT).toBe(1080);
  });
  it('contains all 480 frames for the 60fps orbit', () => {
    expect(hdOrbitAtlases.length * HD_ATLAS_FRAMES).toBe(480);
    expect(hdOrbitAtlases.filter(asset => asset?.url).length).toBe(120);
  });
});