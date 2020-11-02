import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSfi from './useSfi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getChefTangContract } from '../sfi/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sfi = useSfi()
  const chefTangContract = getChefTangContract(sfi)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      chefTangContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, chefTangContract, lpContract])

  useEffect(() => {
    if (account && chefTangContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, chefTangContract, lpContract])

  return allowance
}

export default useAllowance
