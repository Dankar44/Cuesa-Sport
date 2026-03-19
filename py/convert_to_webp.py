# -*- coding: utf-8 -*-
"""Convierte todas las imágenes en img/ a WebP (menor peso)."""
import os
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Instala Pillow: pip install Pillow")
    raise

IMG_DIR = Path(__file__).resolve().parent / "img"
QUALITY = 85
EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif"}

def main():
    converted = []
    for root, _, files in os.walk(IMG_DIR):
        root = Path(root)
        for name in files:
            path = root / name
            suf = path.suffix.lower()
            if suf not in EXTENSIONS:
                continue
            out = path.with_suffix(".webp")
            try:
                img = Image.open(path)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGBA")
                else:
                    img = img.convert("RGB")
                img.save(out, "WEBP", quality=QUALITY, method=6)
                size_old = path.stat().st_size
                size_new = out.stat().st_size
                path.unlink()
                converted.append((str(path), str(out), size_old, size_new))
            except Exception as e:
                print("Error:", path, e)
    for old, new, a, b in converted:
        print(f"OK {Path(old).name} -> {Path(new).name} ({a//1024}KB -> {b//1024}KB)")
    print(f"Total: {len(converted)} imagenes convertidas a WebP.")

if __name__ == "__main__":
    main()
