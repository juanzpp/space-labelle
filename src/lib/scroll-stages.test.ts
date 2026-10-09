import { describe, expect, it } from 'vitest';
import { ORBIT_FPS, ORBIT_FRAMES, getOrbitFrame, getScrollStage } from './scroll-stages';
describe('five scroll reveal', () => {
 it('does not complete before five viewport scrolls', () => {
  expect(getScrollStage(4999, 1000)).toBe(4);
 });
 it('reveals the full site at the fifth viewport scroll', () => {
  expect(getScrollStage(5000, 1000)).toBe(5);
  expect(getScrollStage(9000, 1000)).toBe(5);
 });
});
describe('scroll hand angles', () => {
 it('changes the real hand angle on each scroll movement', () => {
  expect(getOrbitFrame(0)).toBe(0);
   expect(getOrbitFrame(0.2)).toBe(96);
   expect(getOrbitFrame(0.4)).toBe(192);
   expect(getOrbitFrame(1)).toBe(479);
 });
 it('returns to an earlier angle when scrolling back', () => {
   expect(getOrbitFrame(0.8)).toBe(383);
   expect(getOrbitFrame(0.2)).toBe(96);
 });
 it('provides 60 interpolated frames per second for the eight-second orbit', () => {
  expect(ORBIT_FPS).toBe(60);
  expect(ORBIT_FRAMES).toBe(480);
 });
});