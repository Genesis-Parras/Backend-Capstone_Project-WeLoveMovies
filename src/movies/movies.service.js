const knex = require("../db/connection");

// lists all movies that are currently showing
function list(isShowing) {
  if (isShowing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("mt.movie_id")
      .select("m.*")
      .where({ is_showing: true });
  }

  return knex("movies").select("*");
}

// returns movies that match movieId
function read(movieId) {
  return knex("movies")
    .select("*") // Selects all columns from the "movies" table
    .where({ movie_id: movieId }) // where the movie_id column matches the movieId
    .first(); // returns the first row in the table as an object
}

module.exports = {
	list,
	read,
};
