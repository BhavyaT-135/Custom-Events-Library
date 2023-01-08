# Custom-Events-Library

## Adding the .env file with Mongo_URL
Create a `.env` file in the `/src/lib` directory. Thereafter, configure the `.env` file as follows:

```
MONGO_URL= <INSERT YOUR MONGODB URL HERE>
```

## Running the test script
Run the following command in the root directory of the project to run the test scripts of the custom-events library:

```
npm run test
```

Once you run this command, the outcomes of the tests will be declared in your terminal. Also, a file by the name of `app.log` will be created in the root directory, storing the logs of the respective tests.
