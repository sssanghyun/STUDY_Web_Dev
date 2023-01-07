import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);
  const client = useApolloClient();
  useEffect(() => {
    client.query({
      query: gql`
      {
        
        allTweets {
          id
          text
          author {
            fullName
          }
        }
        
      }`
    }).then(results => setMovies(results.data.allTweets));
  }
    , [client])
  return <div>{movies.map(movie => <li key={movie.id}>{movie.text}</li>)}</div>;
}
export default Movies;