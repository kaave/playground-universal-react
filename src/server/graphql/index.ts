import { Application } from 'express';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Query {
  course(id: Int!): Course
  courses(topic: String): [Course]
},
type Course {
  id: Int
  title: String
  author: String
  description: String
  topic: String
  url: String
}
`);

interface Course {
  id: number;
  title: string;
  author: string;
  description: string;
  topic: string;
  url: string;
}

const coursesData: Course[] = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/',
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description:
      'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/',
  },
];

const getCourse = ({ id }: { id: number }) => coursesData.find(course => course.id === id);
const getCourses = ({ topic }: { topic?: string }) =>
  !topic ? coursesData : coursesData.filter(course => course.topic === topic);

const rootValue = {
  course: getCourse,
  courses: getCourses,
};

export function setGraphQLRoutes(app: Application, isDevelopment: boolean) {
  app.use(
    '/graphql',
    expressGraphQL({
      schema,
      rootValue,
      graphiql: isDevelopment,
    }),
  );
}
