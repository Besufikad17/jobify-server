# jobify-server

- Backend app for jobify made by using [nodejs](https://nodejs.org/en/), [express](https://expressjs.com/), [prisma](https://www.prisma.io/) and [mysql](https://www.mysql.com/).


## Installation

1. Clonning the repo
   
   ```bash
    git clone https://github.com/Besufikad17/jobify-server.git
   ```

2. Installing npm packages
   
   ```bash
    cd jobify-server && npm install
    ```
3. Adding configurations
   
   ```bash
   // creaing .env file
   touch .env
   ```
   ```.env
   // storing configs in .env file
    DATABASE_URL = "DB URL"
   ```
4. Building 

    ```bash
    npm run build
    ```

5. Running
    ```bash 
    npm run dev
    ```