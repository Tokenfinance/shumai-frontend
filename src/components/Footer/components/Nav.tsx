import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://etherscan.io/address/0x21Cf1a07fF3205b3C638421fAc449f69409E1C11#code"
      >
        Shumai::SFI ChefTang Contract
      </StyledLink>
      <StyledLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://uniswap.info/pair/0xb89d555bf254a766e4d5b2c72e6371cef6bad599"
      >
        Uniswap SFI-ETH
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href="https://t.me/ShumaiFinance">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href="https://github.com/shumai-finance">
        Github
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href="https://twitter.com/ShumaiFinance">
        Twitter
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[5]}px;
  padding-right: ${(props) => props.theme.spacing[5]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
