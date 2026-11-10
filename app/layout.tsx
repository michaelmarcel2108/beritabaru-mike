// app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import defaultData from '@/data/prankData.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://berita-kampus-terkini.com';
const thumbnail = defaultData.news.thumbnailImage || defaultData.news.coverImage;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#be123c',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultData.news.headline,
  description: defaultData.news.subheadline,
  keywords: defaultData.news.hotTopicTags,
  authors: [{ name: defaultData.news.author }],
  openGraph: {
    title: defaultData.news.headline,
    description: defaultData.news.subheadline,
    url: siteUrl,
    siteName: defaultData.news.portalName,
    type: 'article',
    locale: 'id_ID',
    images: [
      {
        url: thumbnail,
        width: 1200,
        height: 630,
        alt: 'Foto Terlapor Ketua UKM Musik Kasus Rock Goes To Campuss',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultData.news.headline,
    description: defaultData.news.subheadline,
    images: [thumbnail],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Tailwind CDN Fallback for instant styles rendering in any browser */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      love: {
                        50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8',
                        300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899',
                        600: '#db2777', 700: '#be185d', 800: '#9d174d',
                        900: '#831843'
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
