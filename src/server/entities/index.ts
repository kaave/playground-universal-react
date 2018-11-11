import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import { User } from './User';

let connection: Connection;

export const entities = [User];

export const config: ConnectionOptions = {
  entities,
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.CONTAINER_EXPOSE_PORT_DB || '', 10) || 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'app',
  synchronize: true,
  logging: 'all',
};

export async function getDatabaseConnection(): Promise<Connection> {
  if (!connection) {
    connection = await createConnection(config);
  }

  return connection;
}
