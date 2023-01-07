import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apollo = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

apollo.query({
  query: gql`
    {
      
    allTweets {
      id
      text
      author {
        fullName
      }
    }

    }
  `,
}).then(data => console.log(data));

export default apollo;
