
import Header from './components/Header'
import UserProfile from './components/UserProfile'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import React from 'react'
import Counter from './components/Counter'
function App() {
  

  return (
    
    <>
    <Header />
    <UserProfile name="Alice"age="25" bio="Loves hiking and photography"/>
    <MainContent />
    <Footer />
    <Counter />
    </>
    
  );
}

export default App
