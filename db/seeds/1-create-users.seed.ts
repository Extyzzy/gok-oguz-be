import bcrypt from 'bcryptjs';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Users } from '../../src/modules/users/users.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const repository = connection.getRepository(Users);

    const count = await repository.count();

    if (count > 0) {
      console.log('Users table is not empty. Seeding aborted.');
      return;
    }

    const password = await bcrypt.hash('123456', 10);

    await repository.insert([
      {
        email: 'ruslan@gokoguz.com',
        uuid: 'uuid1',
        first_name: 'Ruslan',
        last_name: 'Timbal',
        refresh_token: '',
        password: password,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'serghei@gokoguz.com',
        uuid: 'uuid2',
        first_name: 'Serghei',
        last_name: 'Pirvu',
        refresh_token: '',
        password: password,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'valentin@gokoguz.com',
        uuid: 'uuid3',
        first_name: 'Valentin',
        last_name: 'Leanca',
        refresh_token: '',
        password: password,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }
}
