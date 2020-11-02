import { useCallback } from 'react'

import useSfi from './useSfi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getChefTangContract } from '../sfi/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sfi = useSfi()
  const chefTangContract = getChefTangContract(sfi)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, chefTangContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, chefTangContract])

  return { onApprove: handleApprove }
}

export default useApprove
