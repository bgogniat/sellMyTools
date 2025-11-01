import { escapeHTML, fmtPrice, imgURL } from './utils.js';

export function renderCategories(list, selectEl){
  const cats = Array.from(new Set(list.map(x=>x.categorie).filter(Boolean))).sort();
  selectEl.innerHTML = `<option value="">All categories</option>` +
    cats.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');
}

export function cardHTML(ad){
  const first = ad.images?.[0] ? imgURL(ad.images[0]) : '';
  const url = `./ad.html?id=${encodeURIComponent(ad.id)}`;
  return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <article class="card h-100">
        <a class="text-decoration-none text-reset" href="${url}" aria-label="Open ${escapeHTML(ad.titre)}">
          <div class="ratio ratio-16x9 bg-light">
            ${first ? `<img src="${first}" class="object-fit-cover" alt="${escapeHTML(ad.titre)}">` : ''}
          </div>
          <div class="card-body">
            <h3 class="card-title h6 mb-2">${escapeHTML(ad.titre)}</h3>
            <p class="fw-bold text-success mb-2">${fmtPrice(ad.prix, ad.devise)}</p>
            <div class="small text-muted d-flex flex-wrap gap-2">
              ${ad.categorie ? `<span>${escapeHTML(ad.categorie)}</span>` : ''}
              ${ad.marque ? `<span>${escapeHTML(ad.marque)}</span>` : ''}
              ${ad.modele ? `<span>${escapeHTML(ad.modele)}</span>` : ''}
            </div>
          </div>
        </a>
      </article>
    </div>
  `;
}

export function renderGrid(list, gridEl, emptyEl){
  if(!list.length){
    gridEl.innerHTML = '';
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;
  gridEl.innerHTML = list.map(cardHTML).join('');
}
