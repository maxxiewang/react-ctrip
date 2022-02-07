import React from 'react'
import { Footer, Header } from '../../components'
import styles from './MainLayout.module.css'

//! 这个children很关键
export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles['page-content']}>{children}</div>
      <Footer />
    </>
  )
}
