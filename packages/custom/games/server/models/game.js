'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Game Schema
 */
var GameSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  start: {
    type: Date,
    default: Date.now,
    required: false
  },
  home: {
    type: String,
    required: true,
    trim: true
  },
  homeScore: {
    type: Number,
    required: false,
    trim: true
  },
  visitors: {
    type: String,
    required: true,
    trim: true
  },
  visitorsScore: {
    type: Number,
    required: false,
    trim: true
  },  
  arena: {
    type: String,
    required: false,
    trim: true
  },
  tv: {
    type: String,
    required: false,
    trim: true
  }
});

/**
 * Validations
 */
GameSchema.path('home').validate(function(home) {
  return !!home;
}, 'Home cannot be blank');

GameSchema.path('visitors').validate(function(visitors) {
  return !!visitors;
}, 'Visitors cannot be blank');

GameSchema.path('start').validate(function(start) {
  return !!start;
}, 'Start date cannot be blank');

/**
 * Statics
 */
GameSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Game', GameSchema);
