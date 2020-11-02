import { useCallback } from 'react'

import useSfi from './useSfi'
import { useWallet } from 'use-wallet'

import { harvest, getChefTangContract } from '../sfi/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const sfi = useSfi()
  const chefTangContract = getChefTangContract(sfi)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(chefTangContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, sfi])

  return { onReward: handleReward }
}

export default useReward
