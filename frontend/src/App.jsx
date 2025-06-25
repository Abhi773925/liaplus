import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import HeroSection from './components/HeroSection'
import Post from './components/Post'
import FullPost from './components/FullPost'
import Updateblog from './components/Updateblog'
import CreateBlog from './components/CreateBlog'
const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          
         <Route path="/" element={<><HeroSection /><Post /></>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/blog/:id' element={<FullPost/>}></Route>
          <Route path="/update/:id" element={<Updateblog />} />
          <Route path='/create' element={<CreateBlog/>}/>
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
