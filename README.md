# Tec Tech Day 2026 — Landing

Sitio estático del evento académico **Tec Tech Day 2026**, organizado por  **GDLDevComms** y la **academia ISC del TSJ Zapopan** para estudiantes de Ingeniería en Sistemas Computacionales.

- **Fecha:** 28 de mayo de 2026
- **Sede:** Edificio “L”, Laboratorios de Sistemas
- **Talleres simultáneos:** 9:00 a 12:00 (LIA, LTI, LIS)

Hecho con **HTML, CSS y JavaScript puros** — sin frameworks, sin paso de build. Listo para publicarse en **GitHub Pages**.

---

## Estructura del proyecto

```
tec-tech-day-2026/
├── index.html        # Marcado semántico, SEO, OG, secciones
├── styles.css        # Diseño dark-first, responsivo, tokens en :root
├── script.js         # Countdown, nav móvil, scroll-reveal, link activo
├── assets/
│   ├── logo.svg      # Logo principal (inline en el sitio también)
│   └── favicon.svg   # Favicon vectorial
└── README.md
```

No requiere `npm install`, ni bundler, ni servidor de aplicación.

---

## Vista previa local

Cualquier servidor estático sirve. Recomendado para evitar restricciones de `file://`:

```bash
# Python 3
python3 -m http.server 8080

# Node (sin instalar)
npx serve .
```

Luego abrir <http://localhost:8080>.

---

## Publicar en GitHub Pages

### Opción A · Rama `main`, carpeta raíz (la más simple)

1. Crea un repositorio nuevo en GitHub, por ejemplo `tec-tech-day-2026`.
2. Sube este proyecto:

   ```bash
   git init
   git add .
   git commit -m "feat: sitio Tec Tech Day 2026"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/tec-tech-day-2026.git
   git push -u origin main
   ```

3. En GitHub, ve a **Settings → Pages**.
4. En **Source**, elige **Deploy from a branch**.
5. Selecciona la rama **`main`** y la carpeta **`/ (root)`**. Guarda.
6. Espera un par de minutos. GitHub mostrará la URL pública:
   - `https://<tu-usuario>.github.io/tec-tech-day-2026/`

### Opción B · Sitio de usuario (`<usuario>.github.io`)

Si quieres alojarlo en la raíz de tu dominio de GitHub:

1. Crea un repo llamado **exactamente** `<tu-usuario>.github.io`.
2. Sube los archivos (mismo procedimiento que arriba).
3. Pages lo publicará automáticamente en `https://<tu-usuario>.github.io/`.

### Opción C · GitHub Actions (opcional)

Si prefieres workflow, crea `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: "."
      - id: deployment
        uses: actions/deploy-pages@v4
```

Luego en **Settings → Pages → Build and deployment → Source** elige **GitHub Actions**.

---

## Reemplazar el logo por `TSJ1.png` (si lo subes al repo)

El sitio usa un logo SVG propio en `assets/logo.svg` y un mark inline dentro de `index.html` (header y footer) para mantenerlo nítido en cualquier resolución y respetar el modo oscuro.

Si en el futuro quieres usar la imagen institucional `TSJ1.png`:

1. Copia el archivo en `assets/TSJ1.png`.
2. En `index.html`, sustituye **ambos** bloques `<svg>` dentro de `.brand__logo` (header y footer) por:

   ```html
   <img
     src="assets/TSJ1.png"
     alt="TSJ Zapopan"
     width="28"
     height="28"
     style="border-radius: 6px; object-fit: contain;"
   />
   ```

3. Si además quieres reemplazar el favicon, agrega un PNG de 32×32 y cambia en `<head>`:

   ```html
   <link rel="icon" type="image/png" href="assets/TSJ1.png" />
   ```

   (Puedes dejar también el `favicon.svg` como fallback.)

---

## Decisiones de diseño

- **Dark-first** con acento lime `#A3E635` (inspirado en estética developer tipo `mouredev.pro`, `midu.dev`).
- **Tipografías:** Inter (UI) + JetBrains Mono (labels, metadatos, "kicker").
- **Layout:** mucho espacio negativo, tarjetas con bordes sutiles, grilla decorativa sutil de fondo.
- **CTAs claros:** botón primario lime para registro, botón fantasma para encuesta.
- **Microinteracciones sobrias:** countdown, hover suave en tarjetas, reveal al hacer scroll, cursor parpadeante en el hero.
- **Accesibilidad:**
  - Contraste WCAG AA en todos los textos sobre fondos.
  - `:focus-visible` con anillo lime de alta visibilidad.
  - Navegación por teclado completa, `skip-link` al contenido.
  - HTML semántico (`header`, `main`, `section`, `article`, `footer`, `details/summary`).
  - Respeta `prefers-reduced-motion`.
- **SEO:** title, meta description, Open Graph y Twitter Card.
- **Links externos:** `target="_blank"` + `rel="noopener noreferrer"`.
- **Sin `localStorage`** ni dependencias externas (sólo Google Fonts vía CDN).

---

## Contenido del evento

| Campo            | Valor                                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| Nombre           | Tec Tech Day 2026                                                        |
| Fecha            | 28 / 05 / 2026                                                           |
| Público          | Estudiantes ISC                                                          |
| Organiza         | GDLDevComms · Academia ISC                                               |
| Registro         | <https://forms.gle/TuuN6CB5kGeCkYbu8>                                    |
| Encuesta         | <https://forms.gle/U7kh5zRiP5eq29es6>                                    |
| Sede             | Edificio “L”, Laboratorios de Sistemas                                   |
| Talleres         | 9:00 – 12:00 (simultáneos)                                               |

### Talleres

| Lab | Título                                                        | Ponente(s)                                    |
| --- | ------------------------------------------------------------- | --------------------------------------------- |
| LIA | Tu primera app mobile                                         | Sinuhe Jaime Valencia                         |
| LTI | GitHub Copilot & Claude: from the beginning to build a small service | Orlando Cano · Christian Gómez         |
| LIS | Introducción a la línea de comandos                           | Juan Carlos Sedano · Daniel Delgado Vargas    |

---

## Actualizar el contenido

Toda la información editable vive en `index.html`. Para cambiar:

- **Horario / sede:** sección `.hero__meta` y `#agenda`.
- **Talleres:** secciones `<article class="workshop">` en `#talleres`.
- **Conferencias:** filas `.agenda__row` en `#agenda` (actualmente "Por definir").
- **FAQ:** elementos `<details class="faq__item">` en `#faq`.

La cuenta regresiva apunta a `28 May 2026, 09:00 UTC-6` (`script.js`, constante `EVENT_TS`).

---

## Licencia

Material académico del **TSJ Zapopan** y la **academia ISC**. Código del sitio bajo licencia MIT — siéntete libre de usarlo de base para futuras ediciones.
