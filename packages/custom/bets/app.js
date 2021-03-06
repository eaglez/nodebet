'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Bets = new Module('bets');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Bets.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Bets.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Bets.menus.add({
    title: 'bets example page',
    link: 'bets example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Bets.aggregateAsset('css', 'bets.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Bets.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Bets.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Bets.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Bets;
});
