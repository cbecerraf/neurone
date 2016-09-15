import { Meteor } from 'meteor/meteor';

import * as index from './lib/solrRequest';
import DatabaseMethods from './databaseMethods';

import { Documents } from '../imports/api/documents/index';
import { Snippets } from '../imports/api/snippets/index';
import { VisitedLinks } from '../imports/api/visitedLinks/index';
import { Keystrokes } from '../imports/api/keystrokes/index';
import { MouseClicks } from '../imports/api/mouseClicks/index';
import { MouseCoordinates } from '../imports/api/mouseCoordinates/index';

Meteor.startup(function () {
  //index = new Index();

  if (Documents.find().count() === 0) {
    const loadedDocuments = JSON.parse(Assets.getText('reuters100.json'));

    loadedDocuments.forEach(function (document) {
      Documents.insert(document);
    })
  }
  else {
    //index.ping();
  }

  Meteor.methods({
    searchIndex: function(query) {
      check(query, String);
      //console.log('Server call!');

      // Promise based modules: https://themeteorchef.com/snippets/promise-based-modules/
      return index.searchIndex(query)
        .then(function (result) {
          //console.log('searchIndex Method!', result);
          return result;
        })
        .catch(function (error) {
          throw new Meteor.Error('400', error);
        });
    }
  });
});