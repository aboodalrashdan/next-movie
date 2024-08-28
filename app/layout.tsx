// app/layout.tsx
import { fetchCategories } from './services/movies'; 
import Navbar from './components/Navbar';
import './globals.css'; 
import styles from './layout.module.css';
import { DarkModeProvider } from './context/DarkModeContext';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await fetchCategories();

  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <div className={styles.nav}>
            <Navbar categories={categories} />
            </div>
            <div className={styles.moviesSection}>
                {children}
            </div>
        </DarkModeProvider>
      </body>
    </html>
  );
}
