"""
Make WebP variants (800px and 1600px wide) next to every JPEG under public/images.
The <Pic> component serves them through <picture>/srcset and falls back to the JPEG.

    python scripts/optimize-images.py        (needs Pillow: pip install pillow)
"""
import glob
import os

from PIL import Image

for jpg in sorted(glob.glob("public/images/**/*.jpg", recursive=True)):
    base = jpg[:-4]
    im = Image.open(jpg).convert("RGB")
    w, h = im.size
    for target in (800, 1600):
        tw = min(target, w)
        out = f"{base}-{target}.webp"
        im.resize((tw, round(h * tw / w)), Image.LANCZOS).save(out, "WEBP", quality=80, method=6)
        print(f"{out}  {os.path.getsize(out) // 1024} KB")
