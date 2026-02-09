
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Detail } from './pages/Detail';
import { Search } from './pages/Search';
import { Category } from './pages/Category';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#141414] text-white selection:bg-red-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:path" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
