const fs = require('fs');
const https = require('https');
const path = require('path');

// Create images directory if it doesn't exist
const imageDir = path.join(__dirname, 'src', 'assets', 'images', 'products');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Sample product images from Unsplash (free to use)
const productImages = {
  'moisturizer.jpg': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop',
  'lipstick.jpg': 'https://images.unsplash.com/photo-1586495265775-63d2b5b8d5e3?w=500&h=500&fit=crop',
  'cleanser.jpg': 'https://images.unsplash.com/photo-1607602132700-068d9adf6784?w=500&h=500&fit=crop',
  'eyeshadow.jpg': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4f2f?w=500&h=500&fit=crop',
  'sunscreen.jpg': 'https://images.unsplash.com/photo-1612817288480-83fddaf26f2b?w=500&h=500&fit=crop',
  'mascara.jpg': 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=500&h=500&fit=crop',
  'serum.jpg': 'https://images.unsplash.com/photo-1574323347407-f5e72d86f181?w=500&h=500&fit=crop',
  'blush.jpg': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop',
  'night-cream.jpg': 'https://images.unsplash.com/photo-1571782746554-6c3f9a0a7d7d?w=500&h=500&fit=crop',
  'brushes.jpg': 'https://images.unsplash.com/photo-1583947581924-860bda614c35?w=500&h=500&fit=crop',
  'facial-mist.jpg': 'https://images.unsplash.com/photo-1612817288480-83fddaf26f2b?w=500&h=500&fit=crop',
  'lip-balm.jpg': 'https://images.unsplash.com/photo-1571782746554-6c3f9a0a7d7d?w=500&h=500&fit=crop'
};

// Function to download a file
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', error => {
      fs.unlink(filepath, () => {});
      reject(error);
    });
  });
}

// Download all images
async function downloadAllImages() {
  const entries = Object.entries(productImages);
  
  for (const [filename, url] of entries) {
    const filepath = path.join(imageDir, filename);
    try {
      await downloadImage(url, filepath);
      console.log(`Downloaded ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
}

downloadAllImages().then(() => {
  console.log('All images downloaded successfully!');
}).catch(console.error);
