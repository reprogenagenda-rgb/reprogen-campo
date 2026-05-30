# REPROGEN CAMPO — PWA V1.0

App de campo (single-file HTML, ES5 puro, offline-first) para manejo reprodutivo
bovino e bubalino — D0, IATF, DG, DG FINAL, MN, Concept Plus, auditoria e relatórios.
Esta versão adiciona **camada PWA** (instalável no Android e desktop, abre offline
após o primeiro acesso). **Nenhuma regra interna do app foi alterada.**

## Arquivos
- `index.html` — o app (base V10.25, com a camada PWA embutida)
- `manifest.json` — identidade do app instalável
- `service-worker.js` — cache do app shell (funciona offline)
- `icons/icon-192.png`, `icons/icon-512.png` — ícones de instalação

> Mantenha **todos os arquivos juntos**, preservando a pasta `icons/`.
> Os caminhos são relativos, então funcionam em subpasta do GitHub Pages.

## Publicar no GitHub Pages (passo a passo)

1. Crie um repositório no GitHub (ex.: `reprogen-campo`).
2. Envie estes arquivos para a raiz do repositório, mantendo a estrutura:
   ```
   index.html
   manifest.json
   service-worker.js
   icons/icon-192.png
   icons/icon-512.png
   README.md
   ```
   Pelo site: **Add file → Upload files** (arraste tudo, inclusive a pasta `icons`).
   Pelo terminal:
   ```bash
   git init
   git add .
   git commit -m "REPROGEN CAMPO PWA V1.0"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/reprogen-campo.git
   git push -u origin main
   ```
3. No repositório: **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
5. Selecione **Branch: `main`** e pasta **`/ (root)`** → **Save**.
6. Aguarde ~1 minuto. O endereço será:
   `https://SEU_USUARIO.github.io/reprogen-campo/`

## Instalar no celular (Android / Chrome)
1. Abra o endereço acima no **Chrome**.
2. Toque no menu **⋮** → **Adicionar à tela inicial** (ou aceite o aviso "Instalar app").
3. O REPROGEN abre como app, em tela cheia, e funciona **offline** depois do 1º acesso.

## Atualizar o app depois
Ao subir uma nova versão, altere o nome do cache em `service-worker.js`
(ex.: `reprogen-campo-pwa-v1` → `...-v2`). Isso força a atualização nos aparelhos.

## Requisitos
- **HTTPS** (o GitHub Pages já fornece). Service workers não funcionam em `file://`.
- Não abra o app por arquivo local: use o endereço `https://...github.io/...`.
