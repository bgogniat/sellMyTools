export const $ = (sel, root=document) => root.querySelector(sel);
export const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

export function escapeHTML(s=''){ return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
export function fmtPrice(v, cur='CHF'){
  if(v == null || v === '') return '';
  const n = Number(v);
  try { return new Intl.NumberFormat('fr-CH', {style:'currency', currency: cur || 'CHF'}).format(n); }
  catch { return `${n} ${cur || 'CHF'}`; }
}
export function imgURL(name){ return `../images/${name}`; }
export const debounce = (fn, ms=200) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); }; };
export function getQuery(key){ return new URLSearchParams(location.search).get(key); }
