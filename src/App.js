import Routers from '../src/pages/index'
import 'antd/dist/antd.css'
import {useWeb3React} from "@web3-react/core";
import {useDispatch, useSelector} from "react-redux";
import {multicallClient} from "./web3/multicall";
import {BLOCK_HEIGHT} from "./redux";
import {useMemo} from "react";

let timer = null
function App() {
  const {chainId} = useWeb3React()
  const dispatch = useDispatch()
  const {updateCount} = useSelector(state => state.index)
  const getBlockHeight = callback => {
    multicallClient.getBlockInfo().then(info => {
      dispatch({
        type: BLOCK_HEIGHT,
        data: info.number
      })
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
    if (updateCount === 0) {
      timeoutGetBlockHeight()
    }
    getBlockHeight()
    return () => {
      clearTimeout(timer)
    }
  }, [updateCount, chainId])


  return (
    <Routers />
  )
}

export default App;
