# AF · Estudio Creativo

Sitio web del estudio creativo **AF** (Venado Tuerto, Santa Fe). Identidad visual, packaging,
papelería para eventos e ilustración.

Sitio estático (HTML + CSS + JS vanilla, sin build). Se sirve tal cual desde la raíz del repo
(apto para GitHub Pages).

## Estructura

```
index.html                 · página
styles/main.css            · design system + estilos
styles/fonts/*.woff2       · fuentes self-hosted (Fraunces + Inter)
scripts/main.js            · mejoras progresivas (menú mobile, contacto)
images/                    · imágenes optimizadas (webp + jpg)
robots.txt · sitemap.xml · manifest.webmanifest · favicon.ico · apple-touch-icon.png
```

## Desarrollo local

```bash
python3 -m http.server 8099
# abrir http://localhost:8099
```

## Antes de publicar

Reemplazar el dominio placeholder `https://afestudiocreativo.com.ar/` por el dominio real en
`index.html` (canonical, Open Graph, JSON-LD), `sitemap.xml` y `robots.txt`.
