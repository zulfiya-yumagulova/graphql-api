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
    Game: {
      reviews(parent) {
        return db.reviews.filter((review) => review.game_id === parent.id);
      },
    },
    Author: {
      reviews(parent) {
        return db.reviews.filter(
          (author) => author.author_id === parent.author_id
        );
      },
    },
    Reviews: {
      author(parent) {
        return db.authors.find((author) => author.id === parent.author_id);
      },
      game(parent) {
        return db.games.find((game) => game.game_id === parent.game_id);
      },
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
