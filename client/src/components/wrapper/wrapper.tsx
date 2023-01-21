import { ReactNode, FC } from 'react'
import Footer from './footer/footer'
import Header from './header/header'

interface wrapperProps {
  children: ReactNode
}

const Wrapper: FC<wrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <Footer />
    </>
  )
}

export default Wrapper
