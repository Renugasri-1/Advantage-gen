const sharp = require("sharp");

async function applyBranding(baseImagePath, logoPath, outputPath) {
  try {
    const baseImage = sharp(baseImagePath);
    const metadata = await baseImage.metadata();

    const imageWidth = metadata.width;
    const imageHeight = metadata.height;

    // Responsive sizing
    const margin = Math.round(imageWidth * 0.03);
    const logoWidth = Math.round(imageWidth * 0.18);

    // Resize logo
    const logoBuffer = await sharp(logoPath)
      .resize({ width: logoWidth })
      .png()
      .toBuffer();

    const logoMeta = await sharp(logoBuffer).metadata();
    const logoHeight = logoMeta.height;

    // Position logo bottom-right
    const logoX = imageWidth - logoWidth - margin;
    const logoY = imageHeight - logoHeight - margin;

    await baseImage
      .composite([
        {
          input: logoBuffer,
          left: logoX,
          top: logoY
        }
      ])
      .toFile(outputPath);

  } catch (error) {
    throw new Error("Branding failed");
  }
}

module.exports = applyBranding;



