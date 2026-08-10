import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// TODO: 파이어베이스 설정값(firebaseConfig)을 여기에 붙여넣어 주세요!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 파이어베이스 초기화 (설정값이 유효할 때만)
let app;
let db: ReturnType<typeof getFirestore> | null = null;

try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// 데이터를 저장하는 함수
export const saveApplication = async (applicationData: any) => {
  if (!db) {
    console.warn("Firebase is not initialized. Please configure firebaseConfig in src/firebase.ts");
    // 테스트 환경이거나 설정 전일 때는 성공한 것처럼 처리
    return new Promise(resolve => setTimeout(resolve, 500)); 
  }
  
  try {
    const docRef = await addDoc(collection(db, "applications"), {
      ...applicationData,
      submittedAt: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
