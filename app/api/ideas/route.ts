// app/api/ideas/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Ambil parameter query dari URL request
  const { search } = new URL(req.url);

  // Bangun URL API eksternal
  const externalApiUrl = `https://suitmedia-backend.suitdev.com/api/ideas${search}`;

  try {
    const response = await fetch(externalApiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      // Untuk memastikan tidak ada revalidate jika pakai Next cache
      next: { revalidate: 0 },
    });

    // Jika respons tidak sukses, lempar error ke client
    if (!response.ok) {
      return NextResponse.json(
        { message: 'Error from external API' },
        { status: response.status }
      );
    }

    // Parse JSON dan kirim ke frontend
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch error in proxy:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
