// build.js - Build script for Chrome and Firefox extensions
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const { StyleGenerator } = require('./src/build/StyleGenerator.js');

// Parse command line arguments
const isWatch = process.argv.includes('--watch');
const target = process.argv.find(arg => arg.startsWith('--target='))?.split('=')[1] || 'chrome';
const validTargets = ['chrome', 'firefox', 'all'];

if (!validTargets.includes(target)) {
  console.error(`Invalid target: ${target}. Valid targets: ${validTargets.join(', ')}`);
  process.exit(1);
}

// Get build configuration for target
function getBuildConfig(targetName) {
  const outputDir = targetName === 'firefox' ? 'dist-firefox' : 'dist';
  return {
    entryPoints: ['src/content/content-script.js'],
    bundle: true,
    outfile: `${outputDir}/content.js`,
    format: 'iife',
    target: targetName === 'firefox' ? 'firefox78' : 'chrome90',
    sourcemap: true,
    logLevel: 'info',
  };
}

// Ensure output directories exist
function ensureDirectories(targets) {
  const dirs = targets.map(t => t === 'firefox' ? 'dist-firefox' : 'dist');
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });
}

// Copy static files to target directory
function copyStaticFiles(targetName) {
  const outputDir = targetName === 'firefox' ? 'dist-firefox' : 'dist';
  const manifestFile = targetName === 'firefox' ? 'manifest-firefox.json' : 'manifest.json';
  
  const filesToCopy = [
    manifestFile,
    'popup.html', 
    'src/popup/popup-dynamic.js',
    'src/excellence-styles.css',
    'info.html'
  ];

  filesToCopy.forEach(file => {
    const source = path.join(__dirname, file);
    let destFile = file.includes('/') ? path.basename(file) : file;
    
    // Rename popup-dynamic.js to popup.js
    if (destFile === 'popup-dynamic.js') {
      destFile = 'popup.js';
    }
    
    // Rename manifest files to manifest.json
    if (destFile.startsWith('manifest-')) {
      destFile = 'manifest.json';
    }
    
    const dest = path.join(__dirname, outputDir, destFile);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`Copied ${file} to ${outputDir}/${destFile}`);
    }
  });

  // Copy images directory
  const imagesSource = path.join(__dirname, 'images');
  const imagesDest = path.join(__dirname, outputDir, 'images');
  
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
    console.log(`Copied images directory to ${outputDir}/`);
  }

  // Copy source files needed for dynamic popup
  const sourceFiles = [
    { src: 'src/popup/PopupGenerator.js', dest: 'src/popup/PopupGenerator.js' },
    { src: 'src/config/BiasConfig.js', dest: 'src/config/BiasConfig.js' },
    { src: 'src/build/StyleGenerator.js', dest: 'src/build/StyleGenerator.js' }
  ];

  sourceFiles.forEach(({ src, dest }) => {
    const source = path.join(__dirname, src);
    const destPath = path.join(__dirname, outputDir, dest);
    const destDir = path.dirname(destPath);
    
    if (fs.existsSync(source)) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(source, destPath);
      console.log(`Copied ${src} to ${outputDir}/${dest}`);
    }
  });
}

// Generate CSS from BiasConfig
function generateCSS(targetName) {
  const outputDir = targetName === 'firefox' ? 'dist-firefox' : 'dist';
  try {
    console.log(`Generating CSS from BiasConfig for ${targetName}...`);
    const styleGenerator = new StyleGenerator();
    const generatedCSS = styleGenerator.generateCompleteStylesheet();
    
    const cssPath = path.join(__dirname, outputDir, 'styles.css');
    fs.writeFileSync(cssPath, generatedCSS);
    console.log(`Generated styles.css with dynamic bias type CSS for ${outputDir}`);
  } catch (error) {
    console.error('Error generating CSS:', error);
    // Fallback to copying existing styles.css
    const source = path.join(__dirname, 'styles.css');
    const dest = path.join(__dirname, outputDir, 'styles.css');
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`Fallback: Copied existing styles.css to ${outputDir}`);
    }
  }
}

// Update manifest for target
function updateManifest(targetName) {
  const outputDir = targetName === 'firefox' ? 'dist-firefox' : 'dist';
  const manifestPath = path.join(__dirname, outputDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  manifest.content_scripts[0].js = ['content.js'];
  manifest.content_scripts[0].css = ['styles.css', 'excellence-styles.css'];
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Updated ${outputDir}/manifest.json`);
}

// Build for specific target
async function buildTarget(targetName) {
  console.log(`Building for ${targetName}...`);
  const buildConfig = getBuildConfig(targetName);
  
  if (isWatch && targetName === 'chrome') {
    // Watch mode only for Chrome (default)
    console.log('Starting watch mode for Chrome...');
    const ctx = await esbuild.context(buildConfig);
    await ctx.watch();
    
    // Watch for static file changes
    const staticFiles = ['manifest.json', 'popup.html', 'popup.js', 'styles.css', 'info.html'];
    staticFiles.forEach(file => {
      fs.watchFile(file, () => {
        console.log(`${file} changed, copying...`);
        copyStaticFiles('chrome');
      });
    });
    
    console.log('Watching for changes...');
  } else {
    // Single build
    await esbuild.build(buildConfig);
    console.log(`Build complete for ${targetName}!`);
  }
  
  // Copy static files
  copyStaticFiles(targetName);
  
  // Generate CSS from BiasConfig
  generateCSS(targetName);
  
  // Update manifest to use the bundled file
  updateManifest(targetName);
}

// Main build function
async function build() {
  try {
    const targets = target === 'all' ? ['chrome', 'firefox'] : [target];
    
    // Ensure directories exist
    ensureDirectories(targets);
    
    // Build each target
    for (const t of targets) {
      await buildTarget(t);
    }
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run build
build();
