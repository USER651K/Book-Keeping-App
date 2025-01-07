const express = require('express');
const asynchHandler = require('express-async-handler');
const Book = require('../models/Book');
const User = require('../models/User');
const bookRouter = express.Router();

// Create Book
bookRouter.post(
  '/',
  asynchHandler(async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);  // Send status 201 for creation
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  })
);

// Get all Books
bookRouter.get(
  '/',
  asynchHandler(async (req, res) => {
    try {
      const books = await Book.find().populate('createdBy').sort('createdAt');
      res.status(200).json(books);  // Send status 200 for successful retrieval
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  })
);

// Delete Book
bookRouter.delete(
  '/:id',
  asynchHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        res.status(404).send({ message: 'Book not found' });
      } else {
        res.status(200).json({ message: 'Book deleted', book });
      }
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  })
);

// Update Book
bookRouter.put(
  '/:id',
  asynchHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!book) {
        res.status(404).send({ message: 'Book not found' });
      } else {
        res.status(200).json(book);  // Send updated book details
      }
    } catch (error) {
      res.status(500).send({ message: 'Update failed', error: error.message });
    }
  })
);

// Find a Book
bookRouter.get(
  '/:id',
  asynchHandler(async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        res.status(404).send({ message: 'No book found' });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  })
);

module.exports = { bookRouter };
