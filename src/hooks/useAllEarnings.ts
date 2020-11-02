import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getChefTangContract, getFarms } from '../sfi/utils'
import useSfi from './useSfi'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sfi = useSfi()
  const farms = getFarms(sfi)
  const chefTangContract = getChefTangContract(sfi)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(chefTangContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, chefTangContract, sfi])

  useEffect(() => {
    if (account && chefTangContract && sfi) {
      fetchAllBalances()
    }
  }, [account, block, chefTangContract, setBalance, sfi])

  return balances
}

export default useAllEarnings
