import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0x5997928f2A7004fc8Aa9F2561d71FB9B103E1e1f',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  OPM: '0xF4c17Bc4979c1dc7b4CA50115358Dec58C67fD9d',
  pDAI: '0x9043d4d51C9d2e31e3F169de4551E416970c27Ef',
  DSR: '0x51bb7917efcad03ec8b1d37251a06cd56b0c4a72',
  QBTC: '0x1089cc742f0f9712eb64d01bde67e82a800d2f77',
  SFI: '0x137268F88cf6D1F7cF6eA9c750da4A16B5AA97F7',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SFIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
  SFIETH: '0xb89d555bf254a766e4d5b2c72e6371cef6bad599',
}

export const contractAddresses = {
  sfi: {
    1: '0x137268F88cf6D1F7cF6eA9c750da4A16B5AA97F7',
  },
  chefTang: {
    1: '0x21Cf1a07fF3205b3C638421fAc449f69409E1C11',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SFI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
13 OPM 0x5A4b7BC01b1F7639F335C197821Aae6F6b451D8b
14 pDAI 0x60412478fd6c215fbe528f80057c56eca415e137
*/

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0xb89d555bf254a766e4d5b2c72e6371cef6bad599',
    },
    tokenAddresses: {
      1: '0x137268F88cf6D1F7cF6eA9c750da4A16B5AA97F7',
    },
    name: 'SFI Cooking!',
    symbol: 'SFI-ETH UNI-V2 LP',
    tokenSymbol: 'SFI',
    icon: '🥟',
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0x5A4b7BC01b1F7639F335C197821Aae6F6b451D8b',
    },
    tokenAddresses: {
      1: '0xF4c17Bc4979c1dc7b4CA50115358Dec58C67fD9d',
    },
    name: 'OPM Omega',
    symbol: 'OPM-ETH UNI-V2 LP',
    tokenSymbol: 'OPM',
    icon: '♎️',
  },
  {
    pid: 2,
    lpAddresses: {
      1: '0x60412478fd6c215fbe528f80057c56eca415e137',
    },
    tokenAddresses: {
      1: '0x9043d4d51C9d2e31e3F169de4551E416970c27Ef',
    },
    name: 'pDAI Phoenix',
    symbol: 'pDAI-USDC UNI-V2 LP',
    tokenSymbol: 'pDAI',
    icon: '🐦',
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0x2e62eaccf1008b4f1b1651ebfecfe61c0adabf78',
    },
    tokenAddresses: {
      1: '0x51bb7917efcad03ec8b1d37251a06cd56b0c4a72',
    },
    name: 'Dragon DSR',
    symbol: 'DSR-ETH UNI-V2 LP',
    tokenSymbol: 'DSR',
    icon: '🐲',
  },
  {
    pid: 4,
    lpAddresses: {
      1: '0x48b7c7ef2e58a2db21d273dcde116a0b53cf87e2',
    },
    tokenAddresses: {
      1: '0x1089cc742f0f9712eb64d01bde67e82a800d2f77',
    },
    name: 'Quantum QBTC',
    symbol: 'QBTC-ETH UNI-V2 LP',
    tokenSymbol: 'QBTC',
    icon: '⚛️',
  },
]
