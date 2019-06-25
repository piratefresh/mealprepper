import firebase from 'firebase';

export class AuthService {
  constructor($firebaseAuth) {
    'ngInject';

    this.provider = new firebase.auth.GoogleAuthProvider();

    this.auth = $firebaseAuth(firebase.auth());
    this.authData = null;
    this.onSignIn = (user) => {
      this.authData = user;
      return this.auth.$requireSignIn();
    };
    this.storeAuthData = (data) => {
      this.authData = data;
      return this.authData;
    };
    this.clearAuthData = () => {
      this.authData = null;
    };
  }
  
  login(user) {
    return this.auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(this.storeAuthData);
  }
  register(user) {
    return this.auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(this.storeAuthData);
  }
  logout() {
    return this.auth
      .$signOut()
      .then(this.clearAuthData);
  }
  requireAuthentication() {
    return this.auth
      .$requireSignIn();

  }
  isAuthenticated() {
    return !!this.authData;
  }
  getUser() {
    if (this.authData) return this.authData;
  }
  loginWithGoogle() {
    return this.auth
      .$signInWithPopup(this.provider)
      .then((result) => {
        this.storeAuthData(result);
      });
  }
  isLogged() {
    return this.auth 
      .$onAuthStateChanged((user) => {
        if (user) {
          return this.authData = user;
        } else {
         return this.authData = null;
        }
      });
  }
}