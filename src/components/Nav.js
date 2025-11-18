/**
 * Nav.js - 네비게이션 바 컴포넌트
 *
 * 디즈니 플러스 앱의 상단 네비게이션 바를 담당합니다.
 *
 * 주요 기능:
 * - 스크롤 위치에 따라 배경색이 변하는 반응형 네비게이션
 * - Firebase Google 인증을 통한 로그인/로그아웃
 * - 실시간 검색 기능 (입력 시 즉시 검색 페이지로 이동)
 * - 사용자 프로필 표시 및 드롭다운 메뉴
 * - 로컬 스토리지를 활용한 사용자 정보 영속성 유지
 *
 * @component
 */

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

/**
 * 네비게이션 바 컴포넌트
 * 스크롤 위치에 따라 배경색이 변하는 고정형 네비게이션 바
 *
 * @returns {JSX.Element} 네비게이션 바 컴포넌트
 */
const Nav = () => {
  // ==================== State 관리 ====================

  /**
   * 네비게이션 바 배경색 표시 여부 상태
   * 스크롤이 50px 이상 내려가면 true로 설정되어 배경색이 나타남
   * @type {[boolean, Function]}
   */
  const [show, setShow] = useState(false);

  /**
   * 검색창 입력값 상태
   * 사용자가 검색창에 입력하는 텍스트를 저장
   * @type {[string, Function]}
   */
  const [searchValue, setSearchValue] = useState("");

  /**
   * 사용자 정보 상태
   * 로그인한 사용자의 프로필 정보를 저장 (이름, 사진 URL 등)
   * 초기값은 로컬 스토리지에서 불러옴
   * @type {[Object, Function]}
   */
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const [userData, setUserData] = useState(initialUserData);

  // ==================== Hooks ====================

  /**
   * 현재 라우트 경로 정보
   * 메인 페이지(/)와 다른 페이지를 구분하는 데 사용
   */
  const { pathname } = useLocation();

  /**
   * 페이지 이동을 위한 navigate 함수
   * React Router의 프로그래매틱 네비게이션
   */
  const navigate = useNavigate();

  /**
   * Firebase 인증 인스턴스
   * 로그인, 로그아웃, 인증 상태 변경 감지에 사용
   */
  const auth = getAuth();

  /**
   * Google 인증 제공자
   * Firebase Google 로그인에 사용
   */
  const provider = new GoogleAuthProvider();

  // ==================== Effects ====================

  /**
   * 인증 상태 변경 감지 Effect
   *
   * Firebase 인증 상태가 변경될 때마다 실행됩니다.
   * - 로그인 상태이고 메인 페이지(/)에 있으면 /main으로 리다이렉트
   * - 로그아웃 상태면 메인 페이지(/)로 리다이렉트
   *
   * @dependency {Object} auth - Firebase 인증 인스턴스
   * @dependency {Function} navigate - 라우터 네비게이션 함수
   * @dependency {string} pathname - 현재 경로
   */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인된 상태
        if (pathname === "/") {
          navigate("/main");
        }
      } else {
        // 로그아웃 상태
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  /**
   * 스크롤 이벤트 리스너 설정 Effect
   *
   * 페이지 스크롤 시 네비게이션 바의 배경색을 변경하기 위한 이벤트 리스너를 등록합니다.
   * 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고, 언마운트될 때 제거하여 메모리 누수를 방지합니다.
   *
   * @dependency {Array} [] - 빈 배열이므로 컴포넌트 마운트/언마운트 시에만 실행
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // 클린업 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==================== Event Handlers ====================

  /**
   * 스크롤 이벤트 핸들러
   *
   * 사용자가 페이지를 스크롤할 때 호출됩니다.
   * 스크롤 위치가 50px을 초과하면 네비게이션 바에 배경색을 표시하고,
   * 50px 이하면 투명하게 만듭니다.
   *
   * @function
   */
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true); // 스크롤 다운: 어두운 배경색 표시
    } else {
      setShow(false); // 최상단: 투명 배경
    }
  };

  /**
   * 검색 입력 변경 핸들러
   *
   * 검색창에 텍스트를 입력할 때마다 호출됩니다.
   * 입력값을 상태에 저장하고, 쿼리스트링과 함께 검색 페이지로 즉시 이동합니다.
   * (실시간 검색 기능)
   *
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - 입력 이벤트 객체
   *
   * @example
   * // 사용자가 "avengers"를 입력하면
   * // URL이 /search?q=avengers로 변경됨
   */
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  /**
   * Google 로그인 핸들러
   *
   * Firebase Google 팝업 인증을 통해 로그인을 처리합니다.
   * 성공 시 사용자 정보를 상태와 로컬 스토리지에 저장하여,
   * 페이지 새로고침 후에도 로그인 상태를 유지합니다.
   *
   * @function
   * @see https://firebase.google.com/docs/auth/web/google-signin
   *
   * @example
   * // 로그인 성공 시:
   * // - userData 상태 업데이트
   * // - localStorage에 사용자 정보 저장
   * // - onAuthStateChanged가 감지하여 /main으로 리다이렉트
   */
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        setUserData(result.user);
        // 로그인 상태 영속성을 위해 로컬 스토리지에 저장
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /**
   * 로그아웃 핸들러
   *
   * Firebase 로그아웃을 처리하고 사용자 정보를 초기화합니다.
   * 로그아웃 후 메인 페이지(/)로 리다이렉트합니다.
   *
   * @function
   *
   * @example
   * // 로그아웃 성공 시:
   * // - userData 상태 초기화 (빈 객체로 설정)
   * // - 메인 페이지로 이동
   * // - onAuthStateChanged가 감지하여 추가 처리
   */
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ==================== Render ====================

  return (
    <NavWrapper show={show}>
      {/* 디즈니 플러스 로고 - 클릭 시 메인 페이지로 이동 */}
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {/*
        조건부 렌더링: 현재 페이지에 따라 다른 UI 표시

        메인 페이지(/): 로그인 버튼 표시
        - 사용자가 아직 로그인하지 않은 상태
        - Google 로그인 버튼만 표시

        다른 페이지: 검색창 + 사용자 프로필 표시
        - 로그인된 상태에서 영화 검색 가능
        - 사용자 프로필 이미지와 로그아웃 드롭다운 메뉴 표시
      */}
      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          {/* 실시간 검색 입력창 */}
          <Input
            value={searchValue}
            onInput={handleChange}
            className="nav_input"
            type="text"
            placeholder="검색어를 입력해주세요."
          />

          {/* 사용자 프로필 및 로그아웃 드롭다운 */}
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleSignOut}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

// ==================== Styled Components ====================

/**
 * 네비게이션 바 래퍼 스타일
 *
 * 화면 상단에 고정되는 네비게이션 바의 컨테이너입니다.
 * 스크롤 위치에 따라 배경색이 동적으로 변경됩니다.
 *
 * @component
 * @prop {boolean} show - true일 때 어두운 배경색 표시, false일 때 투명
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
  z-index: 3; /* 다른 요소들 위에 표시되도록 설정 */
`;

/**
 * 디즈니 플러스 로고 컨테이너 스타일
 *
 * 네비게이션 바 좌측에 위치하며, 클릭 시 메인 페이지로 이동합니다.
 *
 * @component
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
 *
 * 메인 페이지(/)에서만 표시되는 Google 로그인 버튼입니다.
 * 호버 시 색상 반전 효과가 적용됩니다.
 *
 * @component
 *
 * 스타일 특징:
 * - 반투명 검은 배경에 흰색 테두리
 * - 호버 시 흰색 배경으로 전환
 * - 부드러운 트랜지션 효과
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
 *
 * 네비게이션 바 중앙에 고정 위치하는 검색 입력 필드입니다.
 * 메인 페이지가 아닌 경우에만 표시됩니다.
 *
 * @component
 *
 * 레이아웃 특징:
 * - 화면 중앙에 절대 위치 (left: 50% + transform)
 * - 반투명 어두운 배경
 * - 입력 시 실시간으로 검색 페이지 이동
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

/**
 * 로그아웃 드롭다운 메뉴 스타일
 *
 * 사용자 프로필 이미지 위에 마우스를 올리면 나타나는 드롭다운 메뉴입니다.
 * 초기에는 opacity: 0으로 숨겨져 있다가, SignOut 컴포넌트의 호버 시 나타납니다.
 *
 * @component
 *
 * 동작 방식:
 * - 기본 상태: opacity: 0 (보이지 않음)
 * - 부모(SignOut) 호버 시: opacity: 1로 전환되며 나타남
 * - 절대 위치로 사용자 프로필 이미지 아래에 표시
 */
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19)
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0; /* 기본적으로 숨김 */
`;

/**
 * 사용자 프로필 컨테이너 스타일
 *
 * 로그인한 사용자의 프로필 이미지를 표시하는 컨테이너입니다.
 * 마우스 호버 시 DropDown 메뉴를 표시합니다.
 *
 * @component
 *
 * 상호작용:
 * - 호버 시 자식 요소인 DropDown의 opacity를 1로 변경
 * - 부드러운 페이드인 효과 (transition-duration: 1s)
 */
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

/**
 * 사용자 프로필 이미지 스타일
 *
 * Google 계정의 프로필 사진을 원형으로 표시합니다.
 *
 * @component
 *
 * 스타일 특징:
 * - 원형 이미지 (border-radius: 50%)
 * - 48x48px 크기
 * - SignOut 컨테이너 내에서 중앙 정렬
 */
const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
