import React from 'react'
import Background from './components/Background'
import Footer from './components/global/Footer'
import Nav from './components/global/Nav'

const Layout = ({ children }) => {
    return (
        <>
            <Background />
            <Nav />
            {children}
            <Footer />
        </>
    )
}

export default Layout
