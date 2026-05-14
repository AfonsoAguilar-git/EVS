import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LandingPage from './Pages/LandingPage'
import AuthPage from './Pages/AuthPage'
import Navbar from './Components/Navbar'
import DotField from './Components/DotField'
import  useAuth  from './hooks/usestates'

function App() {
  const [currentView, setCurrentView] = useState("LandingPage");
  const { user, login, isLoggedIn, loading, error, logout} = useAuth();

  if (loading) return <div>A carregar...</div>;

return (
  <section className='h-100 font-monospace'>
    <div className='h-100 w-100 position-fixed'>
      <DotField
        dotRadius={1.5}
        dotSpacing={23}
        cursorRadius={1000}
        cursorForce={1}
        bulgeOnly
        bulgeStrength={14}
        glowRadius={50}
        sparkle={false}
        waveAmplitude={0}
        gradientFrom="#a9a9a9"
        gradientTo="#000000"
        glowColor="rgba(0, 0, 0, 0)"
      />
    </div>
   {currentView === "LandingPage" && (<LandingPage setView={setCurrentView} isLoggedIn={isLoggedIn} user={user} onlogout={logout} />)}
   {(currentView === "Login" || currentView === "SignUp") && (<AuthPage setView={setCurrentView} currentView={currentView}  onLogin={login} authError={error}/>
)}
  </section>
);
  
}

export default App
