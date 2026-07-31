/* Digress post chrome: breadcrumb + theme toggle.
   Include once near </body>:
   <script src="../assets/post-nav.js" data-category="econ"></script>
   Optional: data-category-label, data-title, data-home
*/
(function () {
  const script =
    document.currentScript ||
    document.querySelector('script[src*="post-nav.js"]');
  if (!script || document.getElementById('digress-nav')) return;

  const CATEGORIES = {
    phil: 'Philosophy',
    ml: 'Machine learning',
    quant: 'Quant',
    game: 'Game design',
    build: 'Builds',
    econ: 'Economy'
  };

  const cat = (script.getAttribute('data-category') || '').trim();
  const catLabel =
    (script.getAttribute('data-category-label') || '').trim() ||
    CATEGORIES[cat] ||
    (cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : '');

  function homeHref() {
    const override = (script.getAttribute('data-home') || '').trim();
    if (override) return override;
    const path = location.pathname || '';
    if (/\/(posts|drafts)\//.test(path)) return '../index.html';
    if (path.endsWith('/posts') || path.endsWith('/drafts')) return '../index.html';
    return 'index.html';
  }

  function postTitle() {
    const override = (script.getAttribute('data-title') || '').trim();
    if (override) return override;
    const h1 = document.querySelector('h1');
    if (h1 && h1.textContent.trim()) return h1.textContent.trim();
    return document.title.replace(/\s*[—–|-]\s*Digress\s*$/i, '').trim() || 'Post';
  }

  const home = homeHref();
  const title = postTitle();
  const catHref = cat ? home + '#' + encodeURIComponent(cat) : home;

  const css = `
#digress-nav{--dn-mono:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;--dn-bg:rgba(5,7,12,.88);--dn-fade:rgba(5,7,12,.55);--dn-ink:#eef1f6;--dn-sub:#9aa3b2;--dn-hair:#1e2430;position:sticky;top:0;z-index:10000;display:flex;align-items:center;gap:14px;padding:12px 22px;padding-top:max(12px,env(safe-area-inset-top));font-family:var(--dn-mono);font-size:11px;letter-spacing:.06em;color:var(--dn-sub);background:linear-gradient(180deg,var(--dn-bg),var(--dn-fade));backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
html[data-theme=light] #digress-nav{--dn-bg:rgba(242,243,239,.92);--dn-fade:rgba(242,243,239,.55);--dn-ink:#16191d;--dn-sub:#4c535a;--dn-hair:#c4c9c2}
#digress-nav a{color:inherit;text-decoration:none}
#digress-nav a:hover{color:var(--dn-ink)}
#digress-nav .digress-bc{display:flex;align-items:center;gap:0;flex:1;min-width:0;list-style:none;margin:0;padding:0;flex-wrap:nowrap}
#digress-nav .digress-bc li{display:flex;align-items:center;min-width:0}
#digress-nav .digress-bc li.digress-title-crumb{flex:1 1 auto}
#digress-nav .digress-bc li+li::before{content:"/";margin:0 8px;color:var(--dn-sub);opacity:.45;flex:none}
#digress-nav .digress-bc a,#digress-nav .digress-bc [aria-current=page]{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}
#digress-nav .digress-bc .digress-home{color:var(--dn-ink);font-weight:700;letter-spacing:.16em;text-transform:uppercase;flex:none}
#digress-nav .digress-bc .digress-cat{text-transform:uppercase;letter-spacing:.1em;flex:none;max-width:28vw}
#digress-nav .digress-bc [aria-current=page]{display:block;color:var(--dn-ink);text-transform:none;letter-spacing:.02em;font-size:11px}
#digress-nav .digress-actions{margin-left:auto;display:flex;align-items:center;gap:14px;flex:none}
#digress-nav .digress-theme{font-family:var(--dn-mono);font-size:11px;border:0;border-bottom:1px solid var(--dn-hair);background:transparent;color:var(--dn-sub);padding:4px 0;cursor:pointer;display:flex;gap:7px;align-items:center;letter-spacing:.06em}
#digress-nav .digress-theme:hover{color:var(--dn-ink);border-bottom-color:var(--dn-ink)}
@media(max-width:620px){
  #digress-nav{padding:10px 16px;padding-top:max(10px,env(safe-area-inset-top));gap:10px}
  #digress-nav .digress-bc li.digress-title-crumb{display:none}
  #digress-nav .digress-bc .digress-cat{max-width:46vw}
}
`;

  const style = document.createElement('style');
  style.id = 'digress-nav-style';
  style.textContent = css;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.id = 'digress-nav';
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');
  ol.className = 'digress-bc';

  const homeLi = document.createElement('li');
  const homeA = document.createElement('a');
  homeA.className = 'digress-home';
  homeA.href = home;
  homeA.textContent = 'Digress';
  homeLi.appendChild(homeA);
  ol.appendChild(homeLi);

  if (catLabel) {
    const catLi = document.createElement('li');
    const catA = document.createElement('a');
    catA.className = 'digress-cat';
    catA.href = catHref;
    catA.textContent = catLabel;
    if (cat) catA.dataset.d = cat;
    catLi.appendChild(catA);
    ol.appendChild(catLi);
  }

  const titleLi = document.createElement('li');
  titleLi.className = 'digress-title-crumb';
  const titleSpan = document.createElement('span');
  titleSpan.setAttribute('aria-current', 'page');
  titleSpan.textContent = title;
  titleSpan.title = title;
  titleLi.appendChild(titleSpan);
  ol.appendChild(titleLi);

  const actions = document.createElement('div');
  actions.className = 'digress-actions';
  const themeBtn = document.createElement('button');
  themeBtn.type = 'button';
  themeBtn.className = 'digress-theme';
  themeBtn.id = 'themebtn';
  themeBtn.innerHTML = '<span id="ti">◐</span> <span id="tl">light</span>';
  actions.appendChild(themeBtn);

  nav.appendChild(ol);
  nav.appendChild(actions);
  document.body.insertBefore(nav, document.body.firstChild);

  const root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    const tl = document.getElementById('tl');
    const ti = document.getElementById('ti');
    if (tl) tl.textContent = t === 'dark' ? 'light' : 'dark';
    if (ti) ti.textContent = t === 'dark' ? '\u25D1' : '\u25D0';
    try { localStorage.setItem('digress-theme', t); } catch (e) {}
    window.dispatchEvent(new CustomEvent('digress-theme', { detail: t }));
  }

  themeBtn.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  const saved = (function () {
    try { return localStorage.getItem('digress-theme'); } catch (e) { return null; }
  })();
  const initial =
    saved ||
    (window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark');
  applyTheme(initial);
})();
