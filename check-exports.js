const h = require('@heroui/react');
const keys = Object.keys(h);
const nav = keys.filter(k => k.toLowerCase().includes('nav') || k.toLowerCase().includes('menu') || k.toLowerCase().includes('toggle') || k.toLowerCase().includes('dropdown'));
console.log(nav.join('\n'));
