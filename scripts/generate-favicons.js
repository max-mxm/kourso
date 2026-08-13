/**
 * Script pour générer les favicons PNG à partir du SVG
 *
 * Utilise sharp pour convertir le SVG en PNG de différentes tailles
 *
 * Usage: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const path = require('path');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
  const svgPath = path.join(__dirname, '../public/favicon.svg');
  const outputDir = path.join(__dirname, '../public');

  console.log('🎨 Génération des favicons...\n');

  for (const { size, name } of sizes) {
    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, name));

      console.log(`✅ ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Erreur pour ${name}:`, error.message);
    }
  }

  console.log('\n✨ Favicons générés avec succès !');
}

generateFavicons().catch(console.error);
