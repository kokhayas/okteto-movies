class MongoClient {
  static insertedMovies = [];
  static insertedWatching = [];

  constructor(url, options) {
    this.url = url;
    this.options = options;
  }

  on(_event, _callback) {
    return;
  }

  db(_database) {
    return {
      collection: (collection) => ({
        find: () => ({
          toArray: () => new Promise((resolve, reject) => {
            if (collection === 'movies') {
              resolve([{ title: 'The Matrix' }]);
            } else if (collection === 'watching') {
              resolve([{ title: 'The Godfather' }]);
            } else {
              reject('unknown collection');
            }
          })
        }),
        insertMany: (docs, callback) => {
          if (collection === 'movies') MongoClient.insertedMovies = docs;
          if (collection === 'watching') MongoClient.insertedWatching = docs;
          callback();
        }
      })
    };
  }

  static get mock() {
    return {
      insertedMovies: MongoClient.insertedMovies,
      insertedWatching: MongoClient.insertedWatching,
      reset: () => {
        MongoClient.insertedMovies = [];
        MongoClient.insertedWatching = [];
      }
    }
  }
}

module.exports = { MongoClient };
