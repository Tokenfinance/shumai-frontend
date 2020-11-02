import { useContext } from 'react'
import { Context } from '../contexts/SfiProvider'

const useSfi = () => {
  const { sfi } = useContext(Context)
  return sfi
}

export default useSfi
