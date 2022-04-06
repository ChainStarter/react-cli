export const MINING_DATA = 'MINING_DATA'

const initState = {
  miningData: null
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case MINING_DATA:
      return {
        ...state,
        updateCount: action.data,
      }
    default:
      return state
  }
}
