import hero from '@/assets/nail-hero.jpg';
import cherry from '@/assets/nails-cherry.jpg';
import french from '@/assets/nails-french.jpg';
export const designs = [
 { id:'french', name:'French, reinventada', category:'Clássicas', detail:'Delicada. Atemporal. Sempre sua.', image:french },
 { id:'cherry', name:'Cherry mood', category:'Cores', detail:'Um toque de intensidade.', image:cherry },
 { id:'bloom', name:'Little details', category:'Nail art', detail:'Pequenos detalhes, muita personalidade.', image:hero },
];
export const services = [
 { name:'Alongamento em gel', detail:'Formato e comprimento pensados para as suas mãos.' },
 { name:'Esmaltação em gel', detail:'Cor, brilho e um acabamento impecável.' },
 { name:'Nail art personalizada', detail:'Uma criação única, do minimalismo aos pequenos detalhes.' },
 { name:'Manutenção & cuidado', detail:'Um novo encontro para manter suas unhas bonitas e saudáveis.' },
];
export const studioHead = (title:string, description:string) => ({ meta:[{title}, {name:'description',content:description}, {property:'og:title',content:title}, {property:'og:description',content:description}, {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}] });