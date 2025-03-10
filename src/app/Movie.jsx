import Link from "next/link";
import Image from "next/image";

export default function Movie({ title, id, poster_path, release_date }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <h1>{title}</h1>
      <h1>{release_date}</h1>

      {poster_path ? (
        <Link href={`/movies/${id}`}>
          <Image
            src={imagePath + poster_path}
            width={800}
            height={800}
            alt={title}
            priority
          />
        </Link>
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}
