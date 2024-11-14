const firebaseConfig = {
  apiKey: "AIzaSyCh21ZCTsRwqfy3dzOZvfjJa6Kn-WW_mVo",
  authDomain: "hackcc2024-f7d9d.firebaseapp.com",
  projectId: "hackcc2024-f7d9d",
  storageBucket: "hackcc2024-f7d9d.firebasestorage.app",
  messagingSenderId: "151671982406",
  appId: "1:151671982406:web:9e409a4f5bfe94f4ab3d47",
  measurementId: "G-RFWT210TT9"
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.ts');
  } else {
    return firebaseConfig;
  }
}    
