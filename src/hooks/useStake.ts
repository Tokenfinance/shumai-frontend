import { useCallback } from 'react'

import useSfi from './useSfi'
import { useWallet } from 'use-wallet'

import { stake, getChefTangContract } from '../sfi/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const sfi = useSfi()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getChefTangContract(sfi),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, sfi],
  )

  return { onStake: handleStake }
}

export default useStake
