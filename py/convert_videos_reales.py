"""
Convert videos from Wetransfer ref folders to optimized mp4 (720p, H.264) in img/proyectos-reales/ref-X/
"""
import os, subprocess, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WETRANSFER = os.path.join(BASE, "Wetransfer")
OUTPUT_BASE = os.path.join(BASE, "img", "proyectos-reales")

import imageio_ffmpeg
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

REFS = {
    "ref-1": "Ref  Piscina 1",
    "ref-2": "Ref piscina 2",
    "ref-3": "Ref Piscina 3",
    "ref-4": "Ref piscina 4 Gri\u00f1on",
    "ref-5": "Ref Piscina 5",
    "ref-6": "Ref piscina 6 Madrid",
    "ref-7": "FOTOS PISCINA USO COLECTIVO, DE COMUNIDAD PROPIETARIOS",
}

def find_videos(src_dir):
    vids = []
    for root, dirs, files in os.walk(src_dir):
        for f in sorted(files):
            if f.lower().endswith((".mp4", ".mov", ".avi", ".mkv")):
                vids.append(os.path.join(root, f))
    return vids

def convert_video(src_path, dst_path):
    cmd = [
        FFMPEG, "-i", src_path,
        "-vf", "scale=-2:720",
        "-c:v", "libx264", "-preset", "fast", "-crf", "28",
        "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart",
        "-y", dst_path
    ]
    subprocess.run(cmd, capture_output=True)

if __name__ == "__main__":
    total = 0
    for ref_key, src_sub in REFS.items():
        src_dir = os.path.join(WETRANSFER, src_sub)
        dst_dir = os.path.join(OUTPUT_BASE, ref_key)
        os.makedirs(dst_dir, exist_ok=True)

        videos = find_videos(src_dir)
        if not videos:
            print(f"{ref_key}: sin vídeos")
            continue

        print(f"\n{ref_key}: {len(videos)} vídeos")
        for idx, vpath in enumerate(videos, 1):
            dst_name = f"video-{idx:02d}.mp4"
            dst_path = os.path.join(dst_dir, dst_name)
            if os.path.exists(dst_path):
                print(f"  [{idx}] ya existe {dst_name}")
                continue
            print(f"  [{idx}/{len(videos)}] {os.path.basename(vpath)} -> {dst_name} ...", end=" ", flush=True)
            convert_video(vpath, dst_path)
            size_mb = os.path.getsize(dst_path) / (1024*1024)
            print(f"OK ({size_mb:.1f} MB)")
            total += 1

    print(f"\nTOTAL: {total} vídeos convertidos")
