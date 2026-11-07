import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZIqw9RE_znP2oA3XfVMXH19Kek_rhoD0",
  authDomain: "crud-fahri-545e3.firebaseapp.com",
  projectId: "crud-fahri-545e3",
  storageBucket: "crud-fahri-545e3.firebasestorage.app",
  messagingSenderId: "267536434806",
  appId: "1:267536434806:web:6c439eca4cd3ffa6710157",
  measurementId: "1:267536434806:web:6c439eca4cd3ffa6710157"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings({ experimentalForceLongPolling: true });
}

export { firebase };

