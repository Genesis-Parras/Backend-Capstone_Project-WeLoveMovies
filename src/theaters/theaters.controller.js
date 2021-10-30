const service = require("./theaters.service");

async function list(req, res) {
  // gets info from the list fn in service
  const theaters = await service.list();

  for (let theater of theaters) {
    // gets info from listMovies in service
    const movies = await service.listMovies(theater.theater_id);

    theater["movies"] = movies;
  }
  res.json({ data: theaters });
}

async function listMovie(req, res, next) {
  if (res.locals.movie) {
    return res.json({
      data: await service.listTheaters(res.locals.movie.movie_id),
    });
  }
  next();
}

module.exports = {
  list: [listMovie, list],
};
