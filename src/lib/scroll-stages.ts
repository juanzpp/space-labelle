export const INTRO_STAGES = 5;
export const ORBIT_FPS = 60;
export const ORBIT_FRAMES = ORBIT_FPS * 8;
export function getOrbitFrame(progress: number) {
 return Math.round(Math.min(1, Math.max(0, progress)) * (ORBIT_FRAMES - 1));
}
export function getScrollStage(distance: number, viewport: number) {
 if (viewport <= 0) return 0;
 return Math.min(INTRO_STAGES, Math.max(0, Math.floor(distance / viewport)));
}