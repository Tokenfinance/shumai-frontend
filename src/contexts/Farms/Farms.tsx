import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useSfi from '../../hooks/useSfi'

import { bnToDec } from '../../utils'
import { getChefTangContract, getEarned } from '../../sfi/utils'
import { getFarms } from '../../sfi/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const sfi = useSfi()
  const { account } = useWallet()

  const farms = getFarms(sfi)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
