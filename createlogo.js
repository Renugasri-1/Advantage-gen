const sharp = require("sharp");

async function createLogo() {
  const svg = `
    <svg width="300" height="300">
      <rect width="300" height="300" fill="black"/>
      <text x="50%" y="55%" font-size="80" fill="white"
            text-anchor="middle" dominant-baseline="middle">
        AG
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile("assets/logo.png");

  console.log("Logo created!");
}

createLogo();