import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mohammad Ariful Islam | AI & ML Engineer',
  description: 'Portfolio of Mohammad (Md.) Ariful Islam, Applied AI & Machine Learning Engineer specializing in healthcare and vision-based systems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30">
        <div className="neural-bg" />
        {children}
      </body>
    </html>
  );
}
