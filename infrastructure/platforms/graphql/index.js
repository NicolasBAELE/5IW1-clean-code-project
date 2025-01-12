"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("@apollo/server");
var schema_js_1 = require("./schema.js");
var Query_ts_1 = require("./resolveurs/Query.ts");
var Mutation_ts_1 = require("./resolveurs/Mutation.ts");
var resolvers = { Query: Query_ts_1.Query, Mutation: Mutation_ts_1.Mutation };
var server = new server_1.ApolloServer({ typeDefs: schema_js_1.default, resolvers: resolvers });
server.listen({ port: 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("Server ready at ".concat(url));
});
