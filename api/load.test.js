require('./load');

const MongoClient = require('mongodb').MongoClient;

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

const isValidMovie = (movie) => {
  return movie._id && movie.original_title && movie.overview && movie.vote_average && movie.backdrop_path;
}

describe('load.js', () => {
  it('should insert movies', () => {
    expect(MongoClient.mock.insertedMovies.length).toBeGreaterThan(0);
    expect(MongoClient.mock.insertedMovies.every(isValidMovie)).toBe(true);
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it('should insert watching', () => {
    expect(MongoClient.mock.insertedWatching.length).toBeGreaterThan(0);
    expect(MongoClient.mock.insertedWatching.every(isValidMovie)).toBe(true);
    expect(mockExit).toHaveBeenCalledWith(0);
  });
});
