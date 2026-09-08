import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { Cursor } from './components/ui/Cursor';
import { GalaxyBackground } from './components/ui/GalaxyBackground';
import { CommandPalette } from './components/ui/CommandPalette';
import { useCommandPalette } from './hooks/useCommandPalette';

function App() {
  const { isOpen, close } = useCommandPalette();

  return (
    <Router>
      <div className="min-h-screen bg-[#06080e] text-foreground font-sans selection:bg-white/20 relative">
        <GalaxyBackground />
        <Cursor />
        <CommandPalette isOpen={isOpen} onClose={close} />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<CaseStudy />} />
            </Routes>
          </div>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
