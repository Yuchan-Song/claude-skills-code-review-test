## 📚 TMDB API 사용 가이드

### API 키 발급

1. [TMDB 웹사이트](https://www.themoviedb.org/)에 가입
2. 설정 > API 메뉴에서 API 키 발급
3. 프로젝트 루트에 `.env` 파일 생성:
```bash
REACT_APP_TMDB_API_KEY=your_api_key_here
```

### Base URL
```
https://api.themoviedb.org/3
```

### 주요 API 엔드포인트

#### 영화 목록

| 엔드포인트 | 설명 |
|-----------|------|
| `/movie/now_playing` | 현재 상영중인 영화 |
| `/movie/popular` | 인기 영화 |
| `/movie/top_rated` | 평점 높은 영화 |
| `/movie/upcoming` | 개봉 예정 영화 |

#### 영화 상세 정보
```
GET /movie/{movie_id}?api_key={API_KEY}&language=ko-KR&append_to_response=videos,credits,similar
```

**추가 가능한 정보 (append_to_response)**
- `videos`: 예고편, 티저 등
- `credits`: 출연진, 제작진
- `similar`: 비슷한 영화
- `recommendations`: 추천 영화

#### 검색
```
GET /search/movie?api_key={API_KEY}&language=ko-KR&query={검색어}&page=1
```

#### 장르
```
GET /genre/movie/list?api_key={API_KEY}&language=ko-KR
```

#### 장르별 영화 검색
```
GET /discover/movie?api_key={API_KEY}&with_genres={genre_id}&language=ko-KR
```

### 이미지 URL 구성
```javascript
// 포스터 이미지
https://image.tmdb.org/t/p/w500${movie.poster_path}

// 배경 이미지
https://image.tmdb.org/t/p/original${movie.backdrop_path}
```

**이미지 사이즈**
- **포스터**: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`
- **배경**: `w300`, `w780`, `w1280`, `original`

### 공통 파라미터

| 파라미터 | 설명 | 예시 |
|---------|------|------|
| `api_key` | API 키 (필수) | `your_api_key` |
| `language` | 언어 코드 | `ko-KR`, `en-US` |
| `page` | 페이지 번호 | `1`, `2`, `3` |
| `region` | 지역 코드 | `KR`, `US` |

### 사용 예시
```javascript
// API 호출 예시
const fetchMovies = async () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const data = await response.json();
  return data.results;
};

// 이미지 URL 생성
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const posterUrl = `${IMAGE_BASE_URL}w500${movie.poster_path}`;
const backdropUrl = `${IMAGE_BASE_URL}original${movie.backdrop_path}`;
```

### 응답 데이터 구조
```json
{
  "page": 1,
  "results": [
    {
      "id": 12345,
      "title": "영화 제목",
      "original_title": "Original Title",
      "overview": "영화 줄거리",
      "poster_path": "/poster.jpg",
      "backdrop_path": "/backdrop.jpg",
      "vote_average": 8.5,
      "vote_count": 1000,
      "release_date": "2024-01-01",
      "genre_ids": [28, 12, 878]
    }
  ],
  "total_pages": 100,
  "total_results": 2000
}
```

### 참고 자료

- [TMDB API 공식 문서](https://developers.themoviedb.org/3)
- [TMDB API 가입 및 키 발급](https://www.themoviedb.org/settings/api)