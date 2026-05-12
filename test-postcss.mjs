import fs from 'fs';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

const css = fs.readFileSync('src/globals.css', 'utf8');

postcss([tailwindcss])
  .process(css, { from: 'src/globals.css', to: 'public/test.css' })
  .then(result => {
    fs.writeFileSync('public/test.css', result.css);
    console.log('Done, generated CSS size:', result.css.length);
  })
  .catch(err => {
    console.error('Error:', err);
  });
