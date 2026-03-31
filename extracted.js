
// QuickStart tab switching
function switchQS(id, btn) {
  document.querySelectorAll('.qs-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.qs-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('qs-' + id).classList.add('active');
}

// Docs tab switching
function switchDoc(id, btn) {
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.sidebar-sub').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.doc-card').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const sub = btn.nextElementSibling;
  if (sub && sub.classList.contains('sidebar-sub')) sub.style.display = 'flex';
  document.getElementById('doc-' + id).classList.add('active');
  closeSidebar();
}

// Scroll to section within doc
function scrollToSection(id, e) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Update active sub-link
    const parent = e.target.closest('.sidebar-sub');
    if (parent) {
      parent.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      e.target.classList.add('active');
    }
  }
}

// Copy code
function copyCode(btn) {
  const pre = btn.closest('.qs-code-block').querySelector('pre');
  const text = pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '已复制';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
  });
}

// Mobile sidebar
function toggleSidebar() {
  document.getElementById('docsSidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('docsSidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

// Init: show first sub-nav
document.addEventListener('DOMContentLoaded', () => {
  const firstSub = document.querySelector('.sidebar-sub');
  if (firstSub) firstSub.style.display = 'flex';

  // Smooth nav highlight on scroll
  const sections = document.querySelectorAll('.docs-section, .quickstart');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 100;
    const docsTop = document.querySelector('.docs-section')?.offsetTop || Infinity;
    navLinks.forEach(l => l.classList.remove('active'));
    if (y >= docsTop) {
      navLinks[1]?.classList.add('active');
    } else {
      navLinks[0]?.classList.add('active');
    }
  });
});
