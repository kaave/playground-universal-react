import 'tslib';

import { getDatabaseConnection } from './entities';
import { runHttp } from './http';
import { runWS } from './websocket';
import { User } from './entities/User';

async function main() {
  const connection = await getDatabaseConnection();
  await runHttp();
  await runWS();

  const userRepository = connection.getRepository(User);
  await userRepository.save({
    firstName: 'Jane',
    lastName: 'Doe',
    age: 36,
    birthday: new Date('1982-9-24').getTime().toString(),
  });
  const users = await userRepository.find({ age: 36 });
  console.log(users.map(user => [user.birthday, user.age]));
}

main().then(() => console.log('all services are started.'));
