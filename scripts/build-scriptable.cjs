// Generate Scriptable's native import file from the single maintained source.
// Run from any directory: node scripts/build-scriptable.cjs
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'MTR-Widget.js'), 'utf8');
const pkg = {
  always_run_in_app: false,
  icon: {color: 'cyan', glyph: 'train'},
  name: 'mtr班次显示',
  script,
  share_sheet_inputs: []
};
fs.writeFileSync(path.join(root, 'MTR-Widget.scriptable'), JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('Generated MTR-Widget.scriptable');
