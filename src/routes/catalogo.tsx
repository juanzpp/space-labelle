import {createFileRoute} from '@tanstack/react-router';
import {Catalog, StudioHeader, StudioFooter} from '@/components/studio/studio';
import {studioHead} from '@/components/studio/data';
export const Route=createFileRoute('/catalogo')({head:()=>studioHead('Catálogo de nail art — Space LaBelle','Encontre seu estilo entre francesinhas, cores e nail art no catálogo Space LaBelle.'),component:CatalogPage});
function CatalogPage(){return <><StudioHeader/><Catalog full/><StudioFooter/></>}