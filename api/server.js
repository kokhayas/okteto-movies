const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();

const url = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DATABASE}`;

const client = new MongoClient(url, {
  connectTimeoutMS: 1000,
  socketTimeoutMS: 1000,
});

client.on('connectionClosed', ({ error }) => {
  console.error(`Error connecting, retrying in 1 sec: ${error}`);
  setTimeout(startWithRetry, 1000);
});


function startWithRetry() {
  const db = client.db(process.env.MONGODB_DATABASE);

  app.listen(8080, () => {
    app.get("/api/healthz", (req, res, next) => {
      res.sendStatus(200)
      return;
    });

    app.get("/api/movies", (req, res, next) => {
      console.log(`GET /api/movies`)
      const promise = db.collection('movies').find().toArray();

      promise.catch((err) => {
        console.log(`failed to query movies: ${err}`);
        res.json([])
      });

      promise.then((results) => res.json(results));
    });

    app.get("/api/watching", (req, res, next) => {
      console.log(`GET /api/watching`)
      const promise = db.collection('watching').find().toArray();

      promise.catch((err) => {
        console.log(`failed to query watching: ${err}`);
        res.json([])
      });

      promise.then((results) => res.json(results));
    });

    console.log("Server running on port 8080.");
  });

  app.get("/api", (req, res, next) => {
    res.sendStatus(418);
  });
};

startWithRetry();
