import fs from 'fs';

const html = fs.readFileSync('page.html', 'utf-8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const css = styleMatch ? styleMatch[1] : '';

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const js = scriptMatch ? scriptMatch[1] : '';

const bodyMatch = html.match(/<body>([\s\S]*?)<script>/);
let bodyHtml = bodyMatch ? bodyMatch[1] : '';

// Remove the inline onclick handlers to avoid React warnings or CSP issues, though dangerouslySetInnerHTML might just execute them.
// Actually, dangerouslySetInnerHTML doesn't execute inline scripts, but inline event handlers like onclick="switchQS(...)" WILL execute if the functions are global!
// So if I put the JS in a global scope, it will work perfectly.

fs.writeFileSync('extracted.css', css);
fs.writeFileSync('extracted.js', js);
fs.writeFileSync('extracted.html', bodyHtml);
console.log('Extraction complete');
