  import firebase from 'firebase'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDUvh8n8Ocz0AZxmODzMpIWkgCsA_UxYrU",
    authDomain: "app-ninja-chat.firebaseapp.com",
    databaseURL: "https://app-ninja-chat.firebaseio.com",
    projectId: "app-ninja-chat",
    storageBucket: "app-ninja-chat.appspot.com",
    messagingSenderId: "509814588712",
    appId: "1:509814588712:web:19abe0eee92e001db2bc1d"
  };

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()