import './App.css';
import Chat from './Component/Chat';
import Sidebar from './Component/Sidebar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Component/Login';
import { useStateValue } from './Component/StateProvider';
import { useEffect } from 'react';
import { auth } from './Component/firebase';
function App() {

  const [{user},dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      dispatch({
        type:"SET_USER",
        user:user
      })
    })
  }, [])


  return (
    <BrowserRouter>
    { !user ? (<Login/>) : (
      <div className="App">
      <div className="app__body">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Chat />}></Route>
          <Route path='/room/:roomId' element={<Chat />}></Route>
        </Routes>
      </div>
    </div>)
    }  
    </BrowserRouter>
  );
}
export default App
