import { describe, expect, it } from 'vitest';
import { whatsappUrl } from './whatsapp';
describe('Studio WhatsApp', () => {
  it('opens the Brazilian studio number provided by the owner', () => {
    expect(new URL(whatsappUrl()).pathname).toBe('/5583993086836');
  });
  it('preserves the desired appointment details in the conversation', () => {
    const message = 'Olá, sou Ana. Quero Nail art personalizada em 15/10/2026.';
    expect(new URL(whatsappUrl(message)).searchParams.get('text')).toBe(message);
  });
});