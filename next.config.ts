import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 // Konfigurasi lain yang mungkin sudah Anda miliki...
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.suitdev.com',
        port: '',
        pathname: '/storage/files/**', // Pola ini mengizinkan semua gambar dari path tersebut
      },
    ],
  },
};
export default nextConfig;
