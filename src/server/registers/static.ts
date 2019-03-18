import express, { Express } from 'express';

export function registStatic(app: Express, isDevelopment: boolean) {
  if (isDevelopment) {
    app.use(express.static('./build/client'));
  }

  app.use(express.static('./assets'));
}
