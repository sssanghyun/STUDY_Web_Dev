
import { useRouter } from "next/router";
import Seo from "../components/Seo";
import Link from "next/link";

export default function Home({results}) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push({
      pathname: `/movies/${id}`,
      query: {
        title: title
      }
    }, `/movies/${id}`);
  }
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
            <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              <h4>
                  <Link
                  href={{
                    pathname: `/movies/${movie.id}`,
                    query: {
                      title: movie.original_title,
                    },
                  }}
                  as={`/movies/${movie.id}`}
                >
                  {movie.original_title}
                </Link>
              </h4>
              
            </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// Server Side에서 동작하는 코드 함수명 고정으로 임의 변경안됨.
// KEY값을 넣어도 client에서는 볼 수 없음.
export async function getServerSideProps() {
  const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
  return {
    props: {
      results,
    },
  };
}