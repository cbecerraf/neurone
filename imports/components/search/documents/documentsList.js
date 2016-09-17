import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './documentsList.html';

import { Documents } from '../../../api/documents/index';

import { name as DocumentAdd } from './documentAdd';
import { name as DocumentRemove } from './documentRemove';

class DocumentsList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('documents');

    this.helpers({
      docs() {
        return Documents.find({});
      }
    });
  }
};

const name = 'documentsList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  DocumentAdd,
  DocumentRemove
])
.component(name, {
  template,
  controllerAs: name,
  controller: DocumentsList
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('documents', {
      url: '/documents',
      template: '<documents-list></documents-list>',
      resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        }
        else {
          return $q.resolve();
        }
      }
    }
  });
};