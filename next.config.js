/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
   output: "export",
   // ssg에선 image optimization 불가
   images: { unoptimized: true, formats: ["image/avif", "image/webp"] },
   // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
   // trailingSlash: true,

   // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
   // skipTrailingSlashRedirect: true,

   // Optional: Change the output directory `out` -> `dist`
   // distDir: 'dist',
};

module.exports = nextConfig;
