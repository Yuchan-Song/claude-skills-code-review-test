import React, { useEffect, useState } from "react";
import "../styles/Banner.css";
import axios from "../api/axios";
import request from "../api/request";
import styled from "styled-components";

/**
 * Banner 컴포넌트
 * 메인 페이지 상단에 표시되는 배너로, 현재 상영중인 영화 중 무작위로 선택된 영화를 보여줍니다.
 */
const Banner = () => {
  /**
   * [React Hook - useState]
   * - 함수형 컴포넌트에서 상태(state)를 관리할 수 있게 해주는 Hook
   * - movie: 현재 선택된 영화의 상세 정보를 저장
   * - setMovie: movie 상태를 업데이트하는 함수
   * - useState의 초기값으로 빈 배열을 사용 (추후 객체로 업데이트됨)
   */
  const [movie, setMovie] = useState([]);

  /**
   * [React Hook - useState]
   * - isClicked: 배너가 클릭되었는지 여부를 저장 (true/false)
   * - 이 값에 따라 조건부 렌더링으로 영화 포스터 또는 유튜브 영상이 표시됨
   */
  const [isClicked, setIsClicked] = useState(false);

  /**
   * [React Hook - useEffect]
   * - 컴포넌트의 생명주기(lifecycle)와 사이드 이펙트(side effects)를 관리하는 Hook
   * - 첫 번째 인자: 실행할 함수 (여기서는 fetchData를 호출)
   * - 두 번째 인자: 의존성 배열(dependency array)
   *   → 빈 배열([])을 전달하면 컴포넌트가 마운트(mount)될 때 한 번만 실행됨
   *   → 이는 클래스 컴포넌트의 componentDidMount와 동일한 동작
   * - 여기서는 컴포넌트가 처음 렌더링될 때 한 번만 영화 데이터를 가져옴
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * [비동기 데이터 페칭 로직]
   * 현재 상영중인 영화 목록을 가져오고, 그 중 하나를 무작위로 선택하여 상세 정보를 가져옵니다.
   *
   * 로직 흐름:
   * 1. TMDB API에서 현재 상영중인 영화 목록을 가져옴
   * 2. 가져온 영화 목록 중 Math.random()을 사용해 무작위로 하나를 선택
   * 3. 선택된 영화의 상세 정보를 다시 API로 요청 (비디오 정보 포함)
   * 4. 받아온 상세 정보를 movie state에 저장
   */
  const fetchData = async () => {
    // 현재 상영중인 영화 목록 가져오기 (비동기 처리 - async/await)
    const response = await axios.get(request.fetchNowPlaying);
    if (response.status === 200) {
      const movies = response.data.results;

      /**
       * [무작위 영화 선택 로직]
       * Math.random(): 0 이상 1 미만의 무작위 숫자 생성
       * Math.floor(): 소수점 아래를 버림
       * 결과: 0부터 movies.length-1 사이의 정수 인덱스 생성
       */
      const movieId = movies[Math.floor(Math.random() * movies.length)].id;

      /**
       * [구조 분해 할당(Destructuring)]
       * { data: movieDetail }: response 객체의 data 속성을 movieDetail 변수명으로 추출
       * append_to_response: "videos" - 영화 정보와 함께 비디오(예고편) 정보도 함께 요청
       */
      const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
        params: { append_to_response: "videos" },
      });

      // state 업데이트 - 컴포넌트 리렌더링 발생
      setMovie(movieDetail);
      console.log(movieDetail);
    } else {
      console.log(response.statusText);
    }
  };

  /**
   * [유틸리티 함수 - 문자열 자르기]
   * 긴 텍스트를 지정된 길이로 자르고 "..."를 추가하는 함수
   *
   * @param str - 자를 문자열
   * @param n - 최대 길이
   * @returns 잘린 문자열 또는 원본 문자열
   *
   * [Optional Chaining 사용]
   * str?.length: str이 null 또는 undefined일 경우 안전하게 처리
   * - str이 존재하면 length 속성에 접근
   * - str이 null/undefined면 undefined 반환 (에러 방지)
   */
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  /**
   * [React 조건부 렌더링 (Conditional Rendering)]
   * isClicked 상태에 따라 완전히 다른 JSX를 반환
   *
   * - isClicked === true: YouTube 영상 재생 화면 표시
   * - isClicked === false: 영화 배너 이미지와 정보 표시
   *
   * 이는 React의 핵심 개념 중 하나로, 상태(state)에 따라 UI를 동적으로 변경함
   */
  if (isClicked) {
    return (
      /**
       * [React Fragment (<>)]
       * 여러 개의 JSX 요소를 감싸기 위해 사용
       * <React.Fragment> 또는 단축 문법 <> 사용
       * DOM에 추가 노드를 생성하지 않음
       */
      <>
      <Container>
        <HomeContainer>
          {/*
            [Template Literal & Optional Chaining]
            - 백틱(`)을 사용한 템플릿 리터럴로 동적 URL 생성
            - movie?.videos?.results[0]?.key: 안전하게 중첩된 속성에 접근
            - 만약 중간에 undefined가 있어도 에러 없이 undefined 반환
          */}
          <Iframe
            src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie?.videos?.results[0]?.key}`}
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
          />
        </HomeContainer>
      </Container>
      {/*
        [React 이벤트 핸들링]
        onClick: 클릭 이벤트 핸들러
        - 화살표 함수를 사용해 setIsClicked(false) 호출
        - 클릭 시 isClicked를 false로 변경하여 다시 배너 화면으로 전환
        - React에서는 camelCase로 이벤트명을 작성 (onclick X, onClick O)
      */}
      <button onClick={() => setIsClicked(false)}>X</button>
      </>
    );
  } else {
    return (
      /* header.banner [s] */
      /**
       * [JSX 인라인 스타일 (Inline Styles)]
       * - style 속성에 JavaScript 객체를 전달
       * - CSS 속성명을 camelCase로 작성 (background-image → backgroundImage)
       * - 템플릿 리터럴로 동적인 배경 이미지 URL 설정
       */
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        {/* div.banner_contents [s] */}
        <div className="banner_contents">
          {/*
            [OR 연산자(||)를 이용한 폴백(fallback)]
            movie.title이 없으면 movie.original_title을 표시
          */}
          <h1 className="banner_title">
            {movie.title || movie.original_title}
          </h1>

          <div className="banner_buttons">
            {/*
              [JSX 조건부 렌더링 - 논리 AND 연산자(&&)]
              - movie?.videos?.results[0]?.key가 존재할 때만 Play 버튼을 렌더링
              - 왼쪽 조건이 truthy하면 오른쪽 요소를 렌더링
              - 비디오가 없는 경우 버튼이 표시되지 않음
            */}
            {movie?.videos?.results[0]?.key && (
              /**
               * [React 이벤트 핸들링]
               * onClick={() => setIsClicked(true)}
               * - Play 버튼 클릭 시 isClicked를 true로 변경
               * - 상태 변경으로 인해 컴포넌트가 리렌더링되고, YouTube 영상 화면으로 전환됨
               */
              <button
                className="banner_button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            )}
          </div>

          {/*
            [JSX 중괄호({}) 내부에서 함수 호출]
            - truncate 함수를 호출하여 긴 설명을 100자로 제한
            - Optional chaining으로 overview가 없어도 안전하게 처리
          */}
          <p className="banner_description">{truncate(movie?.overview, 100)}</p>
        </div>
        {/* div.banner_contents [e] */}
        <div className="banner_fade_bottom" />
      </header>
      /* header.banner [s] */
    );
  }
};

export default Banner;

/**
 * [Styled Components]
 * CSS-in-JS 라이브러리로, JavaScript 파일 내에서 CSS를 작성할 수 있게 해줌
 *
 * 장점:
 * 1. 컴포넌트 단위로 스타일 관리 가능
 * 2. props를 활용한 동적 스타일링 가능
 * 3. 자동으로 고유한 className 생성 (스타일 충돌 방지)
 * 4. CSS 코드를 JavaScript 변수로 관리 가능
 *
 * 문법: styled.태그명`CSS 코드`
 * - 백틱(`) 사이에 일반 CSS 문법을 작성
 * - 결과는 스타일이 적용된 React 컴포넌트
 */

/**
 * Container - 전체 화면을 채우는 Flex 컨테이너
 * YouTube 영상을 중앙 정렬하기 위한 컨테이너
 */
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

/**
 * HomeContainer - 영상이 들어갈 영역
 * 부모 컨테이너의 전체 크기를 차지
 */
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/**
 * Iframe - YouTube 영상을 표시하는 iframe
 *
 * 주요 스타일:
 * - z-index: -1 → 다른 요소들(예: 닫기 버튼) 뒤에 배치
 * - opacity: 0.65 → 투명도를 줘서 배경처럼 보이게 함
 *
 * [Styled Components의 &::after 문법]
 * - &: 현재 컴포넌트 자신을 참조 (SCSS 문법과 동일)
 * - ::after: CSS 가상 요소, 요소 뒤에 콘텐츠를 추가
 */
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: ""
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
