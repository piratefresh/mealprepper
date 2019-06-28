import uiRouter from 'angular-ui-router';
import { mealprepNewComponent } from './mealprep-new.component';

export const mealprepNew = angular
  .module('components.mealprep.mealprep-new', [
    uiRouter,
  ])
  .component('mealprepNew', mealprepNewComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('new', {
        parent: 'app',
        url: '/new',
        component: 'mealprepNew',
      });
  })
  .name;