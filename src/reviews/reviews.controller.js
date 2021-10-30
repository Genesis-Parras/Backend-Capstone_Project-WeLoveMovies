const service = require("./reviews.service");

// list all reviews for specific movieId, as well as the critic detail
async function readReviews(req, res) {
  const reviews = await service.findReviews(res.locals.movie.movie_id); 

  for (let review of reviews) {
    const critic = await service.findCritic(review.critic_id);
    review["critic"] = critic;
  }
  res.json({ data: reviews });
}

// validate if review exist
async function validateReviewId(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(Number(reviewId));
  // return view if review id found
  if (review) {
    res.locals.review = review;
    return next();
  }
  // return error if not found
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}

// update review request
async function update(req, res) {
  const newReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  await service.update(newReview);
  const review = await service.read(res.locals.review.review_id);

  const wantedReview = {
    ...review,
    critic: await service.findCritic(res.locals.review.critic_id),
  };

  res.json({ data: wantedReview });
}

// destroys the reviews locals data
async function destroy(req, res){
  await service.destroy(Number(res.locals.review.review_id))
  res.sendStatus(204);
}

module.exports = {
  readReviews,
  update: [validateReviewId, update],
  delete: [validateReviewId, destroy],
};
