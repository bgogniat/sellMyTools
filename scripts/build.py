# scripts/build.py
import json, pathlib, pandas as pd

BASE = pathlib.Path(__file__).resolve().parents[1]
xlsx = BASE / "data" / "ads.xlsx"
out  = BASE / "data" / "ads.json"

# lit la première feuille "ads" par défaut
df = pd.read_excel(xlsx).fillna("")

# garder uniquement les lignes publiées
def is_true(v): return str(v).strip().lower() in ("true","1","yes","y","oui","vrai")
if "publie" in df.columns:
    df = df[df["publie"].apply(is_true)]

def collect_images(row, maxn=10):
    imgs = []
    for i in range(1, maxn+1):
        col = f"image{i}" if f"image{i}" in row.index else None
        if col:
            val = str(row[col]).strip()
            if val and val.lower() != "nan":
                imgs.append(val)
    return imgs

records = []
for _, r in df.iterrows():
    rec = {k: ("" if str(v)=="nan" else v) for k,v in r.items()}
    # normalisation
    prix = str(rec.get("prix","")).replace(",",".").strip()
    rec["prix"] = float(prix) if prix else None
    rec["devise"] = rec.get("devise") or "CHF"
    rec["images"] = collect_images(r)
    records.append(rec)

out.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK: {len(records)} annonces → {out}")
