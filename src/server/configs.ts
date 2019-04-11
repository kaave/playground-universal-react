import Dotenv from 'dotenv';

Dotenv.config();

export const apiHost = `http://localhost:${process.env.PORT_API}/api/v1`;
