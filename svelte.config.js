import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '$components': '/src/lib/components',
      '$db': '/src/lib/db',
      '$lib': '/src/lib',
      '$src': '/src',
    }
  },

  preprocess: [vitePreprocess({})],
};

export default config;
