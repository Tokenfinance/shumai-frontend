import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getChefTangAddress = (sfi) => {
  return sfi && sfi.chefTangAddress
}
export const getSfiAddress = (sfi) => {
  return sfi && sfi.sfiAddress
}
export const getWethContract = (sfi) => {
  return sfi && sfi.contracts && sfi.contracts.weth
}

export const getChefTangContract = (sfi) => {
  return sfi && sfi.contracts && sfi.contracts.chefTang
}
export const getSfiContract = (sfi) => {
  return sfi && sfi.contracts && sfi.contracts.sfi
}

export const getFarms = (sfi) => {
  return sfi
    ? sfi.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'sfi',
          earnTokenAddress: sfi.contracts.sfi.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (chefTangContract, pid) => {
  const { allocPoint } = await chefTangContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await chefTangContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (chefTangContract, pid, account) => {
  return chefTangContract.methods.pendingSfi(pid, account).call()
}

export const getTotalLPWethValue = async (
  chefTangContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that chefTangContract owns
  const balance = await lpContract.methods
    .balanceOf(chefTangContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(chefTangContract, pid),
  }
}

export const approve = async (lpContract, chefTangContract, account) => {
  return lpContract.methods
    .approve(chefTangContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSfiSupply = async (sfi) => {
  return new BigNumber(await sfi.contracts.sfi.methods.totalSupply().call())
}

export const stake = async (chefTangContract, pid, amount, account) => {
  return chefTangContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (chefTangContract, pid, amount, account) => {
  return chefTangContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (chefTangContract, pid, account) => {
  return chefTangContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (chefTangContract, pid, account) => {
  try {
    const { amount } = await chefTangContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getScalingFactor = async (sfi) => {
  return new BigNumber(
    await sfi.contracts.sfi.methods.sfisScalingFactor().call(),
  )
}

export const redeem = async (chefTangContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1599518718) {
    return chefTangContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}
export const getPoolContracts = async (sfi) => {
  const pools = Object.keys(sfi.contracts)
    .filter((c) => c.indexOf('_pool') !== -1)
    .reduce((acc, cur) => {
      const newAcc = { ...acc }
      newAcc[cur] = sfi.contracts[cur]
      return newAcc
    }, {})
  return pools
}
export const getCurrentPrice = async (sfi) => {

  return sfi.toBigN(await sfi.contracts.rebaser.methods.getCurrentTWAP().call())
}

export const getTargetPrice = async (sfi) => {
  return sfi.toBigN(1).toFixed(2)
}

export const getCirculatingSupply = async (sfi) => {
  let now = await sfi.web3.eth.getBlock('latest')
  let scalingFactor = sfi.toBigN(
    await sfi.contracts.sfi.methods.sfisScalingFactor().call(),
  )
  let starttime = sfi
    .toBigN(await sfi.contracts.eth_pool.methods.starttime().call())
    .toNumber()
  let timePassed = now['timestamp'] - starttime
  if (timePassed < 0) {
    return 0
  }
  let sfisDistributed = sfi.toBigN((8 * timePassed * 250000) / 625000) //sfis from first 8 pools
  let starttimePool2 = sfi
    .toBigN(await sfi.contracts.ycrv_pool.methods.starttime().call())
    .toNumber()
  timePassed = now['timestamp'] - starttime
  let pool2Yams = sfi.toBigN((timePassed * 1500000) / 625000) // sfis from second pool. note: just accounts for first week
  let circulating = pool2Yams
    .plus(sfisDistributed)
    .times(scalingFactor)
    .div(10 ** 36)
    .toFixed(2)
  return circulating
}

export const getNextRebaseTimestamp = async (sfi) => {
  try {
    let now = await sfi.web3.eth.getBlock('latest').then((res) => res.timestamp)
    let interval = 43200 // 12 hours
    let offset = 28800 // 8am/8pm utc
    let secondsToRebase = 0
    if (await sfi.contracts.rebaser.methods.rebasingActive().call()) {
      if (now % interval > offset) {
        secondsToRebase = interval - (now % interval) + offset
      } else {
        secondsToRebase = offset - (now % interval)
      }
    } else {
      let twap_init = sfi
        .toBigN(await sfi.contracts.rebaser.methods.timeOfTWAPInit().call())
        .toNumber()
      if (twap_init > 0) {
        let delay = sfi
          .toBigN(await sfi.contracts.rebaser.methods.rebaseDelay().call())
          .toNumber()
        let endTime = twap_init + delay
        if (endTime % interval > offset) {
          secondsToRebase = interval - (endTime % interval) + offset
        } else {
          secondsToRebase = offset - (endTime % interval)
        }
        return endTime + secondsToRebase
      } else {
        return now + 13 * 60 * 60 // just know that its greater than 12 hours away
      }
    }
    return secondsToRebase
  } catch (e) {
    console.log(e)
  }
}

export const getTotalSupply = async (sfi) => {
  return await sfi.contracts.sfi.methods.totalSupply().call()
}

export const getStats = async (sfi) => {
  const curPrice = await getCurrentPrice(sfi)
  const circSupply = await getCirculatingSupply(sfi)
  const nextRebase = await getNextRebaseTimestamp(sfi)
  const targetPrice = await getTargetPrice(sfi)
  const totalSupply = await getTotalSupply(sfi)
  return {
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply,
  }
}
