const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título de la película es obligatorio']
    },
    reviews: [{
        reviewerName: {
            type: String,
            required: [true, 'El nombre del revisor es obligatorio']
        },
        rating: {
            type: Number,
            required: [true, 'El rating es obligatorio'],
            min: [0, 'La puntuación mínima es 0'],
            max: [10, 'La puntuación máxima es 10']
        },
        reviewText: {
            type: String,
            maxLength: [500, 'La longitud máxima de la reseña es de 500 caracteres']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

module.exports.MovieModel = mongoose.model('Movie', MovieSchema);
