import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Chia Yi Steel - MES System',
  description: 'Manufacturing Execution System for Chia Yi Steel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
