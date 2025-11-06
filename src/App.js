import styled from 'styled-components';
import requests from './api/request'
import './App.css';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Category from './components/Category'
import Row from './components/Row'

/**
 * 디즈니 플러스 앱의 메인 컴포넌트
 * 네비게이션과 배너를 포함한 메인 레이아웃을 구성
 */
function App() {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action" id="AM" fetchUrl={requests.fetchMoviesActionGenres} />
      <Row title="Comedy" id="CM" fetchUrl={requests.fetchMoviesComedyGenres} />
    </Container>
  );
}

export default App;

/**
 * 메인 컨테이너 스타일
 * 배경 이미지를 포함하며 네비게이션 아래 위치하는 메인 콘텐츠 영역
 */
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  /* 배경 이미지를 가상 요소로 추가하여 콘텐츠 뒤에 배치 */
  &:after {
    background: url("/images/home-background.png") center center /cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;