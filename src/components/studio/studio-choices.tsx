import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Images, Sparkles, CalendarDays, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { whatsappUrl } from '@/lib/whatsapp';

export function WhatsAppButton({ message }: { message?: string | undefined }) {
  return <Button variant="whatsapp" asChild><a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Agendar por WhatsApp <ArrowUpRight /></a></Button>;
}

export function StudioChoices() {
  return <section className="studio-choices-section">
    <div className="section-heading"><div><span className="eyebrow">O universo Space LaBelle</span><h2 className="editorial-title">O que vamos criar hoje?</h2></div><span className="choices-signature">Arte nas mãos.<br />Cuidado em cada escolha.</span></div>
    <div className="studio-choices">
      <Button variant="choice" asChild><Link className="studio-choice" to="/catalogo"><span className="choice-top"><Images /><span>01</span></span><span className="choice-title">Seu próximo estilo</span><span className="choice-description">Cores, detalhes e inspirações.</span><span className="choice-bottom">Explorar catálogo <ArrowUpRight /></span></Link></Button>
      <Button variant="choice" asChild><Link className="studio-choice" to="/servicos"><span className="choice-top"><Sparkles /><span>02</span></span><span className="choice-title">Cuidado que encanta</span><span className="choice-description">Um acabamento. Mil possibilidades.</span><span className="choice-bottom">Conhecer serviços <ArrowUpRight /></span></Link></Button>
      <Button variant="choice" asChild><Link className="studio-choice" to="/agendamento"><span className="choice-top"><CalendarDays /><span>03</span></span><span className="choice-title">Um momento só seu</span><span className="choice-description">Vamos planejar sua próxima visita.</span><span className="choice-bottom">Escolher meu cuidado <ArrowUpRight /></span></Link></Button>
    </div><div className="choices-contact"><span>Prefere conversar com a gente?</span><WhatsAppButton /></div>
  </section>;
}