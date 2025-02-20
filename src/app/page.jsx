import Movie from "./Movie";

export default async function Home() {
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`;

  let res;
  try {
    const data = await fetch(API_URL, { next: { revalidate: 15 } });
    if (!data.ok) throw new Error("Failed to fetch movies");
    res = await data.json();
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return <div className="text-red-500 text-center">Error loading movies.</div>;
  }

  return (
    <main>
      <div className="grid grid-cols-fluid gap-16">
        {res.results.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </main>
  );
}
