import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query getMovies{
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

function Movies() {
  const { data, loading, error } = useQuery(GET_MOVIES);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Could not fetch :( </h1>
  }

  return <ul>
    {data.allTweets.map(movie => <li key={movie.id}>{movie.text}</li>)}
  </ul>;
}
export default Movies;