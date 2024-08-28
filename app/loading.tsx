//app/loading.tsx
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.cube}></div>
      </div>
    </div>
  );
};

export default Loading;
