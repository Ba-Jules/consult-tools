import React from 'react';
import toolsConfig from './toolsConfig'; // Assure-toi que le chemin est correct

const Sidebar = ({ selectedTool, onSelectTool, tools }) => {
  const availableTools = toolsConfig.filter(tool => tools.includes(tool.id)); // Filtrer les outils sélectionnés

  return (
    <div className="w-64 h-screen bg-blue-700 text-white flex flex-col p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Outils Collaboratifs</h2>
      <ul className="space-y-2">
        {availableTools.map((tool) => (
          <li 
            key={tool.id} 
            className={`p-2 rounded transition duration-200 ease-in-out cursor-pointer ${
              selectedTool === tool.id ? 'bg-blue-800' : 'hover:bg-blue-600'
            }`}
            onClick={() => onSelectTool(tool.id)}
          >
            <div className="flex items-center space-x-2">
              <span>{tool.icon}</span>
              <span>{tool.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;