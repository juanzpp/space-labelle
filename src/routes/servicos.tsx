import {createFileRoute} from '@tanstack/react-router';
import {Services, BookingBand, StudioHeader, StudioFooter} from '@/components/studio/studio';
import {studioHead} from '@/components/studio/data';
export const Route=createFileRoute('/servicos')({head:()=>studioHead('Serviços de nail design — Space LaBelle','Explore alongamento, esmaltação em gel, nail art e cuidados com suas unhas na Space LaBelle.'),component:ServicesPage});
function ServicesPage(){return <><StudioHeader/><Services/><BookingBand/><StudioFooter/></>}