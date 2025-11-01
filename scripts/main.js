import { loadIncludes } from './components.js';
import { loadData, filterAds, sortAds } from './data.js';
import { debounce } from './utils.js';
import { renderCategories, renderGrid } from './renderList.js';

await loadIncludes();

const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const qEl = document.getElementById('q');
const sortEl = document.getElementById('sort');
const catEl = document.getElementById('cat');

const DATA = await loadData();
renderCategories(DATA, catEl);

function update(){
  const q = qEl.value;
  const cat = catEl.value;
  const sort = sortEl.value;
  const filtered = sortAds(filterAds(DATA, { q, cat }), sort);
  renderGrid(filtered, grid, empty);
}
qEl.addEventListener('input', debounce(update, 200));
sortEl.addEventListener('change', update);
catEl.addEventListener('change', update);

update();
