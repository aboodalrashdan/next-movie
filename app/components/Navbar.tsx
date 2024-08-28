'use client';

import { useState, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation'; 
import Link from 'next/link';
import styles from './Navbar.module.css';
import Darkmode from 'app/context/Darkmode';
import Logo from '../icons/logo.svg';
import DotIcon from '../icons/dot.svg';
import TmdbLogo from '../icons/tmdbgreen.svg';
import Poll from '../icons/poll.svg';
import Hart from '../icons/heart.svg';

interface Category {
  id: number;
  name: string;
}

export default function Navbar({ categories }: { categories: Category[] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const activeLink = useMemo(() => pathname, [pathname]);

  const isActive = useCallback((href: string) => activeLink === href, [activeLink]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (href: string) => {
    setIsSidebarOpen(false);
  };

  if (!categories || categories.length === 0) {
    return <div>No categories available</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.navbar}>
            <button className={styles.sidebarToggle} onClick={toggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <Darkmode />
          </nav>
        </div>
      </div>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.openSidebar : ''}`}>
        <Logo className={styles.logo} />
        <div className={styles.mainCategory}>Discover</div>
        <Link href="/" className={`${styles.subCategory} ${isActive('/') ? styles.activeMenu : ''}`} onClick={() => closeSidebar('/')}>
          <Hart fill="currentColor" width={9} height={9} />
          <button>Popular</button>
        </Link>
        <Link href="/top-rated" className={`${styles.subCategory} ${isActive('/top-rated') ? styles.activeMenu : ''}`} onClick={() => closeSidebar('/top-rated')}>
          <Poll fill="currentColor" width={9} height={9} />
          <button>Top Rated</button>
        </Link>
        <Link href="/upcoming" className={`${styles.subCategory} ${isActive('/upcoming') ? styles.activeMenu : ''}`} onClick={() => closeSidebar('/upcoming')}>
          <Hart fill="currentColor" width={9} height={9} />
          <button>Upcoming</button>
        </Link>
        <div className={styles.mainCategory}>Genres</div>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className={`${styles.subCategory} ${isActive(`/categories/${category.id}`) ? styles.activeMenu : ''}`}
            onClick={() => closeSidebar(`/categories/${category.id}`)}
          >
            <DotIcon fill="currentColor" width={9} height={9} />
            <button>{category.name}</button>
          </Link>
        ))}
        <TmdbLogo className={styles.greenLogo} fill="currentColor" />
      </div>

      <div className={`${styles.overlay} ${isSidebarOpen ? styles.openOverlay : ''}`} onClick={() => closeSidebar(activeLink)}></div>
    </>
  );
}
