import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getChefTangContract } from '../sfi/utils'
import useSfi from './useSfi'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sfi = useSfi()
  const chefTangContract = getChefTangContract(sfi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(chefTangContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, sfi])

  useEffect(() => {
    if (account && sfi) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, sfi])

  return balance
}

export default useStakedBalance
