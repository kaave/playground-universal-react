import { Application, Request, Response, Router } from 'express';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';

const router = Router();

const schema = buildSchema(`
  type Query {
    message: String
  }
`);

const rootValue = {
  message() {
    return 'Hello GraphQL';
  },
};

export function setGraphQLRoutes(app: Application) {
  app.use(
    '/graphql',
    expressGraphQL({
      schema,
      rootValue,
      graphiql: true,
    }),
  );
}
