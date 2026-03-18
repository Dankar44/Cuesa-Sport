# -*- coding: utf-8 -*-
"""Actualiza referencias a imagenes locales: .jpg/.png/.jpeg/.gif -> .webp (solo rutas que contienen img/)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def main():
    for ext in ["*.html", "*.css"]:
        for path in ROOT.rglob(ext):
            if "node_modules" in str(path) or ".git" in str(path):
                continue
            text = path.read_text(encoding="utf-8", errors="replace")
            # Solo tocar rutas que contienen img/ y acaban en extension imagen
            new_text = re.sub(
                r'(\.\./img/|["\']\.\./img/|url\(["\']?\.\./img/|url\(["\']?/img/|["\']img/)([^"\')\s]+?)\.(jpg|jpeg|png|gif)(["\')\s])',
                r'\1\2.webp\4',
                text,
                flags=re.IGNORECASE
            )
            if new_text != text:
                path.write_text(new_text, encoding="utf-8")
                print("Updated:", path.relative_to(ROOT))
    print("Done.")

if __name__ == "__main__":
    main()
