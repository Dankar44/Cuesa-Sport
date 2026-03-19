# Lista: cosas que faltan — Cuesa Sport

Lista de tareas pendientes para el sitio web y presencia online.

---

## 1. SEO y Google

- [ ] **Comprobar si el SEO está hecho** con el enlace/dominio anterior (ver si ya estaba configurado en Search Console o similar).
- [ ] **Revisar el SEO actual** de cuesasport.com: meta título, descripción, Open Graph, estructura de encabezados.
- [ ] **Google Search Console**: verificar propiedad del sitio (cuesasport.com) y que no siga apuntando solo a una web antigua.
- [ ] **Google Analytics** (o GA4): comprobar si el código de análisis está instalado y que el ID/medición sea el correcto para este sitio.

---

## 2. Sitemap

- [ ] **Comprobar el sitemap actual**: el que hay puede ser de otra web externa.
- [ ] **Generar sitemap de esta web**: crear un `sitemap.xml` con las URLs de cuesasport.com (index, páginas de pages/, blog, etc.).
- [ ] **Enviar el sitemap en Google Search Console** (la opción oficial de Google suele funcionar mejor que otros métodos).

---

## 3. Fotos y contenido

- [ ] **Subir las fotos** que te pasó la otra persona: ubicar en qué secciones o carpetas deben ir.
- [ ] **Revisar carpetas del sitio** para saber qué es cada una:
  - **`/`** — Raíz: `index.html`, `css/`, `js/`, `img/`, `pages/`.
  - **`css/`** — Estilos globales.
  - **`js/`** — Scripts (main.js, etc.).
  - **`img/`** — Imágenes: logo, planos, galería, sectores, blog, ubicaciones, revestimientos, etc.
  - **`pages/`** — Páginas internas (servicios, proyectos, contacto, blog, sectores, etc.).
  - **`pages/blog/`** — Artículos del blog.
- [ ] **Decidir dónde colocar las nuevas fotos** (galería, proyectos, servicios, etc.) y actualizar HTML si hace falta.

---

## 4. Correos electrónicos

- [ ] **Comprobar que los correos apunten bien**: en el sitio todo usa **cuesasport@cuesasport.com** (mailto y textos). Confirmar que esa cuenta existe y recibe.
- [ ] **Puerta trasera para el correo del jefe**: configurar reenvío o copia (BCC/CC) desde cuesasport@cuesasport.com al correo del jefe, o una cuenta alternativa que reciba las mismas consultas (según cómo tengáis el correo contratado: cPanel, Google Workspace, etc.).

---

## 5. Cuentas y redes

- [ ] **LinkedIn**: crear o completar la página de empresa (Cuesa Sport / CuesaSport) — tipo de empresa, tamaño, lema, logo, etc.
- [ ] **InfoJobs**: crear o vincular la cuenta de empresa para publicar ofertas y que apunte al sitio y al correo correctos.

---

## 6. Scripts .py (Python)

En la raíz del proyecto hay varios scripts:

- `convert_to_webp.py` — conversión de imágenes a WebP.
- `update_refs_webp.py` — actualizar referencias en HTML a .webp.
- `update_footer_accordion.py` — ajustes en el acordeón del footer.
- `replace_text.py` — reemplazos de texto en masa.

**¿Siguen siendo necesarios?**  
Para **publicar y mantener el sitio en producción**, **no son necesarios**. Son utilidades de desarrollo que se usaron para tareas puntuales (convertir imágenes, actualizar enlaces, etc.).  
Puedes **dejarlos en la carpeta** por si en el futuro quieres volver a hacer operaciones similares, o **moverlos a una carpeta tipo `scripts/` o `herramientas/`** para no tenerlos en la raíz. No afectan al funcionamiento del sitio web.

---

*Última actualización: lista creada según lo comentado. Ir tachando o marcando conforme se vaya haciendo.*
