import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import sfi from '../../assets/img/sfi2.svg'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={sfi} height="64" style={{ marginTop: -4 }} />
      <StyledText>
        Shumai.Finance <ChefTangText>Shumai Chef Tang</ChefTangText>
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Reem Kufi', sans-serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`

const ChefTangText = styled.span`
  font-family: 'Dancing Script', sans-serif;
`

export default Logo
