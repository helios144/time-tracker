# Time tracker

## Installation

### Backend

- in backend folder
- create backend/.env.local file and adjust change default values as needed from backend/.env file
- Generate SSL key with
  ```bash
  php bin/console lexik:jwt:generate-keypair
  ```
- Create new database
  ```bash
  php bin/console doctrine:database:create
  ```
- Create a migration
  ```bash
  php bin/console make:migration
  ```
- Make a migration
  ```bash
  php bin/console doctrine:migrations:migrate
  ```

### Frontend

- in frontend folder
- create frontend/.env.local file and adjust change default values as needed
- make a build with command
  ```bash
  npm run build
  ```
  `build` folder will be created and ready to be served by http server.
