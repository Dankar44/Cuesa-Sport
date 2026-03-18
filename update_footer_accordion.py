# -*- coding: utf-8 -*-
"""Actualiza el footer a estructura acordeón en todos los HTML que aún tengan el viejo."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def update_file(path):
    text = path.read_text(encoding="utf-8", errors="replace")
    if "footer-accordion-item" in text:
        return False
    if "<h4>Servicios</h4>" not in text or "footer-grid" not in text:
        return False

    # Reemplazos estructurales (mantienen los enlaces que tenga cada página)
    replacements = [
        (
            re.compile(
                r'<div>\s*<h4>Servicios</h4>\s*<ul class="footer-links">',
                re.MULTILINE
            ),
            '''<details class="footer-accordion-item">
          <summary class="footer-accordion-head">Servicios <i class="fas fa-chevron-down footer-accordion-icon" aria-hidden="true"></i></summary>
          <ul class="footer-links">'''
        ),
        (
            re.compile(
                r'</ul>\s*</div>\s*<div>\s*<h4>Empresa</h4>\s*<ul class="footer-links">',
                re.MULTILINE
            ),
            '''</ul>
        </details>
        <details class="footer-accordion-item">
          <summary class="footer-accordion-head">Empresa <i class="fas fa-chevron-down footer-accordion-icon" aria-hidden="true"></i></summary>
          <ul class="footer-links">'''
        ),
        (
            re.compile(
                r'</ul>\s*</div>\s*<div>\s*<h4>Contacto</h4>\s*<div class="footer-contact-item">',
                re.MULTILINE
            ),
            '''</ul>
        </details>
        <details class="footer-accordion-item">
          <summary class="footer-accordion-head">Contacto <i class="fas fa-chevron-down footer-accordion-icon" aria-hidden="true"></i></summary>
          <div class="footer-contact-wrap">
          <div class="footer-contact-item">'''
        ),
        (
            re.compile(
                r'</div>\s*</div>\s*<div class="footer-bottom">',
                re.MULTILINE
            ),
            '''</div>
        </details>
      </div>
      <div class="footer-bottom">'''
        ),
    ]

    for pattern, repl in replacements:
        text = pattern.sub(repl, text, count=1)

    path.write_text(text, encoding="utf-8")
    return True

def main():
    updated = []
    for path in ROOT.rglob("*.html"):
        if "node_modules" in str(path) or ".git" in str(path):
            continue
        if path.name.startswith("index") and path.parent == ROOT:
            continue  # index ya está actualizado
        if update_file(path):
            updated.append(path.relative_to(ROOT))
    for p in sorted(updated):
        print("Updated:", p)
    print("Done. Total:", len(updated))

if __name__ == "__main__":
    main()
