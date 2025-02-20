import Image from "next/image";
import Link from "next/link";




export async function generateStaticParams() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`);
    const data = await res.json();
  
    return data.results.map((movie) => ({
      id: movie.id.toString(), // Must be a string
    }));
  }

export default async function MovieDetail({ params }) {
    const { movie } = await params;  // ✅ Fix: Await params

    const imagePath = "https://image.tmdb.org/t/p/original";
    // console.log("Movie ID from URL:", movie);

    // ✅ Handle errors in fetching data
    let res;
    try {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
        );
        res = await data.json();
        // console.log('API response:', res);

        if (!data.ok) {
            throw new Error(res.status_message || "Failed to fetch movie data");
        }
    } catch (error) {
        console.error("Error fetching movie details:", error.message);
        return <div className="text-center text-red-500">Error loading movie details.</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold">{res.title}</h2>
            <p className="text-lg text-gray-500">{res.release_date}</p>
            <h2 className="text-lg font-semibold">Runtime: {res.runtime} minutes</h2>
            <h2 className="bg-green-600 text-white inline-block my-2 py-2 px-4 rounded-lg text-sm">
                {res.status}
            </h2>

            {/* ✅ Check if backdrop_path exists before rendering the image */}
            {res.backdrop_path ? (
                   
                   
                   <Link href="/">
                   <Image
                       className="my-12 rounded-lg shadow-lg cursor-pointer"
                       src={imagePath + res.backdrop_path}
                       alt={res.title}
                       width={1000}
                       height={500}
                       priority
                   />
               </Link>
            ) : (
                <p className="text-gray-400">No image available</p>
            )}

            <div className="my-4">
                <p className="text-lg text-gray-800">{res.overview || "No overview available."}</p>
            </div>
        </div>
    );
}
