import { NextComponentType } from 'next'
import { createContext, Dispatch, useCallback, useContext, useReducer } from 'react'

export const ACTIONS = {
  SET_LOGS: 'SET_LOGS',
  INCREMENT_LOADED_IMAGES: 'INCREMENT_LOADED_IMAGES',
}

const defaultState = {
  logs: '',
  loadedImagesCount: 0,
}

type TAction = {
  type: string
  payload?: any
}

const reducer = (state = defaultState, action: TAction) => {
  switch (action.type) {
    case ACTIONS.SET_LOGS:
      return {
        ...state,
        logs: action.payload,
      }
    case ACTIONS.INCREMENT_LOADED_IMAGES:
      return { ...state, loadedImagesCount: state.loadedImagesCount + 1 }
    default:
      return state
  }
}

const AppStateContext = createContext<{
  state: typeof defaultState;
  dispatch: Dispatch<TAction>;
}>({
  state: defaultState,
  dispatch: () => {},
})

export const AppStateProvider: NextComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const memoDispatch = useCallback(dispatch, [])

  return (
    <AppStateContext.Provider value={{ state, dispatch: memoDispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export default () => {
  const value = useContext(AppStateContext)

  if (!value) {
    throw new Error('please define `AppStateProvider` higher in the tree')
  }

  return value
}
