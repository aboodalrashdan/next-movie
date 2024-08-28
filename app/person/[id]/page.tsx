// app/person/[id]/page.tsx
import { notFound } from 'next/navigation';
import styles from './person.module.css';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface PersonDetailsProps {
  id: number;
  name: string;
  birthday: string;
  biography: string;
  profile_path: string;
  homepage: string;
  imdb_id: string;
}

const PersonDetails = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`https://api.themoviedb.org/3/person/${params.id}?api_key=${apiKey}`);

  if (!res.ok) {
    return notFound();
  }

  const person: PersonDetailsProps = await res.json();

  return (
    <div className={styles.container}>
      <div className={styles.personWrapper}>
        <div className={styles.personPoster}>
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
            width={700}
            height={1170}
          />
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.name}>{person.name}</div>
          {!!person.birthday && <div className={styles.birthday}>{person.birthday}</div>}
          <div className={styles.subTitle}>The Biography</div>
          <div className={styles.bio}>{person.biography}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
