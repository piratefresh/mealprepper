import firebase from 'firebase';

export class AuthService {
  constructor($firebaseAuth, $firebaseObject, $q) {
    'ngInject';

    this.provider = new firebase.auth.GoogleAuthProvider();
    const ref = firebase.database().ref();

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
      console.log('clearing authData')
      this.authData = null;
    };
    this.auth.$onAuthStateChanged(user => {
        if(user) {
          this.authData = user;
          console.log('hit on auth')
          return this.authData;
        } 
    })
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
    console.log(this.authData)
    return this.auth
    .$waitForSignIn().then(this.onSignIn);

  }
  isAuthenticated() {
    console.log(this.authData)
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
          console.log('hit on auth' + 2)
          return this.authData = user;
        } else {
         return this.authData = null;
        }
      });
  }
}