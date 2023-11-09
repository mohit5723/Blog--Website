import "./App.css"
import Header from "./header"
import Post from "./post"
import {Routes,Route} from "react-router-dom"
import Layout from "./layout"
import IndexPage from "./pages/indexpage"
import LoginPage from "./pages/loginpage"
import RegisterPage from "./pages/registerpage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={
        <IndexPage />
        } />     
        <Route path={'/login'} element={
        <LoginPage />
        } />
        <Route path={'/register'} element={
        <RegisterPage />
        } />
      </Route>
    </Routes>
   
      
  
  )
}

export default App
