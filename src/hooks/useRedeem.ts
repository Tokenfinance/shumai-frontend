import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../sfi/utils'

const useRedeem = (chefTangContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(chefTangContract, account)
    console.log(txHash)
    return txHash
  }, [account, chefTangContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
