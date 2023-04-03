import viteImagemin from 'unplugin-imagemin/vite';

export function ConfigImageminPlugin() {
  return viteImagemin({
    // Default mode squoosh. support squoosh and sharp
    mode: 'squoosh',
    // Default configuration options for compressing different pictures
    compress: {
      jpg: {
        quality: 0,
      },
      jpeg: {
        quality: 70,
      },
      png: {
        quality: 70,
      },
      webp: {
        quality: 70,
      },
    },
    conversion: [
      { from: 'png', to: 'webp' },
      { from: 'jpeg', to: 'webp' },
    ],
  });
}
