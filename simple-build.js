// simple-build.js - Simple concatenation build script (no npm required)
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Read and combine all the modular files in the correct order
const files = [
  // Utils first
  'src/utils/ExcellenceDetector.js',
  'src/utils/PerformanceMonitor.js',
  'src/utils/DOMProcessor.js',
  
  // Config
  'src/config/BiasConfig.js',
  
  // Dictionaries
  'src/dictionaries/opinion-words.js',
  'src/dictionaries/tobe-verbs.js',
  'src/dictionaries/absolute-words.js',
  'src/dictionaries/passive-patterns.js',
  'src/dictionaries/weasel-phrases.js',
  'src/dictionaries/presupposition-markers.js',
  'src/dictionaries/war-metaphors.js',
  'src/dictionaries/minimizers.js',
  'src/dictionaries/maximizers.js',
  'src/dictionaries/false-balance.js',
  'src/dictionaries/euphemisms.js',
  'src/dictionaries/emotional-triggers.js',
  'src/dictionaries/gaslighting.js',
  'src/dictionaries/false-dilemma.js',
  'src/dictionaries/index.js',
  
  // Main components
  'src/content/BiasDetector.js',
  'src/content/content-script.js'
];

// Wrap everything in an IIFE
let output = '// E-Prime Bias Detector - Bundled Content Script\n';
output += '(function() {\n';
output += '  "use strict";\n\n';

// Process each file
files.forEach(file => {
  console.log(`Processing ${file}...`);
  
  if (!fs.existsSync(file)) {
    console.warn(`Warning: ${file} not found, skipping...`);
    return;
  }
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove import statements
  content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  
  // Remove export statements but keep the content
  content = content.replace(/^export\s+(?:default\s+)?/gm, '');
  content = content.replace(/^export\s+\{[^}]*\};?\s*$/gm, '');
  
  // Add file header comment
  output += `  // ========== ${file} ==========\n`;
  output += content + '\n\n';
});

// Close the IIFE
output += '})();\n';

// Write the bundled file
fs.writeFileSync('dist/content.js', output);
console.log('Created dist/content.js');

// Copy static files
const staticFiles = [
  'manifest.json',
  'popup.html',
  'popup.js',
  'styles.css',
  'info.html'
];

staticFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join('dist', file));
    console.log(`Copied ${file}`);
  }
});

// Copy excellence styles
if (fs.existsSync('src/excellence-styles.css')) {
  fs.copyFileSync('src/excellence-styles.css', 'dist/excellence-styles.css');
  console.log('Copied excellence-styles.css');
}

// Copy images directory
if (fs.existsSync('images')) {
  if (!fs.existsSync('dist/images')) {
    fs.mkdirSync('dist/images');
  }
  
  fs.readdirSync('images').forEach(file => {
    fs.copyFileSync(
      path.join('images', file),
      path.join('dist/images', file)
    );
  });
  console.log('Copied images directory');
}

// Update manifest to use correct paths
const manifest = JSON.parse(fs.readFileSync('dist/manifest.json', 'utf8'));
manifest.content_scripts[0].js = ['content.js'];
manifest.content_scripts[0].css = ['styles.css', 'excellence-styles.css'];
fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));

console.log('\nBuild complete! Load the extension from the dist/ directory.');
