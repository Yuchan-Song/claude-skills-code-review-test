import React from "react";
import styled from "styled-components";

/**
 * Category 컴포넌트
 * 디즈니+의 주요 콘텐츠 카테고리(Disney, Marvel, Pixar 등)를 표시하는 컴포넌트
 * 각 카테고리는 hover 시 비디오가 재생되는 인터랙티브 효과를 가짐
 */
const Category = () => {
  /**
   * [데이터 구조 설계]
   * categoryList: 각 카테고리의 이미지와 비디오 정보를 담은 객체 배열
   *
   * - 각 객체는 image와 video 정보를 포함
   * - image.path와 image.ext를 분리하여 재사용성 향상
   * - alt 속성으로 접근성(accessibility) 고려
   *
   * 이러한 데이터 구조는 향후 API나 데이터베이스에서 가져올 때도 쉽게 대체 가능
   */
  const categoryList = [
    {
      image: { path: "/images/viewers-disney", ext: "png", alt: "disney" },
      video: { path: "/videos/disney.mp4", type: "video/mp4" },
    },
    {
      image: { path: "/images/viewers-marvel", ext: "png", alt: "marvel" },
      video: { path: "/videos/marvel.mp4", type: "video/mp4" },
    },
    {
      image: {
        path: "/images/viewers-national",
        ext: "png",
        alt: "national-geographic",
      },
      video: { path: "/videos/national-geographic.mp4", type: "video/mp4" },
    },
    {
      image: { path: "/images/viewers-pixar", ext: "png", alt: "pixar" },
      video: { path: "/videos/pixar.mp4", type: "video/mp4" },
    },
    {
      image: { path: "/images/viewers-starwars", ext: "png", alt: "starwars" },
      video: { path: "/videos/star-wars.mp4", type: "video/mp4" },
    },
  ];

  /**
   * [React 리스트 렌더링 - map() 함수]
   * JavaScript 배열의 map() 메서드를 사용하여 배열의 각 요소를 JSX로 변환
   *
   * map()의 동작:
   * 1. categoryList 배열의 각 item에 대해 반복
   * 2. 각 item으로 JSX 요소를 생성
   * 3. 새로운 JSX 요소들의 배열을 반환
   *
   * 이 패턴은 React에서 동적으로 리스트를 렌더링할 때 가장 일반적으로 사용됨
   */
  const categoryItems = categoryList.map((item) => {
    return (
      /**
       * [React의 key prop - 매우 중요!]
       * - key는 React가 어떤 항목이 변경/추가/제거되었는지 식별하는 데 사용
       * - 리스트를 렌더링할 때 각 요소에 고유한 key를 제공해야 함
       * - key가 없으면 React는 경고를 표시하고 성능이 저하될 수 있음
       * - 여기서는 item.image.alt를 key로 사용 (각 카테고리마다 고유함)
       *
       * 주의: 배열 인덱스를 key로 사용하는 것은 권장되지 않음 (항목 순서가 바뀔 수 있기 때문)
       */
      <Wrap key={item.image.alt}>
        {/*
          [템플릿 리터럴로 동적 경로 생성]
          path와 ext를 합쳐서 완전한 이미지 경로 생성
          예: "/images/viewers-disney" + "." + "png" = "/images/viewers-disney.png"
        */}
        <img
          src={`${item.image.path}.${item.image.ext}`}
          alt={item.image.alt}
        />
        {/*
          [HTML5 video 태그 속성]
          - autoPlay: 자동 재생
          - loop: 무한 반복
          - muted: 음소거 (브라우저의 autoplay 정책상 muted와 함께 사용해야 자동 재생됨)
        */}
        <video autoPlay loop muted>
          <source src={item.video.path} type={item.video.type} />
        </video>
      </Wrap>
    );
  });

  console.log(categoryList, categoryItems);

  return (
    <Container>
      {/*
        [리스트 렌더링의 두 가지 방법]

        방법 1 (주석 처리된 코드):
        - JSX 내부에서 직접 map() 호출
        - 간단한 경우에 적합
        - 단점: JSX가 복잡해질 수 있음

        방법 2 (현재 사용 중):
        - 미리 변수에 map() 결과를 저장 (categoryItems)
        - JSX에서는 변수만 삽입
        - 장점: 코드 가독성이 좋고, 로직과 렌더링 분리
        - 장점: 렌더링 전에 데이터 디버깅 가능 (console.log)

        두 방법 모두 동일한 결과를 만들지만, 방법 2가 더 명확하고 유지보수하기 좋음
      */}
      {/* {categoryList.map((item) => {
          return (
            <Wrap>
              <img key={item} src={`${item.image.path}.${item.image.ext}`} alt={item.image.alt} />
              <video autoPlay loop muted>
                <source src={item.video.path} type={item.video.type} />
              </video>
            </Wrap>
          );
        })} */}

      {/*
        [JSX 표현식 내에서 변수 렌더링]
        - 중괄호 {} 안에 JavaScript 표현식을 작성
        - categoryItems는 JSX 요소들의 배열
        - React는 자동으로 배열의 각 요소를 렌더링
      */}
      {categoryItems}
    </Container>
  );
};

export default Category;

/**
 * [Styled Components - Container]
 * CSS Grid를 사용하여 카테고리를 가로로 배치하는 컨테이너
 *
 * CSS Grid 주요 속성:
 * - display: grid → Grid 레이아웃 활성화
 * - gap: 25px → 그리드 항목 간의 간격
 * - grid-template-columns: repeat(5, 1fr)
 *   → 5개의 동일한 너비(1fr = 1 fraction)를 가진 열 생성
 *   → 각 카테고리가 동일한 크기로 가로로 배치됨
 *
 * [반응형 디자인 - @media query]
 * - max-width: 768px → 화면 너비가 768px 이하일 때 (모바일/태블릿)
 * - grid-template-columns: repeat(1, 1fr) → 1열로 변경 (세로로 쌓임)
 * - 이를 통해 다양한 디바이스에서 최적의 레이아웃 제공
 */
const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

/**
 * [Styled Components - Wrap]
 * 각 카테고리 카드의 스타일을 정의하는 컴포넌트
 *
 * [종횡비(Aspect Ratio) 유지 기법 - padding-top hack]
 * padding-top: 56.25%
 * - 56.25% = 9/16 * 100 (16:9 비율)
 * - padding의 %는 부모 요소의 width를 기준으로 계산됨
 * - 이를 통해 카드의 가로 세로 비율을 항상 16:9로 유지
 * - 반응형 디자인에서 이미지/비디오의 비율을 유지하는 일반적인 방법
 *
 * [CSS 레이어링 구조]
 * position: relative (부모) + position: absolute (자식들)
 * - img: z-index: 1 (위 레이어) - 기본적으로 보임
 * - video: z-index: 0 (아래 레이어) - 기본적으로 숨겨짐
 * - hover 시: video의 opacity가 1이 되어 이미지 위로 나타남
 */
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
              rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  /**
   * [CSS Transition]
   * cubic-bezier(0.25, 0.46, 0.45, 0.94): 베지어 곡선을 사용한 커스텀 easing
   * - 부드러운 애니메이션 효과를 만듦
   * - transform, border-color 등의 변화가 250ms에 걸쳐 부드럽게 전환
   */
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  /**
   * [중첩 선택자 - img]
   * Styled Components에서는 내부 요소의 스타일을 중첩하여 작성 가능
   *
   * - inset: 0px → top, right, bottom, left를 모두 0으로 설정 (단축 속성)
   * - position: absolute → 부모(Wrap)를 기준으로 절대 위치
   * - object-fit: cover → 비율 유지하며 영역을 완전히 채움
   * - z-index: 1 → 비디오보다 위에 배치 (기본 상태에서 보임)
   */
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
  }

  /**
   * [중첩 선택자 - video]
   * - opacity: 0 → 기본 상태에서는 보이지 않음
   * - z-index: 0 → 이미지 뒤에 배치
   * - hover 시 opacity: 1이 되어 나타남
   */
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }

  /**
   * [Styled Components의 가상 선택자 - &:hover]
   * - &: 현재 컴포넌트 자신을 참조
   * - :hover: 마우스를 올렸을 때 적용되는 스타일
   *
   * 호버 효과:
   * 1. box-shadow 강화 (더 진한 그림자)
   * 2. transform: scale(1.05) → 5% 확대
   * 3. border-color 밝게 변경
   * 4. 내부 video의 opacity를 1로 변경하여 비디오 표시
   *
   * 이 모든 변화는 transition 속성에 의해 부드럽게 애니메이션됨
   */
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
                rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
    }
  }
`;
