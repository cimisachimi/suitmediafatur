import Header from "../components/Header";
import Banner from "../components/Banner";
import PostList from '@/components/PostList';
import { Suspense } from 'react';

const bannerData = {
  imageUrl: '/images/banner.jpg',
  title: 'Ideas',
  subtitle: 'Where all our great things begin',
};

// DEFINISIKAN KOMPONEN DI SINI
function IdeasPageContent() {
  return <PostList />;
}

export default function Home() {
  return (
    <div>
      
      <Header />

      <Banner
        imageUrl={bannerData.imageUrl}
        title={bannerData.title}
        subtitle={bannerData.subtitle}
      />

      {/* Konten Halaman Home */}
      <div className="container mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold">Our Content</h2>
        <p className="mt-2">Here is where we start our journey...</p>
      </div>

      {/* Bagian List Postingan */}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">Our Ideas</h1>
        <Suspense fallback={<div className="text-center">Loading Page...</div>}>
          {/* SEKARANG KOMPONEN INI SUDAH TERDEFINISI */}
          <IdeasPageContent /> 
        </Suspense>
      </div>
    </div>
  );
}