import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

/**
 * 네비게이션 바 컴포넌트
 * 스크롤 위치에 따라 배경색이 변하는 고정형 네비게이션 바
 */
const Nav = () => {
  // 네비게이션 배경색 표시 여부 상태 (스크롤 50px 이상 시 true)
  const [show, setShow] = useState(false);
  // 현재 라우트 경로 (메인 페이지 여부 판단에 사용)
  const { pathname } = useLocation();
  // 검색창 입력값 상태
  const [searchValue, setSearchValue] = useState("");
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  // 스크롤 이벤트 리스너 등록 및 정리
  useEffect(() => {
    // 스크롤 위치가 50px을 넘으면 배경색 표시
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * 스크롤 이벤트 핸들러
   * 스크롤 위치가 50px을 초과하면 네비게이션 배경색을 표시
   */
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true); // 스크롤 다운 시 배경색 표시
    } else {
      setShow(false); // 최상단에서는 투명 배경
    }
  };

  /**
   * 검색 입력 변경 핸들러
   * 입력값이 변경될 때마다 검색 페이지로 이동하며 쿼리스트링 업데이트
   * @param {Event} e - 입력 이벤트 객체
   */
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  return (
    <NavWrapper show={show}>
      {/* 디즈니 플러스 로고 - 클릭 시 홈으로 이동 */}
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {/*
        조건부 렌더링:
        - 메인 페이지(/)에서는 로그인 버튼 표시
        - 다른 페이지에서는 검색 입력창 표시
      */}
      {pathname === "/" ? (
        <Login>Login</Login>
      ) : (
        <Input
          value={searchValue}
          onInput={handleChange}
          className="nav_input"
          type="text"
          placeholder="검색어를 입력해주세요."
        />
      )}
    </NavWrapper>
  );
};

export default Nav;

/**
 * 네비게이션 바 래퍼 스타일
 * 스크롤 위치에 따라 배경색이 투명에서 어두운 색으로 전환
 */
const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

/**
 * 디즈니 플러스 로고 스타일
 * 클릭 시 홈페이지로 이동
 */
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
    cursor: pointer;
  }
`;

/**
 * 로그인 버튼 스타일
 * 메인 페이지에서만 표시되며 호버 시 반전 효과
 */
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

/**
 * 검색 입력창 스타일
 * 네비게이션 바 중앙에 고정 위치하며, 메인 페이지 외에서 표시
 */
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;
