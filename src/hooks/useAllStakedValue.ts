import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getChefTangContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../sfi/utils'
import useSfi from './useSfi'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sfi = useSfi()
  const farms = getFarms(sfi)
  const chefTangContract = getChefTangContract(sfi)
  const wethContact = getWethContract(sfi)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            chefTangContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, chefTangContract, sfi])

  useEffect(() => {
    if (account && chefTangContract && sfi) {
      fetchAllStakedValue()
    }
  }, [account, block, chefTangContract, setBalance, sfi])

  return balances
}

export default useAllStakedValue
