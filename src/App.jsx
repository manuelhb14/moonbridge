import React from 'react';

import Home from './pages/Home';
import Bridge from './pages/Bridge';
import Explorer from './pages/Explorer';
import TransactionDetails from './pages/TransactionDetails';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
        
    return (
        <main>
            <Router>
                <Navbar />
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/bridge" element={ <Bridge /> } />
                        <Route path="/explorer" element={ <Explorer /> } />
                        <Route path="/" element={ <Home /> } />
                        <Route path="/tx/:txHash" element={ <TransactionDetails /> } />
                    </Routes>
            </Router>
        </main>
        
    );
}

export default App;
