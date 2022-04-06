export const LANGUAGE = 'LANGUAGE'
export const SHOW_CONNECT_WALLET = 'SHOW_CONNECT_WALLET'
export const DARK_MODE = 'DARK_MODE'
export const UPDATE_COUNT = 'UPDATE_COUNT'
export const BLOCK_HEIGHT = 'BLOCK_HEIGHT'

const language = window.localStorage.getItem('p_language') || 'en'
const darkMode = localStorage.getItem('isDarkMode') === '1'

const initState = {
  language,
  showConnectWallet: false,
  darkMode,
  updateCount: 0,
  blockHeight: 0
}
export default function reducer(state = initState, action) {
  switch (action.type) {
    case LANGUAGE:
      window.localStorage.setItem('p_language', action.params.language)
      return {
        ...state,
        language: action.data,
      }
    case SHOW_CONNECT_WALLET:
      return {
        ...state,
        showConnectWallet: action.data,
      }
    case DARK_MODE:
      return {
        ...state,
        darkMode: action.data
      }
    case UPDATE_COUNT:
      return {
        ...state,
        updateCount: state.updateCount + 1,
      }
    case BLOCK_HEIGHT:
      return {
        ...state,
        blockHeight: action.data,
      }
    default:
      return state
  }
}
