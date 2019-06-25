    
import templateUrl from './social-login.html';

export const socialLoginComponent = {
  templateUrl,
  controller: class LoginComponent {
    constructor(AuthService, $state) {
      'ngInject';

      this.authService = AuthService;
      this.$state = $state;
    }
    loginWithGoogle() {
      return this.authService
        .loginWithGoogle()
        .then(() => {
          this.$state.go('app');
        }, reason => {
          this.error = reason.message;
        });
    }
  },
};