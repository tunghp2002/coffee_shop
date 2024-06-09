'use client';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { store } from '@/store';
import { Provider } from 'react-redux';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Provider>
  );
}
