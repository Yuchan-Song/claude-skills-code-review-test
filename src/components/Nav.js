import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Nav = () => {

  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setIsShow(true)
      } else {
        setIsShow(false);
      }
    })
  
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