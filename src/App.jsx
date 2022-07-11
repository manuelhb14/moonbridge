import React from 'react';

import Home from './pages/Home';
import Bridge from './pages/Bridge';
import Explorer from './pages/Explorer';
import TransactionDetails from './pages/TransactionDetails';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
        
    return (
        
            <Router>
                 <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                />
                <Navbar />
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/bridge" element={ <Bridge /> } />
                        <Route path="/explorer" element={ <Explorer /> } />
                        <Route path="/" element={ <Home /> } />
                        <Route path="/tx/:txHash" element={ <TransactionDetails /> } />
                    </Routes>
                   
            </Router>
        
        
    );
}

export default App;
