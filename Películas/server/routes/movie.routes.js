// routes/movieRoutes.js

const express = require('express');
const MovieController = require('../controllers/movie.controller');
const { authenticate } = require('../config/jwt.config');

const MovieRouter = express.Router();

// Obtener todas las películas (requiere autenticación)
MovieRouter.get('/', authenticate, MovieController.getAllMovies);


MovieRouter.post('/', MovieController.createNewMovieWithReview); // Agregar una nueva película con reseña
MovieRouter.get('/',authenticate, MovieController.getAllMovies);


MovieRouter.get('/:id', MovieController.getMovieById);
MovieRouter.post('/:id/reviews', MovieController.addReviewToMovie);
// Eliminar una reseña de una película
MovieRouter.delete('/:movieId/reviews/:reviewId', MovieController.deleteReview);
// Eliminar una película por su ID
MovieRouter.delete('/:id', MovieController.deleteMovie);



module.exports = MovieRouter;
