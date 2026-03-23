"""Generate 7 proyecto-real HTML pages."""
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PROJECTS = [
    {
        "ref": 1, "slug": "proyecto-real-01",
        "title": "Piscina en Pozuelo, Monteclaro",
        "municipio": "Pozuelo de Alarcón — Monteclaro",
        "tipo": "Skimmer",
        "desc": "Construcción de nueva piscina de aproximadamente 9 × 2,20 m y unión con la que ya tenía el cliente. Desplazamiento de caseta existente y solado completo en porcelánico de Cerámica Mayor Stromboli Silver.",
        "year": "2026",
        "dims": "9 × 2,20 m",
        "acabado": "Porcelánico Stromboli Silver",
        "num_fotos": 12, "num_videos": 4,
    },
    {
        "ref": 2, "slug": "proyecto-real-02",
        "title": "Piscina en Pozuelo de Alarcón",
        "municipio": "Pozuelo de Alarcón",
        "tipo": "Skimmer",
        "desc": "Construcción de piscina de 7 × 3 m, requiriendo el empleo de grúa para la excavación. Acabado interior en Cerámica Mayor Stromboli Light. Incorpora un pequeño banco a la entrada y escalera de obra.",
        "year": "2025",
        "dims": "7 × 3 m",
        "acabado": "Porcelánico Stromboli Light",
        "num_fotos": 12, "num_videos": 4,
    },
    {
        "ref": 3, "slug": "proyecto-real-03",
        "title": "Piscina en Aravaca",
        "municipio": "Aravaca (Madrid)",
        "tipo": "Skimmer",
        "desc": "Piscina de 9 × 3 m con acabado interior en revestimiento color verde proporcionado por el cliente. Escalera de obra en todo el ancho de la piscina para un acceso cómodo.",
        "year": "2025",
        "dims": "9 × 3 m",
        "acabado": "Revestimiento verde (cliente)",
        "num_fotos": 12, "num_videos": 1,
    },
    {
        "ref": 4, "slug": "proyecto-real-04",
        "title": "Piscina Desbordante en Griñón",
        "municipio": "Griñón (Madrid)",
        "tipo": "Desbordante",
        "desc": "Piscina desbordante de 8 × 4 m con plataforma y escalera de obra, focos subacuáticos, clorador salino y acabado en material porcelánico proporcionado por el cliente.",
        "year": "2023",
        "dims": "8 × 4 m",
        "acabado": "Porcelánico (cliente)",
        "num_fotos": 11, "num_videos": 0,
    },
    {
        "ref": 5, "slug": "proyecto-real-05",
        "title": "Piscina Desbordante en Somosaguas",
        "municipio": "Somosaguas (Pozuelo de Alarcón)",
        "tipo": "Desbordante",
        "desc": "Piscina desbordante de 11 × 3,5 m con canal oculto y zona de playa. Acabado en granito y entrada a la piscina con escalera en todo el ancho. También se realizó el muro exterior de la calle.",
        "year": "2023",
        "dims": "11 × 3,5 m",
        "acabado": "Granito",
        "num_fotos": 12, "num_videos": 0,
    },
    {
        "ref": 6, "slug": "proyecto-real-06",
        "title": "Piscina Infinity en Madrid Capital",
        "municipio": "Madrid Capital",
        "tipo": "Desbordante Infinity",
        "desc": "Piscina desbordante de aproximadamente 10 × 3,15 m con borde infinity en lateral. Revestimiento River Green serie Ocean. Incluye plataforma de acceso.",
        "year": "",
        "dims": "10 × 3,15 m",
        "acabado": "River Green serie Ocean",
        "num_fotos": 12, "num_videos": 2,
    },
    {
        "ref": 7, "slug": "proyecto-real-07",
        "title": "Piscina Comunitaria en Parla",
        "municipio": "Parla (Madrid)",
        "tipo": "Desbordante — Uso colectivo",
        "desc": "Piscina desbordante de 22 × 11 m para comunidad de propietarios, con escalera de entrada y pasamanos de acero inoxidable en todo el ancho. Acabados según normativa para piscina de uso colectivo. Revestimiento Reviglass y zona de andén en piedra artificial realizada in situ.",
        "year": "2026",
        "dims": "22 × 11 m",
        "acabado": "Reviglass + Piedra artificial",
        "num_fotos": 12, "num_videos": 1,
    },
]

def gen_fotos_html(ref, n):
    items = []
    for i in range(1, n + 1):
        items.append(f'''        <div class="proyecto-galeria-item">
          <img src="../img/proyectos-reales/ref-{ref}/foto-{i:02d}.webp" alt="Foto {i}" loading="lazy">
          <span class="proyecto-galeria-zoom"><i class="fas fa-search-plus"></i></span>
        </div>''')
    return "\n".join(items)

def gen_videos_html(ref, n):
    if n == 0:
        return ""
    items = []
    for i in range(1, n + 1):
        items.append(f'''        <div class="proyecto-video-wrap">
          <video controls preload="metadata" playsinline>
            <source src="../img/proyectos-reales/ref-{ref}/video-{i:02d}.mp4" type="video/mp4">
          </video>
        </div>''')
    return f'''
  <section class="section proyecto-videos-section">
    <div class="container">
      <h2 class="section-title" style="font-size:1.6rem;margin-bottom:24px"><i class="fas fa-video" style="color:var(--primary);margin-right:10px"></i>Vídeos del proyecto</h2>
      <div class="proyecto-videos-grid">
{chr(10).join(items)}
      </div>
    </div>
  </section>'''

def gen_page(p):
    year_tag = f'<span class="tag"><i class="fas fa-calendar-alt"></i> {p["year"]}</span>' if p["year"] else ""
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{p["title"]} | Cuesa Sport</title>
  <meta name="description" content="{p["title"]}. {p["tipo"]} en {p["municipio"]}. Cuesa Sport — construcción de piscinas en Madrid.">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

  <div class="preloader">
    <div class="preloader-logo">Cuesa <span>Sport</span></div>
    <div class="preloader-bar"></div>
  </div>

  <header class="header">
    <div class="container">
      <a href="../index.html" class="logo"><img src="../img/logo-empresa.webp" alt="" class="logo-img"> Cuesa <span>Sport</span></a>
      <nav class="nav">
        <a href="../index.html" class="nav-link">Inicio</a>
        <div class="nav-dropdown">
          <a href="sobre-nosotros.html" class="nav-link">Sobre nosotros <i class="fas fa-chevron-down" style="font-size:0.6em;margin-left:4px"></i></a>
          <div class="nav-dropdown-menu">
            <a href="sobre-nosotros.html">Nuestra historia</a>
            <a href="sobre-nosotros.html#valores">Misión y valores</a>
            <a href="trabaja-con-nosotros.html">Trabaja con nosotros</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <a href="servicios.html" class="nav-link">Servicios <i class="fas fa-chevron-down" style="font-size:0.6em;margin-left:4px"></i></a>
          <div class="nav-dropdown-menu">
            <a href="construccion-piscinas.html">Construcción de piscinas</a>
            <a href="mantenimiento-piscinas.html">Mantenimiento de piscinas</a>
            <a href="reforma-piscinas.html">Reforma de piscinas</a>
            <a href="climatizacion-piscinas.html">Climatización de piscinas</a>
          </div>
        </div>
        <a href="proyectos.html" class="nav-link">Proyectos</a>
        <a href="sectores.html" class="nav-link">Sectores</a>
        <a href="blog.html" class="nav-link">Blog</a>
        <a href="contacto.html" class="nav-link nav-cta">Contacto</a>
      </nav>
      <div class="hamburger"><span></span><span></span><span></span></div>
    </div>
  </header>

  <section class="page-header">
    <div class="container">
      <div class="page-header-content">
        <nav class="breadcrumb reveal">
          <a href="../index.html">Inicio</a> <i class="fas fa-chevron-right"></i>
          <a href="proyectos.html">Proyectos</a> <i class="fas fa-chevron-right"></i>
          <span>{p["title"]}</span>
        </nav>
        <h1 class="reveal">{p["title"]}</h1>
        <p class="reveal">{p["tipo"]} en {p["municipio"]}</p>
      </div>
    </div>
  </section>

  <section class="section content-section">
    <div class="container">
      <div class="content-block proyecto-detail-layout">
        <div class="proyecto-detail-left reveal">
          <img src="../img/proyectos-reales/ref-{p["ref"]}/portada.webp" alt="{p["title"]}" class="proyecto-detail-hero">
        </div>
        <div class="proyecto-detail-right">
          <div class="proyecto-detail-meta reveal">
            <span class="tag"><i class="fas fa-map-marker-alt"></i> {p["municipio"]}</span>
            <span class="tag"><i class="fas fa-swimming-pool"></i> {p["tipo"]}</span>
            <span class="tag"><i class="fas fa-ruler-combined"></i> {p["dims"]}</span>
            <span class="tag"><i class="fas fa-palette"></i> {p["acabado"]}</span>
            {year_tag}
          </div>
          <div class="proyecto-detail-desc content-block reveal">
            <p>{p["desc"]}</p>
          </div>
          <div class="proyecto-detail-cta reveal">
            <a href="contacto.html" class="btn btn--primary btn--lg"><i class="fas fa-paper-plane"></i> Solicitar presupuesto</a>
            <a href="galeria.html" class="btn btn--outline-dark btn--lg">Ver todos los proyectos</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section proyecto-galeria-section">
    <div class="container">
      <h2 class="section-title" style="font-size:1.6rem;margin-bottom:24px"><i class="fas fa-images" style="color:var(--primary);margin-right:10px"></i>Galería de fotos</h2>
      <div class="proyecto-galeria-grid">
{gen_fotos_html(p["ref"], p["num_fotos"])}
      </div>
    </div>
  </section>
{gen_videos_html(p["ref"], p["num_videos"])}
  <section class="cta">
    <div class="container">
      <h2 class="reveal">¿Te gustaría una piscina como esta?</h2>
      <p class="reveal">Solicita tu presupuesto gratuito y sin compromiso. Nuestros especialistas te asesorarán en todo el proceso.</p>
      <a href="contacto.html" class="btn btn--white btn--lg reveal">
        Solicitar presupuesto <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="../index.html" class="logo"><img src="../img/logo-empresa.webp" alt="" class="logo-img"> Cuesa <span>Sport</span></a>
          <p>Empresa líder en construcción, mantenimiento y reforma de piscinas en Madrid. A tu servicio desde 1986 con la máxima calidad y profesionalidad.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <details class="footer-accordion-item" open>
          <summary class="footer-accordion-head">Servicios <i class="fas fa-chevron-down footer-accordion-icon" aria-hidden="true"></i></summary>
          <ul class="footer-links">
            <li><a href="servicios.html">Servicios</a></li>
            <li><a href="construccion-piscinas.html">Construcción de piscinas</a></li>
            <li><a href="piscinas-infinity.html">Piscinas Infinity</a></li>
            <li><a href="piscinas-desbordante.html">Piscinas Desbordantes</a></li>
            <li><a href="mantenimiento-piscinas.html">Mantenimiento de piscinas</a></li>
            <li><a href="reforma-piscinas.html">Reforma de piscinas</a></li>
            <li><a href="climatizacion-piscinas.html">Climatización de piscinas</a></li>
          </ul>
        </details>
        <details class="footer-accordion-item" open>
          <summary class="footer-accordion-head">Empresa <i class="fas fa-chevron-down footer-accordion-icon" aria-hidden="true"></i></summary>
          <ul class="footer-links">
            <li><a href="sobre-nosotros.html">Sobre nosotros</a></li>
            <li><a href="proyectos.html">Proyectos</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li><a href="trabaja-con-nosotros.html">Trabaja con nosotros</a></li>
          </ul>
        </details>
        <details class="footer-accordion-item" open>
          <summary class="footer-accordion-head">Contacto <i class="fas fa-chevron-down footer-accordion-icon" aria-hidden="true"></i></summary>
          <div class="footer-contact-wrap">
            <div class="footer-contact-item"><i class="fas fa-phone"></i><span><a href="tel:916002054">91 600 20 54</a></span></div>
            <div class="footer-contact-item"><i class="fas fa-envelope"></i><span><a href="mailto:cuesasport@cuesasport.com">cuesasport@cuesasport.com</a></span></div>
            <div class="footer-contact-item"><i class="fas fa-map-marker-alt"></i><span>Calle Olmo, 13-15<br>Pol. Ind. Niño del Remedio<br>28942 Fuenlabrada (Madrid)</span></div>
          </div>
        </details>
        <details class="footer-accordion-item" open>
          <summary class="footer-accordion-head">Legal <i class="fas fa-chevron-down footer-accordion-icon" aria-hidden="true"></i></summary>
          <ul class="footer-links">
            <li><a href="aviso-legal.html">Aviso legal</a></li>
            <li><a href="politica-privacidad.html">Política de privacidad</a></li>
            <li><a href="politica-cookies.html">Política de cookies</a></li>
          </ul>
        </details>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Cuesa Sport, S.L. Todos los derechos reservados.</span>
        <div class="footer-bottom-links">
          <a href="aviso-legal.html">Aviso legal</a>
          <a href="politica-cookies.html">Política de cookies</a>
          <a href="politica-privacidad.html">Política de privacidad</a>
        </div>
      </div>
    </div>
  </footer>

  <button class="back-to-top" aria-label="Volver arriba"><i class="fas fa-chevron-up"></i></button>
  <script src="../js/main.js"></script>
</body>
</html>'''

if __name__ == "__main__":
    pages_dir = os.path.join(BASE, "pages")
    for p in PROJECTS:
        path = os.path.join(pages_dir, f'{p["slug"]}.html')
        with open(path, "w", encoding="utf-8") as f:
            f.write(gen_page(p))
        print(f'Creado: {p["slug"]}.html ({p["title"]})')
    print(f"\n7 páginas generadas.")
