import { Command, Console } from 'nestjs-console';
import { DatabaseSeedService } from '@app/database/seed.service';

@Console()
export class SeedCommand {
  constructor(private readonly seedService: DatabaseSeedService) {}

  @Command({
    command: 'seed:admin',
    description: 'Seed admin user',
  })
  async seedAdmin() {
    try {
      const result = await this.seedService.seedAdminUser();
      console.log(result.message);
      if (result.user) {
        console.log('Admin user details:', {
          email: result.user.email,
          password: 'admin123', // Only shown during seeding
          roles: result.user.roles,
        });
      }
    } catch (error) {
      console.error('Error seeding admin user:', (error as Error).message);
    }
  }
}
