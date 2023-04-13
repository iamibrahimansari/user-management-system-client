import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import UserForm from './components/UserForm';

const initialStatus = {
  name: '',
  email: '',
  profession: '',
  gender: ''
}

const App = () => {
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialStatus);
  return (
    <div className="App">
      <h1 className="title">User Management System</h1>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  records={records} 
                  setRecords={setRecords} 
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              } 
            />
            <Route 
              path="/add-new-user" 
              element={
                <UserForm 
                  records={records} 
                  setRecords={setRecords}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              } 
            />
            <Route 
              path="/update-user" 
              element={
                <UserForm 
                  records={records} 
                  setRecords={setRecords} 
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              } 
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
