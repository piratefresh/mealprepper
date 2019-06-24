import angular from 'angular';
import uiRouter from '@uirouter/angularjs'
import registerDirectives from './directives';

// Import Configs
import constants from './config/constants'

// import app functionality
import './layout';

import style from './assets/scss/main.scss';

const requries = [
    uiRouter,
    'app.layout'
]

const ngModule = angular.module('app',
    requries
)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
        .state('home', {
            url: '/home',
            tempalteUrl: 'templates/home.html'
        })
        .state('list', {
            url: '/list',
            tempalteUrl: 'templates/list.html'
        })
    })

registerDirectives(ngModule);
// require('./directives').default(ngModule);

angular.module('app').constant('Constants', constants);

export { ngModule };