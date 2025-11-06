/**
 * TMDb API 엔드포인트 URL 모음
 * 각 속성은 특정 영화 데이터를 가져오기 위한 API 경로를 정의
 */
const requests = {
    // 현재 상영중인 영화 목록
    fetchNowPlaying: "/movie/now_playing",

    // 트렌딩 콘텐츠 (영화, TV 등 모든 미디어)
    // {time_window}는 day 또는 week로 대체됨
    // fetchTrending: "/trending/all/{time_window}",
    fetchTrending: "/trending/all/week",

    // 최고 평점 영화 목록
    fetchTopRated: "/movie/top_rated",

    // 장르별 영화 검색 API
    // 액션 장르 (장르 ID: 28)
    fetchMoviesActionGenres: "/discover/movie?with_genres=28",

    // 코미디 장르 (장르 ID: 35)
    fetchMoviesComedyGenres: "/discover/movie?with_genres=35",

    // 공포 장르 (장르 ID: 27)
    fetchMoviesHorrowGenres: "/discover/movie?with_genres=27",

    // 로맨스 장르 (장르 ID: 10749)
    fetchMoviesRomanceGenres: "/discover/movie?with_genres=10749",

    // 다큐멘터리 장르 (장르 ID: 99)
    fetchDocumentaries: "/discover/movie?with_genres=99"
}

// requests 객체를 내보내기
export default requests;