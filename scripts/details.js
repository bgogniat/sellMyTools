import { loadIncludes } from './components.js';
import { loadData } from './data.js';
import { $, escapeHTML, fmtPrice, imgURL, getQuery } from './utils.js';

await loadIncludes();

const id = getQuery('id');
const DATA = await loadData();
const ad = DATA.find(d => String(d.id) === String(id));

if(!ad){
  document.querySelector('main').innerHTML = `<p class="text-center py-5">Ad not found.</p>`;
} else {
  $('#title').textContent = ad.titre || '';
  $('#price').textContent = fmtPrice(ad.prix, ad.devise);
  $('#desc').textContent = ad.description || '';

  const imgs = ad.images?.length ? ad.images : [];
  if(imgs.length){
    $('#hero').src = imgURL(imgs[0]);
    const thumbs = imgs.map(name => `
      <img src="${imgURL(name)}" alt="" width="96" height="72" style="object-fit:cover;cursor:pointer;border-radius:6px;border:1px solid #eee"
           onclick="document.getElementById('hero').src='${imgURL(name)}'">
    `).join('');
    $('#thumbs').innerHTML = thumbs;
  }

  const meta = [];
  for (const key of ['categorie','marque','modele','etat','ville','disponibilite','annee']) {
    if(ad[key]) meta.push(`<li><strong>${escapeHTML(key)}:</strong> ${escapeHTML(String(ad[key]))}</li>`);
  }
  $('#meta').innerHTML = meta.join('');
}
