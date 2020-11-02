import { useCallback } from 'react'

import useSfi from './useSfi'
import { useWallet } from 'use-wallet'

import { unstake, getChefTangContract } from '../sfi/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const sfi = useSfi()
  const chefTangContract = getChefTangContract(sfi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(chefTangContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, sfi],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
