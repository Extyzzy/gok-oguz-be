# platform-core

This is a NestJS project with various commands to manage the development and deployment process using Docker, TypeORM, and other tools.

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

### Environment Setup

1. Create a `.env` file in the root directory of the project.
2. Copy the content of `.env.example` into `.env` and adjust the variables as needed.

### Running the Application

Development
To start the application in development mode with automatic migrations:

```bash
yarn start
```

To start the application in local development mode without migrations:

```bash
yarn start:dev
```

Production
To start the application in production mode:

```bash
yarn start
```

Database Management
Running Migrations
To run the migrations:

```bash
yarn typeorm:migration
```

Generating Migrations
To generate a new migration:

```bash
yarn typeorm:migration
./db/migrations/YourMigrationName.ts
```

Creating Migrations
To create a new migration:

```bash
yarn typeorm:migration
-d ./db/migrations/YourMigrationName.ts
```

Reverting Migrations
To revert the last migration run:

```bash
yarn typeorm:migration
```

Dropping the Database Schema
To drop the database schema:

```bash
yarn typeorm:schema
```

Running Seeds
To run the database seeds:

```bash
yarn typeorm:seed
```

Cleaning Migrations
To clean all migrations:

```bash
yarn clean-migrations
```

Building the Project
To build the project:

```bash
yarn build
```

Linting
To lint the project:

```bash
yarn lint
```

Testing
To run the end-to-end tests:

```bash
yarn test
```

Additional Commands
TypeORM CLI
To run TypeORM CLI commands:

```bash
yarn typeorm
```
