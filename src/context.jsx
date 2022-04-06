import React, {createContext, useMemo, useState} from 'react'
import {connect} from 'react-redux'
import {useWeb3React} from '@web3-react/core'
import {multicallClient} from "./web3/multicall";

export const VarContext = createContext()
let timer = null

function Context(props) {
  const {chainId} = useWeb3React()
  const [blockHeight, setBlockHeight] = useState(0)
  const getBlockHeight = callback => {
    multicallClient.getBlockInfo().then(info => {
      setBlockHeight(info.number)
      callback && callback()
      return info.number
    })
  }

  const timeoutGetBlockHeight = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      getBlockHeight(timeoutGetBlockHeight)
    }, 8000)
  }
  useMemo(() => {
    document.addEventListener('visibilitychange', () => {
      const isActive_ = document.visibilityState === 'visible'
      if (isActive_) {
        getBlockHeight()
        timeoutGetBlockHeight()
      } else {
        clearTimeout(timer)
      }
    })
  }, [])

  useMemo(() => {
    if (props.updateCount === 0) {
      timeoutGetBlockHeight()
    }
    getBlockHeight()
    return () => {
      clearTimeout(timer)
    }
  }, [props.updateCount, chainId])

  return (
    <VarContext.Provider value={{
      blockHeight
    }}>
      {props.children}
    </VarContext.Provider>
  )
}

export default connect(state => state.reduxWeb3)(Context)
