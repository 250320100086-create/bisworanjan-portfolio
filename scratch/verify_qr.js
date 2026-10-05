import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import fs from 'fs';

async function testQR() {
  const targetUrl = 'https://bisworanjan-portfolio.vercel.app';
  console.log('Generating QR code buffer for:', targetUrl);

  const pngBuffer = await QRCode.toBuffer(targetUrl, {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 300,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  const png = PNG.sync.read(pngBuffer);
  const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);

  if (!code) {
    console.error('FAILED: jsQR could not decode the generated QR code!');
    process.exit(1);
  }

  console.log('DECODED QR DATA:', code.data);
  if (code.data === targetUrl) {
    console.log('SUCCESS: QR code decoded perfectly and matches target URL exactly!');
    process.exit(0);
  } else {
    console.error('MISMATCH: Decoded value', code.data, 'does not match target', targetUrl);
    process.exit(1);
  }
}

testQR();
