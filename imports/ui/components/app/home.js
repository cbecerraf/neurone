import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './home.html';

const name = 'home';

class Home {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
  }
}

// create a module
export default angular.module(name, [
  angularMeteor
])
.component(name, {
  template,
  controllerAs: name,
  controller: Home
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/home',
      template: '<home></home>'
    });
};