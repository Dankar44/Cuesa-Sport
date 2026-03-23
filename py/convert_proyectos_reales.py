"""
Convert photos from Wetransfer ref folders to optimized webp in img/proyectos-reales/ref-X/
Also creates a black placeholder portada.webp for each ref.
"""
import os, sys, glob
from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WETRANSFER = os.path.join(BASE, "Wetransfer")
OUTPUT_BASE = os.path.join(BASE, "img", "proyectos-reales")

REFS = {
    "ref-1": "Ref  Piscina 1",
    "ref-2": "Ref piscina 2",
    "ref-3": "Ref Piscina 3",
    "ref-4": os.path.join("Ref piscina 4 Gri\u00f1on", "FOTOS GRI\u00d1ON"),
    "ref-5": "Ref Piscina 5",
    "ref-6": "Ref piscina 6 Madrid",
    "ref-7": "FOTOS PISCINA USO COLECTIVO, DE COMUNIDAD PROPIETARIOS",
}

MAX_WIDTH = 1600
QUALITY = 80

def convert_folder(ref_key, src_subfolder):
    src_dir = os.path.join(WETRANSFER, src_subfolder)
    dst_dir = os.path.join(OUTPUT_BASE, ref_key)
    os.makedirs(dst_dir, exist_ok=True)

    exts = (".jpg", ".jpeg", ".png", ".bmp")
    photos = sorted([
        f for f in os.listdir(src_dir)
        if os.path.splitext(f)[1].lower() in exts
    ])

    print(f"\n{'='*50}")
    print(f"{ref_key}: {len(photos)} fotos en {src_subfolder}")

    for idx, fname in enumerate(photos, 1):
        src_path = os.path.join(src_dir, fname)
        dst_name = f"foto-{idx:02d}.webp"
        dst_path = os.path.join(dst_dir, dst_name)

        if os.path.exists(dst_path):
            continue

        try:
            img = Image.open(src_path)
            img = img.convert("RGB")
            if img.width > MAX_WIDTH:
                ratio = MAX_WIDTH / img.width
                new_h = int(img.height * ratio)
                img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
            img.save(dst_path, "WEBP", quality=QUALITY)
            if idx <= 3 or idx == len(photos):
                print(f"  [{idx}/{len(photos)}] {fname} -> {dst_name} ({img.width}x{img.height})")
            elif idx == 4:
                print(f"  ... procesando ...")
        except Exception as e:
            print(f"  ERROR {fname}: {e}")

    # Create black placeholder portada
    portada_path = os.path.join(dst_dir, "portada.webp")
    if not os.path.exists(portada_path):
        black = Image.new("RGB", (800, 600), (0, 0, 0))
        black.save(portada_path, "WEBP", quality=80)
        print(f"  portada.webp creada (800x600 negro)")

    print(f"  Terminado: {len(photos)} fotos convertidas")
    return len(photos)

if __name__ == "__main__":
    os.makedirs(OUTPUT_BASE, exist_ok=True)
    total = 0
    for ref_key, src_sub in REFS.items():
        total += convert_folder(ref_key, src_sub)
    print(f"\n{'='*50}")
    print(f"TOTAL: {total} fotos convertidas en 7 carpetas")
