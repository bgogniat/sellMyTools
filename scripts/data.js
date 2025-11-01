let CACHE = null;

export async function loadData(){
  if (CACHE) return CACHE;
  const res = await fetch('../data/ads.json', { cache: 'no-store' });
  if(!res.ok) throw new Error('Failed to load ads.json');
  const raw = await res.json();
  // normalize
  CACHE = (Array.isArray(raw) ? raw : raw.ads || []).map(x => ({
    id: x.id ?? String(crypto.randomUUID()),
    titre: x.titre || x.title || '',
    description: x.description || x.desc || '',
    prix: x.prix ?? x.price ?? null,
    devise: x.devise || x.currency || 'CHF',
    categorie: x.categorie || x.category || '',
    marque: x.marque || x.brand || '',
    modele: x.modele || x.model || '',
    images: x.images && x.images.length ? x.images : [x.image1,x.image2,x.image3].filter(Boolean),
    ...x
  }));
  return CACHE;
}

export function sortAds(list, mode='recent'){
  const L = [...list];
  if(mode === 'price-asc')  L.sort((a,b)=>(a.prix??1e15)-(b.prix??1e15));
  if(mode === 'price-desc') L.sort((a,b)=>(b.prix??-1)-(a.prix??-1));
  if(mode === 'title-asc')  L.sort((a,b)=>String(a.titre).localeCompare(String(b.titre)));
  // recent: assume higher id or newer appear first as-is
  return L;
}

export function filterAds(list, { q='', cat='' }){
  const Q = q.trim().toLowerCase();
  return list.filter(a=>{
    const inCat = !cat || (a.categorie||'').toLowerCase() === cat.toLowerCase();
    if(!Q) return inCat;
    const hay = [a.titre,a.description,a.marque,a.modele,a.categorie].join(' ').toLowerCase();
    return inCat && hay.includes(Q);
  });
}
