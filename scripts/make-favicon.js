const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SIZE = 192;
const logoPath = path.join(__dirname, "../src/Assets/logo.png");
const outPath = path.join(__dirname, "../public/favicon.png");

const circleSvg = `
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="white"/>
</svg>
`;

async function main() {
  const mask = await sharp(Buffer.from(circleSvg))
    .resize(SIZE, SIZE)
    .png()
    .toBuffer();

  await sharp(logoPath)
    .resize(SIZE, SIZE, { fit: "cover", position: "center"  })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(outPath);

  console.log("Favicon written to public/favicon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
