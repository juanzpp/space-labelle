# Space LaBelle — migração independente

Código original do Nailé copiado para esta branch e renomeado para Space LaBelle.

## Estado

- Páginas e componentes React copiados.
- 136 manifestos de imagens de animação copiados, com URLs do site publicado.
- Arquivos JPEG binários originais e os 136 arquivos WebP ainda **não** foram incorporados ao repositório.
- A configuração do Vite foi substituída por plugins públicos (sem o plugin de build do Lovable).
- O build **não foi validado** e pode exigir ajustes.
- Não mescle com main nem publique antes de concluir os ativos e testar.

## Instalação

Node.js 22+ recomendado. Execute `npm install` e `npm run dev`. Para produção, execute `npm run build` e valide a saída do TanStack Start na plataforma de hospedagem.

## Imagens

Os manifestos em `src/assets/*.asset.json` referenciam URLs do site publicado original. Essas URLs não representam arquivos independentes. Para independência completa, copie os WebP e JPG originais para `public/assets`, atualize cada campo `url` para `/assets/<arquivo>`, e confirme que os arquivos carregam em uma nova hospedagem. Os três imports JPG do código-fonte (`nail-hero.jpg`, `nails-cherry.jpg`, `nails-french.jpg`) também precisam ser restaurados em `src/assets`.

## Agendamento

O formulário original apenas prepara uma solicitação e direciona ao WhatsApp; não existe disponibilidade de agenda integrada ou reserva confirmada.
