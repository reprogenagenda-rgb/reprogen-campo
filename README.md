# REPROGEN CAMPO — PWA V07

Correção do bug em que o código do Service Worker aparecia visualmente no rodapé do app.

Causa:
- A rotina anterior mexeu no final do HTML.
- O index do REPROGEN tem biblioteca XLSX inline e textos internos com </body>.
- Isso pode quebrar a posição do fechamento real do body.

Correção V07:
- index reconstruído a partir do original enviado.
- Somente o HEAD real foi atualizado.
- O final do HTML foi preservado.
- Service worker recebeu novo CACHE_NAME para forçar atualização.
