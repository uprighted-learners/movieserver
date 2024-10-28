const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Adjust path as needed

// GET all movies
router.get('/all', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single movie by ID
router.get('/one/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE new movie
router.post('/add', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        length: req.body.length,
        releaseYear: req.body.releaseYear
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE movie
router.put('/update/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Update only the fields that are present in the request
        if (req.body.title) movie.title = req.body.title;
        if (req.body.genre) movie.genre = req.body.genre;
        if (req.body.rating) movie.rating = req.body.rating;
        if (req.body.length) movie.length = req.body.length;
        if (req.body.releaseYear) movie.releaseYear = req.body.releaseYear;

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE movie
router.delete('/delete/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        await movie.deleteOne();
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;