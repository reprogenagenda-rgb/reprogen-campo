# Reprogen Campo — PWA (GitHub Pages)

App de campo para manejo reprodutivo bovino/bubalino (IATF, D0, DG, DG Final,
Monta Natural, Concept Plus). Funciona **offline** depois da primeira abertura.

Versão atual: **PWA V1.0.2** (status recalculado pela IATF vigente na importação).

## Estrutura dos arquivos (subir TODOS na raiz do repositório)

```
/  (raiz do GitHub Pages)
├── index.html              ← o app (arquivo único)
├── manifest.json           ← manifest PWA (ícones regulares + maskable)
├── service-worker.js       ← cache offline
├── favicon.ico             ← favicon padrão (/favicon.ico)
└── icons/
    ├── favicon.ico
    ├── icon-48x48.png
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-180x180.png        (apple-touch-icon)
    ├── icon-192x192.png        (regular)
    ├── icon-256x256.png
    ├── icon-384x384.png
    ├── icon-512x512.png        (regular)
    ├── icon-maskable-192x192.png
    └── icon-maskable-512x512.png
```

> Mantenha os caminhos **relativos** (como acima). Assim funciona tanto em
> `usuario.github.io/repo/` quanto em domínio próprio.

## Como publicar

1. Suba todos os arquivos acima para o repositório (raiz).
2. Em **Settings → Pages**, defina a branch (ex.: `main`) e a pasta `/ (root)`.
3. Abra `https://SEU-USUARIO.github.io/SEU-REPO/` no celular.
4. No Chrome/Android: menu → **Instalar app / Adicionar à tela inicial**.
   O ícone Reprogen aparece na tela inicial.

## A CADA NOVA VERSÃO (passo que não pode esquecer)

Quando trocar o `index.html` ou os ícones, **suba o número do cache** no
`service-worker.js`:

```js
var CACHE_VERSION = 'v2';   // troque para 'v3', 'v4'...
```

Sem isso, o aparelho pode continuar abrindo a versão antiga guardada em cache.
Depois de subir, feche e reabra o app — confira o selo de versão no topo.

## Notas técnicas

- `index.html` é single-file (HTML+CSS+JS embutidos, ES5, XLSX inline) — roda offline.
- O service worker usa **network-first na navegação** (pega a versão nova quando há
  internet) e **cache-first** para ícones/recursos.
- O manifest inclui ícones **regulares** (`purpose: any`) e **maskable**
  (`purpose: maskable`) — Android escolhe o adequado para a tela inicial.
- `theme_color`/`background_color`: `#0f1012` (mesmo tom do app).
