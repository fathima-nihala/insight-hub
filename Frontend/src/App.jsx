import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './pages/signUp/SignUp';
import Sidebar from './sidebar/Sidebar';
import { Box } from '@mui/material';
import Navbar from './shared/Navbar';
import Profile from './pages/Profile';
import MyProfUpdate from './profile/components/MyProfUpdate';
import Home from './pages/Home';
import SingleDetails from './pages/SingleDetails';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Sidebar />
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Navbar />
                <Box sx={{ padding: 4 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/myprofile/update" element={<MyProfUpdate />} />
                    <Route path="/employee/:id" element={<SingleDetails />} />



                  </Routes>
                </Box>
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
