const express = require('express');
const asynchHandler = require('express-async-handler');
const User = require('../models/User');
const userRouter = express.Router();

// Create user
userRouter.post(
  '/',
  asynchHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      throw new Error('User Exist');
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        // Remove token
      });
    }
  })
);

// Login
userRouter.post(
  '/login',
  asynchHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    // Compare password
    if (user && (await user.isPasswordMatch(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        password: user.password,
        email: user.email,
        // Remove token
      });
    } else {
      res.status(401).send('Invalid login credentials');
    }
  })
);

// GET PROFILE
userRouter.get(
  '/profile',
  asynchHandler(async (req, res) => {
    try {
      const user = await User.findById(req.query.userId).populate('books');
      if (!user) {
        res.status(404).send("You don't have any profile yet");
      } else {
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send('Server error');
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  '/profile/update',
  asynchHandler(async (req, res) => {
    const { userId, name, email, password } = req.body;
    const user = await User.findById(userId);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = password || user.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        password: updateUser.password,
        email: updateUser.email,
        // Remove token
      });
    } else {
      res.status(401).send('User Not found');
    }
  })
);

// Fetch all Users
userRouter.get(
  '/',
  asynchHandler(async (req, res) => {
    try {
      const users = await User.find().populate('books');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send('Server error');
    }
  })
);

module.exports = { userRouter };
