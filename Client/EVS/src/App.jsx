import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'

function App() {
  const [currentView, setCurrentView] = useState("LandingPage");

return (
  <body>
    {currentView === "LandingPage" && <LandingPage setView={setCurrentView} />}
    {currentView === "Login" && <LoginPage setView={setCurrentView} />}
  </body>
);
  
}

export default App
