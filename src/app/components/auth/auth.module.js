import firebase from 'firebase';
import angularfire from 'angularfire';
import uiRouter from 'angular-ui-router';
import { AuthService } from './auth.service';
import { register } from './register/register.module';
import { login } from './login/login.module';
import { authForm } from './auth-form/auth-form.module';
import './auth.scss';

const firebaseConfig = {
    apiKey: "AIzaSyCIyYMYnx_YOuaGuPsTAq3FZ3Neg8BVX5k",
    authDomain: "mealpreppers-3f6ad.firebaseapp.com",
    databaseURL: "https://mealpreppers-3f6ad.firebaseio.com",
    projectId: "mealpreppers-3f6ad",
    storageBucket: "",
    messagingSenderId: "130148286789",
    appId: "1:130148286789:web:305cf6632751d46b"
};

export const app = firebase.initializeApp(firebaseConfig);

export const auth = angular
  .module('components.auth', [
    angularfire,
    uiRouter,
    login,
    register,
    authForm,
  ])
  .config(($firebaseRefProvider) => {
    'ngInject';

    $firebaseRefProvider
      .registerUrl({
        default: firebaseConfig.databaseURL,
      });
  })
  .run(($transitions, $state, AuthService, $timeout) => {
    'ngInject';

    $transitions.onStart({
      to: (state) => !!(state.data && state.data.requiredAuth),
    }, () => {
      return AuthService
        .requireAuthentication()
        .catch((error) => {
          $state.target('auth.login')
        });
    });
    $transitions.onStart({
      to: 'auth.*',
    }, () => {
      return $timeout(() => {
        if (AuthService.isAuthenticated()) return $state.target('app');
      }, 1000);
      
    });
  })
  .service('AuthService', AuthService)
  .name;