import './App.css'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/common/Navbar/Navbar'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/Auth/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App() {
const pages=[{element:<HomePage/>,slug:"/"},
  {element:<ProfilePage/>,slug:"/profile"},
  {element:<SettingsPage/>,slug:"/settings"},
  {element:<SignupPage/>,slug:"/signup"},
  {element:<LoginPage/>,slug:"/login"}]

  const routedElements = pages.map((element, i) => (
    <Route key={i} path={element.slug} element={element.element} />
  ));
  
  const {authUser,isCheckingAuth,checkAuth}=useAuthStore();

  useEffect(() => {
    const init = async () => {
      await checkAuth();
    };
    init();
  }, [checkAuth]);
  
  if(!authUser && isCheckingAuth) return(
    <div className=" w-screen h-screen flex items-center justify-center">
  <Loader className="size-10 animate-spin" />
</div>

  )


  return (
    <>
          <Toaster position="top-right" reverseOrder={false} />
      <Navbar/>

      
      <Routes>
        {routedElements}
      </Routes>
    </>
  )
}

export default App
