import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reel1 from "./pages/Reel1";
import Reel2 from "./pages/Reel2";

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          "--ink": "#151313",
          "--paper": "#EDE6DA",
          "--accent": "#C6672B",
          "--sketch": "#5C7A73",
          "--line": "#3A3532",
          minHeight: "100vh",
          background: "var(--ink)",
          color: "var(--paper)",
          fontFamily: "'Iowan Old Style', 'Georgia', serif",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap');
          .catalog-root { font-family: 'Fraunces', Georgia, serif; }
          .mono { font-family: 'JetBrains Mono', monospace; }
          .track-row:hover { background: rgba(198,103,43,0.08); }
          .track-row:focus-visible, .play-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        `}</style>
        <Routes>
          <Route path="/" element={<Reel1 />} />
          <Route path="/reel-two" element={<Reel2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}