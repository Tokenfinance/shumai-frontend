import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Sfi } from '../../sfi'

export interface SfiContext {
  sfi?: typeof Sfi
}

export const Context = createContext<SfiContext>({
  sfi: undefined,
})

declare global {
  interface Window {
    sfisauce: any
  }
}

const SfiProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [sfi, setSfi] = useState<any>()

  // @ts-ignore
  window.sfi = sfi
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const sfiLib = new Sfi(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setSfi(sfiLib)
      window.sfisauce = sfiLib
    }
  }, [ethereum])

  return <Context.Provider value={{ sfi }}>{children}</Context.Provider>
}

export default SfiProvider
