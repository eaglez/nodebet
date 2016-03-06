'use strict';

var games = require('../controllers/games');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Games, app, auth) {

  app.route('/games')
    .get(games.all)
    .post(auth.requiresLogin, games.create);
  app.route('/games/:gameId')
    .get(auth.isMongoId, games.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, games.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, games.destroy);

  // Finish with setting up the gameId param
  app.param('gameId', games.game);
};
