import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import './Search.css'
import useDebounce from "../../hooks/useDebounce";

/**
 * 검색 페이지 컴포넌트
 * URL 쿼리 파라미터로부터 검색어를 받아 TMDB API를 통해 영화/TV 프로그램을 검색
 */
const SearchPage = () => {

  // 검색 결과 목록 상태
  const [searchResults, setSearchResults] = useState([]);

  /**
   * URL 쿼리 파라미터 추출 커스텀 훅
   * @returns {URLSearchParams} URL의 쿼리 파라미터 객체
   */
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  let query = useQuery();
  // URL에서 'q' 파라미터 값(검색어) 추출
  const searchParam = query.get("q");
  // 디바운스된 검색어 값 (500ms 지연)
  const deboundSearchParam = useDebounce(searchParam, 500);

  /**
   * 검색어 변경 감지 및 검색 실행
   * searchParam이 변경될 때마다 영화 검색 수행
   * 
   */
  useEffect(() => {
    if (deboundSearchParam) {
      fetchSearchMovie(deboundSearchParam);
    }
  }, [deboundSearchParam])

  /**
   * TMDB API를 통한 영화/TV 프로그램 검색 함수
   * @param {string} searchParam - 검색할 키워드
   * @description multi 검색으로 영화와 TV 프로그램을 동시에 검색 (성인 콘텐츠 제외)
   */
  const fetchSearchMovie = async (searchParam) => {
    try {
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchParam}`);
      setSearchResults(response.data.results);
    } catch(e) {
      console.error(e);
    }
  }

  // 검색 결과가 있는 경우 - 영화 목록 그리드 표시
  if (searchResults && searchResults.length) {
    return (
      <section className="search_container">
        {searchResults.map((movie) => {
          // backdrop_path가 있고 인물(person)이 아닌 결과만 표시
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            return (
              <div className="movie" key={movie.id}>
                {/* 영화 포스터 클릭 시 상세 페이지로 이동 */}
                <div className="movie_poster" onClick={() => navigate(`/${movie.id}`)}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie_poster" />
                </div>
              </div>
            )
          }
          return null; // 조건을 만족하지 않는 경우 null 반환
        })
      }

      </section>
    )
  } else {
    // 검색 결과가 없는 경우 - 안내 메시지 표시
    return (
      <section className="no_results">
        <div className="no_results_text">
          <p>"{searchParam}에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    )
  }
}

export default SearchPage