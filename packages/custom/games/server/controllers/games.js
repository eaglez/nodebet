'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Game = mongoose.model('Game'),
  _ = require('lodash');


/**
 * Find game by id
 */
exports.game = function(req, res, next, id) {
  Game.load(id, function(err, game) {
    if (err) return next(err);
    if (!game) return next(new Error('Failed to load game ' + id));
    req.game = game;
    next();
  });
};

/**
 * Create an game
 */
exports.create = function(req, res) {
    console.info("create");
  var game = new Game(req.body);
  game.createdBy = req.user;

  game.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the game'
      });
    }
    res.json(game);

  });
};

/**
 * Update an game
 */
exports.update = function(req, res) {
  var game = req.game;

  game = _.extend(game, req.body);

  game.save(function(err) {
      console.info("save");
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the game'
      });
    }
    res.json(game);

  });
};

/**
 * Delete an game
 */
exports.destroy = function(req, res) {
    console.info("destory");
  var game = req.game;
    console.info(req);
  game.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the game'
      });
    }
    res.json(game);

  });
};

/**
 * Show an game
 */
exports.show = function(req, res) {
  res.json(req.game);
};

/**
 * List of games
 */
exports.all = function(req, res) {
  Game.find().sort('-created').populate('user', 'name username').exec(function(err, games) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the games'
      });
    }
    res.json(games);

  });
};
