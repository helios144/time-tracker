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
- it is created using create-react-app so, more detailed instructions in frontend/README.md
