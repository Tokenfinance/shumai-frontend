import { Sfi } from '../../sfi'

import { bnToDec } from '../../utils'

import {
  getCurrentPrice as gCP,
  getTargetPrice as gTP,
  getCirculatingSupply as gCS,
  getNextRebaseTimestamp as gNRT,
  getTotalSupply as gTS,
  getScalingFactor,
} from '../../sfi/utils'

const getCurrentPrice = async (sfi: typeof Sfi): Promise<number> => {
  // FORBROCK: get current SFI price
  return gCP(sfi)
}

const getTargetPrice = async (sfi: typeof Sfi): Promise<number> => {
  // FORBROCK: get target SFI price
  return gTP(sfi)
}

const getCirculatingSupply = async (sfi: typeof Sfi): Promise<string> => {
  // FORBROCK: get circulating supply
  return gCS(sfi)
}

const getNextRebaseTimestamp = async (sfi: typeof Sfi): Promise<number> => {
  // FORBROCK: get next rebase timestamp
  const nextRebase = (await gNRT(sfi)) as number
  return nextRebase * 1000
}

const getTotalSupply = async (sfi: typeof Sfi): Promise<string> => {
  // FORBROCK: get total supply
  return gTS(sfi)
}

export const getStats = async (sfi: typeof Sfi) => {
  const curPrice = await getCurrentPrice(sfi)
  const circSupply = '' // await getCirculatingSupply(sfi)
  const nextRebase = await getNextRebaseTimestamp(sfi)
  const rawScalingFactor = await getScalingFactor(sfi)
  const scalingFactor = Number(bnToDec(rawScalingFactor).toFixed(2))
  const targetPrice = await getTargetPrice(sfi)
  const totalSupply = await getTotalSupply(sfi)
  return {
    circSupply,
    curPrice,
    nextRebase,
    scalingFactor,
    targetPrice,
    totalSupply,
  }
}
