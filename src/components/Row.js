import React, { useCallback, useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/Row.css";
import MovieModal from "./popups/movie";

// Swiper 슬라이더 라이브러리 관련 import
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";

/**
 * 영화 목록을 수평 슬라이더 형태로 보여주는 Row 컴포넌트
 * Swiper 라이브러리를 사용하여 반응형 슬라이더를 구현합니다.
 *
 * @param {string} title - 영화 행의 제목 (예: "인기 영화", "최신 영화" 등)
 * @param {string} id - 행을 구분하기 위한 고유 ID
 * @param {string} fetchUrl - 영화 데이터를 가져올 API URL
 */
const Row = ({ title, id, fetchUrl }) => {
  // 영화 목록 데이터
  const [movies, setMovies] = useState([]);
  // 영화 상세 모달 열림/닫힘 상태
  const [modalOpen, setModalOpen] = useState(false);
  // 선택된 영화 정보
  const [selectedMovie, setSelectedMovie] = useState({});

  /**
   * 영화 데이터를 API로부터 가져오는 함수
   * useCallback을 사용하여 fetchUrl이 변경될 때만 함수를 재생성
   */
  const fetchMovieData = useCallback(async () => {
    const request = await axios.get(fetchUrl);
    // 결과에서 처음 10개를 제외한 나머지 영화 목록 저장
    setMovies(request.data.results.slice(10));
    return request;
  }, [fetchUrl]);

  // 컴포넌트 마운트 시 영화 데이터 가져오기
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  /**
   * 영화 포스터 클릭 시 실행되는 함수
   * 모달을 열고 선택된 영화 정보를 저장
   */
  const handleClick = (movie) => {
    setModalOpen(true);
    setSelectedMovie(movie);
  };

  return (
    <Container>
      <h2>{title}</h2>
      {/* Swiper 슬라이더 컴포넌트 */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // 무한 루프 활성화
        navigation // 좌우 화살표 네비게이션 활성화
        pagination={{ clickable: true }} // 클릭 가능한 페이지네이션 활성화
        // 화면 크기별 슬라이드 표시 개수 설정
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 한번에 넘어가는 슬라이드 개수
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <Content id={id}>
          {/* 영화 목록을 순회하며 슬라이드 생성 */}
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <Wrap>
                  {/* 영화 포스터 이미지 */}
                  <img
                    key={movie.id}
                    className="row_poster"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                    onClick={() => handleClick(movie)}
                  />
                </Wrap>
              </SwiperSlide>
            );
          })}
        </Content>
      </Swiper>
      {/* 모달이 열려있을 때만 MovieModal 컴포넌트 렌더링 */}
      {modalOpen && (
        <MovieModal setModalOpen={setModalOpen} {...selectedMovie} />
      )}
    </Container>
  );
};

export default Row;

// Row 컴포넌트의 최상위 컨테이너
const Container = styled.div`
  padding: 0 0 26px;
`;

// 슬라이드 콘텐츠를 감싸는 컨테이너
const Content = styled.div``;

// 개별 영화 포스터를 감싸는 래퍼
// 16:9 비율 유지 및 hover 효과 적용
const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%; // 16:9 비율 유지 (9/16 * 100)
  border-radius: 10px;
  box-shadow: rgb(0 0 0/69%) 0px 26px 30px -10px,
    rgb(0 0 0/73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover; // 이미지 비율 유지하며 영역 채우기
    opacity: 1;
    position: absolute;
    width: 100%;
    transition: opacity 500ms ease-in-out;
    z-index: 1;
  }

  // 마우스 호버 시 효과
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98); // 살짝 축소
    border-color: rgba(249, 249, 249, 0.8); // 테두리 밝게
  }
`;
