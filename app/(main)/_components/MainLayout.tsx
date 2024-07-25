import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Hero from './Hero'
import Content from './Content'

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <Hero />
            <Content />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout