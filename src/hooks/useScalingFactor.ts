import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { bnToDec, decToBn } from '../utils'
import useSfi from './useSfi'
import { getScalingFactor } from '../sfi/utils'

const useScalingFactor = () => {
  const [scalingFactor, setScalingFactor] = useState(decToBn(1))
  const sfi = useSfi()

  useEffect(() => {
    async function fetchScalingFactor() {
      const sf = await getScalingFactor(sfi)
      setScalingFactor(sf)
    }
    if (sfi) {
      fetchScalingFactor()
    }
  }, [sfi])

  return bnToDec(scalingFactor)
}

export default useScalingFactor
