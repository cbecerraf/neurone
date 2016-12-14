import 'mark.js';

import template from './pageModal.html';

const name = 'pageModal';

class PageModal {
  constructor($state, $rootScope, $document) {
    'ngInject';

    this.$document = $document;
    this.$rootScope = $rootScope;

    this.docId = this.resolve.docId;
    this.snippet = this.resolve.snippet;
    
    this.$rootScope.docId = this.docId;

    this.iframeReady = true;
    
    this.$rootScope.$broadcast('iframeSnippet', { docId: this.docId, snippet: this.snippet });
  }

  closeModal() {
    delete this.$rootScope.docId;
    this.close();
  }
}

export default angular.module(name, [])
.component(name, {
  template,
  controllerAs: name,
  controller: PageModal,
  bindings: {
    resolve: '<',
    close: '&'
  }
});