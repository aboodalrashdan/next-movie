// components/Darkmode.tsx
'use client'
import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import styles from './Darkmode.module.css';

const Darkmode: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className={styles.rightNav}>
            <div className={styles.toggleTheme}>
            <button
                className={`${styles.sun} ${!darkMode ? styles.active : ''}`}
                onClick={toggleDarkMode}
            >
                ☀
            </button>
            <div className={styles.toggleBtn}>
                <input
                    id='toggleTheme'
                    type='checkbox'
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                <label htmlFor='toggleTheme'></label>
            </div>
            <button
                className={`${styles.moon} ${darkMode ? styles.active : ''}`}
                onClick={toggleDarkMode}
            >
                ☾
            </button>
            </div>
        </div>
    );
};

export default Darkmode;
