import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Ambil seluruh query string dari request yang masuk dari frontend
  const { search } = new URL(request.url);

  // URL API eksternal
  const externalApiUrl = `https://suitmedia-backend.suitdev.com/api/ideas${search}`;

  try {
    // Lakukan fetch ke API eksternal
    const res = await fetch(externalApiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Jika respons dari API eksternal tidak sukses, teruskan errornya
    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: "Error from external API", details: errorData }, { status: res.status });
    }

    const data = await res.json();
    
    // Kembalikan data dari API eksternal ke frontend Anda
    return NextResponse.json(data);

  } catch (error) {
    // Tangani error jika fetch ke API eksternal gagal
    console.error("Proxy fetch error:", error);
    return NextResponse.json(
      { message: 'Failed to fetch data from external API' },
      { status: 500 }
    );
  }
}