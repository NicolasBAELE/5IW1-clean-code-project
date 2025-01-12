import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema.js";
import { Query } from "./resolveurs/Query.ts";
import { Mutation } from "./resolveurs/Mutation.ts";

const resolvers = { Query, Mutation };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
