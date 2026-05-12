const fs = require('fs');
const path = 'json-server/db.json';
try {
  let db = fs.readFileSync(path, 'utf8');
  db = db.split('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600').join('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600');
  db = db.split('https://images.unsplash.com/photo-1608503396060-2c7c726d6b50?w=600').join('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600');
  fs.writeFileSync(path, db);
  console.log('Success: Patched known 404 images.');
} catch (e) {
  console.error(e.message);
}
process.exit(0);
