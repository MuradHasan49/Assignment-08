import fs from 'fs';
const env = fs.readFileSync('.env.local', 'utf8').split('\n');
env.forEach(line => {
  const index = line.indexOf('=');
  if (index > 0) {
    const key = line.substring(0, index).trim();
    const value = line.substring(index + 1).trim();
    process.env[key] = value;
  }
});

import { auth } from "./src/lib/auth.js";

console.log("Auth Routes Available:");
console.log(Object.keys(auth.api));
process.exit(0);
