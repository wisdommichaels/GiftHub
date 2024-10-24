import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Sell from './pages/Sell'
import NotFound from './pages/NotFound'
import Landingpage from './pages/Landingpage'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { useEffect} from 'react'
import Checkrate from './pages/Checkrate'
import { useAuthStore } from './store/authStore'
import { useCardStore } from './store/cardStore'
import Rates from './pages/Rates'

function App() {
  const { getCards, cards } = useCardStore()
  useEffect(() =>{
    if(!cards)
    getCards()
  })

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes> <HomeRoute/> </ProtectedRoutes>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/landingpage' element={<Landingpage/>}/>
        <Route path='/sell' element={<ProtectedRoutes> <Sell/> </ProtectedRoutes>}/>
        <Route path='/checkrate' element={<Checkrate/>}/>
        <Route path='/rate/:name' element={<ProtectedRoutes><Rates/></ProtectedRoutes>}/>
        {/* <Route path='/razergold' element={<ProtectedRoutes><Razergold/></ProtectedRoutes>}/>
        <Route path='/apple' element={<ProtectedRoutes><Apple/></ProtectedRoutes>}/>
        <Route path='/amazon' element={<ProtectedRoutes><Amazon/></ProtectedRoutes>}/>
        <Route path='/american' element={<ProtectedRoutes><American/></ProtectedRoutes>}/>
        <Route path='/ebay' element={<ProtectedRoutes><Ebay/></ProtectedRoutes>}/>
        <Route path='/google' element={<ProtectedRoutes><Google/></ProtectedRoutes>}/>
        <Route path='/mastercard' element={<ProtectedRoutes><Mastercard/></ProtectedRoutes>}/>
        <Route path='/playstation' element={<ProtectedRoutes><Playstation/></ProtectedRoutes>}/>
        <Route path='/steam' element={<ProtectedRoutes><Steam/></ProtectedRoutes>}/>
        <Route path='/vanilla' element={<ProtectedRoutes><Vanilla/></ProtectedRoutes>}/>
        <Route path='/walmart' element={<ProtectedRoutes><Walmart/></ProtectedRoutes>}/> */}
        <Route path='/dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
        <Route path='/settings' element={<ProtectedRoutes><Settings/></ProtectedRoutes>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {user, checkAuth} = useAuthStore()
  useEffect(() => {
    if(!user){
      checkAuth()
    }
  })
  return user?children:<Login/>
  
}

const HomeRoute = ({}) => {
  const {user} = useAuthStore()  
  return user?<Home/>:<Landingpage/> 
}