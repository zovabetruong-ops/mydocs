import fs from 'fs';

const html = fs.readFileSync('extracted.html', 'utf-8');
const css = fs.readFileSync('extracted.css', 'utf-8');
const js = fs.readFileSync('extracted.js', 'utf-8');

// We need to make the JS functions global so that inline onclick handlers work.
const globalJs = `
${js}
window.switchQS = switchQS;
window.switchDoc = switchDoc;
window.scrollToSection = scrollToSection;
window.copyCode = copyCode;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
`;

const appTsx = `
import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    ${globalJs}
    
    // Trigger the DOMContentLoaded logic manually since it might have already fired
    const firstSub = document.querySelector('.sidebar-sub') as HTMLElement;
    if (firstSub) firstSub.style.display = 'flex';

    const navLinks = document.querySelectorAll('.nav-links a');
    const handleScroll = () => {
      const y = window.scrollY + 100;
      const docsSection = document.querySelector('.docs-section') as HTMLElement;
      const docsTop = docsSection?.offsetTop || Infinity;
      navLinks.forEach(l => l.classList.remove('active'));
      if (y >= docsTop) {
        navLinks[1]?.classList.add('active');
      } else {
        navLinks[0]?.classList.add('active');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: \`${html.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />;
}
`;

fs.writeFileSync('src/App.tsx', appTsx);
fs.writeFileSync('src/index.css', css);

console.log('App.tsx and index.css updated');
