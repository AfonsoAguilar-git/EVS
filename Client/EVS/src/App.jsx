import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LandingPage from './Pages/LandingPage'
import AuthPage from './Pages/AuthPage'
import DotField from './Components/DotField'
import  useAuth  from './hooks/usesAuth'
import PollsPage from './Pages/PollsPage'
import ManagePolls from './Pages/ManagePolls'
import usePolls from './hooks/usePolls'

function App() {
  const [currentView, setCurrentView] = useState("LandingPage");
  const {user, signup, login, isLoggedIn, loading, error, logout} = useAuth();
  const {polls, getpolls, pollsloading, pollserror, createpoll, closepoll, openpoll, votepoll,deletepoll} = usePolls();
  const [selectedPoll, setSelectedPoll] = useState(null)

  if (loading) return <div>A carregar...</div>;

  return (
    <section className='h-100 font-monospace'>
      <div className='z-n1 h-100 w-100 position-fixed'>
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
      {currentView === "LandingPage" && (<LandingPage currentView={currentView} setView={setCurrentView} isLoggedIn={isLoggedIn} user={user} onlogout={logout} />)}
      {(currentView === "Login" || currentView === "SignUp") && (<AuthPage setView={setCurrentView} currentView={currentView}  onLogin={login} onSignup={signup} authError={error}/>)}
      {currentView === "PollsPage" && (<PollsPage currentView={currentView} setView={setCurrentView} isLoggedIn={isLoggedIn} user={user} onlogout={logout} polls={polls} ongetpolls={getpolls} selectedPoll={selectedPoll} setSelected={setSelectedPoll} onvotepoll={votepoll}/>)}
      {currentView === "ManagePolls" && (<ManagePolls currentView={currentView} setView={setCurrentView} isLoggedIn={isLoggedIn} user={user} onlogout={logout} polls={polls} ongetpolls={getpolls} onclosepoll={closepoll} onopenpoll={openpoll} selectedPoll={selectedPoll} setSelected={setSelectedPoll} oncreatepoll={createpoll} ondeletepoll={deletepoll} pollerror={pollserror} />)}
    </section>
  );
  
}

export default App
