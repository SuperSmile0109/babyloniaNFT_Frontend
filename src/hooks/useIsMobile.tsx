import { createContext, useContext } from 'react'
import type { NextComponentType, NextPageContext } from 'next'

const IsMobileContext = createContext(false)

type TProps = {
  value: boolean;
}

export const IsMobileProvider: NextComponentType<NextPageContext, {}, TProps> = ({
  children,
  value,
}) => (
  <IsMobileContext.Provider value={value}>
    {children}
  </IsMobileContext.Provider>
)

const useIsMobile = () => {
  const isMobile = useContext(IsMobileContext)

  if (isMobile === undefined || isMobile === null) {
    throw new Error('useIsMobile must be used within a IsMobileProvider')
  }

  return isMobile
}

export default useIsMobile
