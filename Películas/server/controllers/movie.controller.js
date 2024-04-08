const { MovieModel } = require("../models/movie.model");

module.exports = {
    // Obtener todas las películas
    getAllMovies: async (req, res) => {
      try {
        const movies = await MovieModel.find();
        res.status(200).json({ movies });
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
      }
    },
    deleteMovie: async (req, res) => {
      const movieId = req.params.id;
  
      try {
        // Buscar la película por ID y eliminarla
        const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
  
        if (!deletedMovie) {
          return res.status(404).json({ message: 'Película no encontrada' });
        }
  
        res.status(200).json({ message: 'Película eliminada exitosamente' });
      } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar la película' });
      }
    }
 ,
 deleteReview: async (req, res) => {
  const { movieId, reviewId } = req.params;

  try {
      const movie = await MovieModel.findById(movieId);
      if (!movie) {
          return res.status(404).json({ message: 'Película no encontrada' });
      }

      const reviewIndex = movie.reviews.findIndex(review => review._id.toString() === reviewId);
      if (reviewIndex === -1) {
          return res.status(404).json({ message: 'Reseña no encontrada' });
      }

      movie.reviews.splice(reviewIndex, 1);
      await movie.save();

      return res.status(200).json({ message: 'Reseña eliminada exitosamente' });
  } catch (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ message: 'Error interno del servidor al eliminar la reseña' });
  }
},
    // Obtener una película por su ID
    getMovieById: async (req, res) => {
        try {
            const movie = await MovieModel.findById(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: "Película no encontrada" });
            }
            return res.status(200).json({ movie });
        } catch (err) {
            return res.status(400).json({ message: "Error al obtener la película por ID", error: err });
        }
    },

    // Obtener reseñas de una película por su ID
    getReviewsByMovieId: async (req, res) => {
        try {
            const movie = await MovieModel.findById(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: "Película no encontrada" });
            }
            const reviews = movie.reviews;
            return res.status(200).json({ reviews });
        } catch (err) {
            return res.status(400).json({ message: "Error al obtener las reseñas de la película por ID", error: err });
        }
    },

    // Agregar una nueva película
    createNewMovie: async (req, res) => {
        try {
            const { title } = req.body;
            const newMovie = await MovieModel.create({ title, reviews: [] });
            return res.status(201).json({ movie: newMovie });
        } catch (err) {
            return res.status(400).json({ message: "Error al crear una nueva película", error: err });
        }
    },

    createNewMovieWithReview: async (req, res) => {
      try {
        const { title, reviews } = req.body;
        
        // Crear la nueva película con la reseña
        const newMovie = await MovieModel.create({
          title,
          reviews,
        });
        
        return res.status(201).json({ movie: newMovie });
      } catch (err) {
        return res.status(400).json({ message: "Error al crear una nueva película con reseña", error: err });
      }
    },
    
    addReviewToMovie: async (req, res) => {
      
        const { id } = req.params;
        const { reviewerName, rating, reviewText } = req.body;

        try {
            const movie = await MovieModel.findById(id);
            if (!movie) {
                return res.status(404).json({ error: 'Película no encontrada' });
            }

            const newReview = {
                reviewerName,
                rating,
                reviewText,
                createdAt: new Date()
            };

            movie.reviews.push(newReview);
            await movie.save();

            return res.status(201).json({ message: 'Reseña agregada exitosamente', review: newReview });
        } catch (error) {
            console.error('Error al agregar la reseña:', error);
            return res.status(500).json({ error: 'Ocurrió un error al agregar la reseña' });
        }
    
  },
};


