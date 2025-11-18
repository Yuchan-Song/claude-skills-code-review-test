/**
 * Firebase 설정 및 초기화 파일
 *
 * 이 파일은 Firebase 앱을 초기화하고 인증, 분석 등의 서비스를 설정합니다.
 * 환경 변수(.env)에서 API 키 및 설정 정보를 불러와 사용합니다.
 *
 * @see https://firebase.google.com/docs/web/setup
 */

// Firebase SDK에서 필요한 함수들을 import
import { initializeApp } from "firebase/app";
import "firebase/auth"; // Firebase 인증 서비스
// import { getAnalytics } from "firebase/analytics"; // Firebase 분석 서비스 (선택사항)

/**
 * Firebase 프로젝트 설정 객체
 *
 * 모든 설정 값은 .env 파일의 환경 변수에서 가져옵니다.
 * 이렇게 하면 민감한 정보가 코드에 직접 노출되지 않습니다.
 *
 * @constant {Object} firebaseConfig
 * @property {string} apiKey - Firebase API 키 (Web API Key)
 * @property {string} authDomain - 인증에 사용되는 도메인
 * @property {string} projectId - Firebase 프로젝트 ID
 * @property {string} storageBucket - Cloud Storage 버킷 URL
 * @property {string} messagingSenderId - Cloud Messaging 발신자 ID
 * @property {string} appId - Firebase 앱 ID
 * @property {string} measurementId - Google Analytics 측정 ID (선택사항)
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

/**
 * Firebase 앱 초기화
 *
 * firebaseConfig 설정을 사용하여 Firebase 앱 인스턴스를 생성합니다.
 * 이 인스턴스는 앱 전체에서 Firebase 서비스에 접근하는 데 사용됩니다.
 *
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

// Google Analytics 초기화 (필요시 주석 해제)
// const analytics = getAnalytics(app);

/**
 * 초기화된 Firebase 앱 인스턴스를 export
 * 다른 파일에서 import하여 Firebase 서비스를 사용할 수 있습니다.
 *
 * @example
 * import app from './firebase';
 * import { getAuth } from 'firebase/auth';
 * const auth = getAuth(app);
 */
export default app;