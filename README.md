### B2 CRUD

## INSTALLING:

- Find and download the code at: https://gitlab.lnu.se/1dv528/student/nc222gs/b2-crud (zip format for example).

- The needed node modules are included in the `package.json` file, so the only thing you need to do is to open the terminal (inside the project folder) and run the command `npm install`

- Grading: I'm using eslint, however, in `package.json` is declared that i'm using a devDependency called `"@lnu/eslint-config": "^1.1.10"`. I extend it in `.eslintrc.cjs` so that the project can enforce the linting rules.

- I use ES6 modules imports (`"type":"module"` in `package.json`).

- You need to install docker on your machine. Once it is installed, the program will be able to connect to docker/mongoDB through the command `docker-compose up -d`.

## RUNNING THE PROGRAM:

- Inside the project folder, run the command `npm run start` and click on the link that appears in the terminal.

## VIDEO:

[https://youtu.be/oRLGDuSzHeQ]
