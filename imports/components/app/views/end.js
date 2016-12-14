import template from './end.html';

const name = 'end';

class End {
  constructor($scope, $rootScope, $state, $reactive, UserDataService) {
    'ngInject';

    this.$state = $state;
    this.$rootScope = $rootScope;

    this.uds = UserDataService;

    $scope.$on('$stateChangeStart', (event) => {
      this.uds.setSession({ standbyMode: false });
    });

    $scope.$on('$stateChangeSuccess', (event) => {
      this.uds.setSession({ standbyMode: true });

      this.$rootScope.$broadcast('updateNavigation');
    });

    $reactive(this).attach($scope);
  }
}

// create a module
export default angular.module(name, [])
.component(name, {
  template,
  controllerAs: name,
  controller: End
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('end', {
    url: '/end',
    template: '<end></end>',
    resolve: {
      user($auth) {
        return $auth.awaitUser();
      },
      userDataSub(UserDataService) {
        const uds = UserDataService;
        return uds.check();
      }
    }
  });
};