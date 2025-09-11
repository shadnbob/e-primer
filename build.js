// build.js - Build script for the Chrome extension
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Check if we're in watch mode
const isWatch = process.argv.includes('--watch');

// Build configuration
const buildConfig = {
  entryPoints: ['src/content/content-script.js'],
  bundle: true,
  outfile: 'dist/content.js',
  format: 'iife',
  target: 'chrome90',
  sourcemap: true,
  logLevel: 'info',
};

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy static files to dist
function copyStaticFiles() {
  const filesToCopy = [
    'manifest.json',
    'popup.html',
    'popup-dynamic.js',
    'styles.css',
    'src/excellence-styles.css',
    'info.html'
  ];

  filesToCopy.forEach(file => {
    const source = path.join(__dirname, file);
    let destFile = file.includes('/') ? path.basename(file) : file;
    
    // Rename popup-dynamic.js to popup.js in dist
    if (file === 'popup-dynamic.js') {
      destFile = 'popup.js';
    }
    
    const dest = path.join(__dirname, 'dist', destFile);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`Copied ${file} to dist/${destFile}`);
    }
  });

  // Copy images directory
  const imagesSource = path.join(__dirname, 'images');
  const imagesDest = path.join(__dirname, 'dist', 'images');
  
  if (fs.existsSync(imagesSource) && !fs.existsSync(imagesDest)) {
    fs.mkdirSync(imagesDest, { recursive: true });
  }
  
  if (fs.existsSync(imagesSource)) {
    fs.readdirSync(imagesSource).forEach(file => {
      fs.copyFileSync(
        path.join(imagesSource, file),
        path.join(imagesDest, file)
      );
    });
    console.log('Copied images directory to dist/');
  }

  // Copy source files needed for dynamic popup
  const sourceFiles = [
    { src: 'src/popup/PopupGenerator.js', dest: 'src/popup/PopupGenerator.js' },
    { src: 'src/config/BiasConfig.js', dest: 'src/config/BiasConfig.js' }
  ];

  sourceFiles.forEach(({ src, dest }) => {
    const source = path.join(__dirname, src);
    const destPath = path.join(__dirname, 'dist', dest);
    const destDir = path.dirname(destPath);
    
    if (fs.existsSync(source)) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(source, destPath);
      console.log(`Copied ${src} to dist/${dest}`);
    }
  });
}

// Main build function
async function build() {
  try {
    if (isWatch) {
      // Watch mode
      console.log('Starting watch mode...');
      
      const ctx = await esbuild.context(buildConfig);
      await ctx.watch();
      
      // Watch for static file changes
      const staticFiles = ['manifest.json', 'popup.html', 'popup.js', 'styles.css', 'info.html'];
      staticFiles.forEach(file => {
        fs.watchFile(file, () => {
          console.log(`${file} changed, copying...`);
          copyStaticFiles();
        });
      });
      
      console.log('Watching for changes...');
    } else {
      // Single build
      await esbuild.build(buildConfig);
      console.log('Build complete!');
    }
    
    // Copy static files
    copyStaticFiles();
    
    // Update manifest to use the bundled file
    const manifestPath = path.join(__dirname, 'dist', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.content_scripts[0].js = ['content.js'];
    manifest.content_scripts[0].css = ['styles.css', 'excellence-styles.css'];
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Updated manifest.json');
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run build
build();
