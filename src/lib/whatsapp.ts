export const STUDIO_WHATSAPP = '5583993086836';
export function whatsappUrl(message = 'Olá! Gostaria de agendar meu momento na Space LaBelle. Podemos conversar sobre os serviços e horários?') {
  return `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(message)}`;
}