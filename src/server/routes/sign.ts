import express, { Express } from 'express';
import axios from 'axios';

import { apiHost } from '../configs';

export const router = express.Router();

// router.post('/signup', async (req, res) => {});

router.post('/signin', async (req, res) => {
  const { userid, password } = req.body as { userid: string; password: string };

  if (!userid || !password) {
    res.sendStatus(500);
    return;
  }

  try {
    const response = (await axios.get(`${apiHost}/users/${userid}`)) as any;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    req.session!.name = response.data.name;
    console.log(req.session);
    res.json(response.data);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.get('/signout', async (req, res) => {
  if (req.session) {
    req.session.destroy(e => {
      if (e) {
        console.error(e);
      }
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(200);
  }
});

export function regist(app: Express) {
  app.use('/', router);
}
