import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const conversions = [
  {
    input: 'scripts/source-images/design_screen_1.png',
    output: 'public/design_screen_1.webp',
    options: { quality: 80 },
  },
  {
    input: 'scripts/source-images/design_screen_2.png',
    output: 'public/design_screen_2.webp',
    options: { quality: 80 },
  },
  {
    input: 'scripts/source-images/design_screen_3.png',
    output: 'public/design_screen_3.webp',
    options: { quality: 80 },
  },
];

async function optimize() {
  for (const item of conversions) {
    const inputPath = path.resolve(root, item.input);
    const outputPath = path.resolve(root, item.output);

    try {
      let pipeline = sharp(inputPath);

      if (item.resize) {
        pipeline = pipeline.resize({ width: item.resize.width, withoutEnlargement: true });
      }

      pipeline = pipeline.webp(item.options);

      await pipeline.toFile(outputPath);

      console.log(`✓ ${item.input} → ${item.output}`);
    } catch (err) {
      console.error(`✗ Failed: ${item.input} — ${err.message}`);
    }
  }
}

optimize();
