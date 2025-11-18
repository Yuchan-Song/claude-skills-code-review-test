// axios 라이브러리 import
import axios from 'axios';

/**
 * TMDb(The Movie Database) API 호출을 위한 axios 인스턴스
 * - baseURL: TMDb API의 기본 URL
 * - params: 모든 요청에 자동으로 포함되는 공통 파라미터
 *   - api_key: TMDb API 인증 키
 *   - language: 응답 데이터의 언어 설정 (한국어)
 */
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "ko-KR"
    }
})

// 설정된 axios 인스턴스를 내보내기
export default instance;