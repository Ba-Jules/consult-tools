import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const Sidebar = ({ selectedTool, onSelectTool, tools }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [width, setWidth] = useState(256); // 256px = 16rem (w-64)
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  const filteredTools = tools.filter(tool => 
    tool.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gestionnaire de début de redimensionnement
  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  // Gestionnaire de redimensionnement
  useEffect(() => {
    const handleResize = (e) => {
      if (isResizing && sidebarRef.current) {
        const newWidth = e.clientX;
        if (newWidth >= 64 && newWidth <= 400) { // min: 64px, max: 400px
          setWidth(newWidth);
          setIsCollapsed(newWidth < 128); // Auto-collapse if width < 128px
        }
      }
    };

    const stopResizing = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResizing);
    }

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  return (
    <div 
      ref={sidebarRef}
      className="relative flex flex-col h-full bg-blue-600"
      style={{ width: `${width}px`, minWidth: '64px', maxWidth: '400px' }}
    >
      {/* Contenu de la barre latérale */}
      <div className="p-4">
        {!isCollapsed && (
          <>
            <h1 className="text-white text-xl font-bold mb-4 truncate">Outils Collaboratifs</h1>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-3 py-2 pl-8 rounded bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 text-blue-200" size={18} />
            </div>
          </>
        )}
      </div>

      {/* Liste des outils */}
      <div className="flex-1 overflow-y-auto">
        <ul className="px-2">
          {filteredTools.map(tool => (
            <li
              key={tool}
              onClick={() => onSelectTool(tool)}
              className={`
                mb-1 px-3 py-2 rounded-md cursor-pointer
                transition-colors duration-200
                ${tool === selectedTool ? 'bg-blue-700 text-white' : 'text-white hover:bg-blue-500'}
                ${isCollapsed ? 'text-center' : ''}
                truncate
              `}
            >
              {isCollapsed ? tool.charAt(0).toUpperCase() : tool}
            </li>
          ))}
        </ul>
      </div>

      {/* Zone de redimensionnement */}
      <div
        className="absolute right-0 top-0 w-1 h-full cursor-ew-resize hover:bg-blue-400 transition-colors"
        onMouseDown={startResizing}
      />

      {/* Bouton de réduction (optionnel - vous pouvez le garder ou le supprimer) */}
      <button
        onClick={() => {
          setIsCollapsed(!isCollapsed);
          setWidth(isCollapsed ? 256 : 64);
        }}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-1 rounded-full shadow hover:bg-blue-800 focus:outline-none"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;