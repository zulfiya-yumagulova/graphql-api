import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";

const resolvers = {
  Query: {
    games: () => db.games,
    authors: () => db.authors,
    reviews: () => db.reviews,
    review: (_, args) => {
      return db.reviews.find((review) => review.id === args.id);
    },
    author: (_, args) => {
      return db.authors.find((author) => author.id === args.id);
    },
    game: (_, args) => {
      return db.games.find((game) => game.id === args.id);
    },
  },
};

// Server set up
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});
console.log("Server ready at port", 4000);
