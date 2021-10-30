const knex = require("../db/connection");

// returns review that matches id
function read(reviewId) {
  return knex("reviews")
    .select("*") // select all columns from reviews table
    .where({ review_id: reviewId }) // where review_id matches reviewId
    .first();
}

function update(review) {
  return knex("reviews")
    .select("*")
    .where({ review_id: review.review_id })
    .update(review);
}

function findCritic(criticId) {
  return knex("critics")
  .select("*")
  .where({ critic_id: criticId })
  .first();
}

function findReviews(movieId) {
  return knex("reviews")
  .select("*")
  .where({ movie_id: movieId });
}

const destroy = (reviewId) => {
  return knex("reviews")
  .where({ review_id: reviewId })
  .del();
};

module.exports = {
  read,
  update,
  findCritic,
  findReviews,
  destroy,
};
