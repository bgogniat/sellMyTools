// Load all [data-include="path.html"] fragments
export async function loadIncludes(root=document){
  const els = Array.from(root.querySelectorAll('[data-include]'));
  await Promise.all(els.map(async el => {
    const url = el.getAttribute('data-include');
    const res = await fetch(url, { cache: 'no-store' });
    if(!res.ok) { el.innerHTML = `<!-- include failed: ${url} -->`; return; }
    el.innerHTML = await res.text();
  }));
}
