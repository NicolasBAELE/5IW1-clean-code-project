import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import typeDefs from "./schema.js";
import {Query} from "./resolveurs/Query.js";
import {Mutation} from "./resolveurs/Mutation.js";

const resolvers = {Query, Mutation};

const server = new ApolloServer({typeDefs, resolvers});

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000},
});
console.log(`🚀  Server ready at ${url}`);
