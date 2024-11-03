import './globals.css';

export const metadata = {
  title: 'Chess',
  description: 'A gay boi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '20px', textAlign: 'center' }}>
        </header>
        <main style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
