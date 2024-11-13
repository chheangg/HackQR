const firebaseConfig = {
  apiKey: "AIzaSyDEOtn341oHcfEvNMBZav0m-qKq1smPcS4",
  authDomain: "hackqr-demo.firebaseapp.com",
  projectId: "hackqr-demo",
  storageBucket: "hackqr-demo.firebasestorage.app",
  messagingSenderId: "437890904330",
  appId: "1:437890904330:web:0fd1d86eba116c616e4af3",
  measurementId: "G-9T8FV8G3Q9"
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.ts');
  } else {
    return firebaseConfig;
  }
}    
