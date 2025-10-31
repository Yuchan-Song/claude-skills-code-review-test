import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

/**
 * 네비게이션 바 컴포넌트
 * 스크롤 위치에 따라 배경색이 변하는 고정형 네비게이션 바
 */
const Nav = () => {

  // 네비게이션 배경색 표시 여부 상태
  const [isShow, setIsShow] = useState(false);

  // 스크롤 이벤트 리스너 등록 및 정리
  useEffect(() => {
    // 스크롤 위치가 50px을 넘으면 배경색 표시
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setIsShow(true)
      } else {
        setIsShow(false);
      }
    })

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])
  

  return (
    <NavWrapper isShow={isShow}>
      <Logo>
        <img alt="Disney Plus Logo" src="/images/logo.svg" onClick={() => (window.location.href = "/")} />
      </Logo>
    </NavWrapper>
  )
}

export default Nav

/**
 * 네비게이션 바 래퍼 스타일
 * 스크롤 위치에 따라 배경색이 투명에서 어두운 색으로 전환
 */
const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.isShow ? "#090b13" : "transparent"};
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
`