import 'tslib';
import * as Dotenv from 'dotenv';
import * as Express from 'express';

Dotenv.load();

const port = process.env.PORT || 3000;
const app = Express.default();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(Express.static('./assets'));

app.use('*', (req, res) => {
  res.render('./index.ejs');
});

app.listen(port, () => console.log(`start: port[${port}]`));
