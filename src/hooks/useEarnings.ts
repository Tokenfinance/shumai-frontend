import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getChefTangContract } from '../sfi/utils'
import useSfi from './useSfi'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sfi = useSfi()
  const chefTangContract = getChefTangContract(sfi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(chefTangContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, chefTangContract, sfi])

  useEffect(() => {
    if (account && chefTangContract && sfi) {
      fetchBalance()
    }
  }, [account, block, chefTangContract, setBalance, sfi])

  return balance
}

export default useEarnings
