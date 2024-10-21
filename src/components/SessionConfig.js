import React, { useState } from 'react';

const SessionConfig = ({ onStartSession }) => {
  const [projectName, setProjectName] = useState('');
  const [participants, setParticipants] = useState('');
  const [tables, setTables] = useState('');
  const [selectedTools, setSelectedTools] = useState([]);

  const tools = [
    { id: 'afom', name: 'AFOM' },
    { id: 'arbre-problemes', name: 'Arbre à problèmes' },
    { id: 'cadre-logique', name: 'Cadre logique' },
    { id: 'gantt', name: 'Diagramme de Gantt' },
    { id: 'parties-prenantes', name: 'Analyse des parties prenantes' },
    { id: 'analyse-genre', name: 'Analyse genre' },
    { id: 'carte-mentale', name: 'Carte mentale' },
    { id: 'analyse-multicriteres', name: 'Analyse multicritères' },
  ];

  const handleToolSelection = (toolId) => {
    setSelectedTools((prevSelected) => {
      if (prevSelected.includes(toolId)) {
        return prevSelected.filter((id) => id !== toolId);
      } else {
        return [...prevSelected, toolId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!projectName.trim()) {
      alert("Veuillez entrer un nom de projet.");
      return;
    }
    if (selectedTools.length === 0) {
      alert("Veuillez sélectionner au moins un outil.");
      return;
    }
    onStartSession({ 
      projectName, 
      participants: participants || '0', 
      tables: tables || '0', 
      selectedTools: selectedTools // Assurez-vous que c'est un tableau d'identifiants
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Configuration de la session</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nom du projet :</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre de participants :</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded" 
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre de tables :</label>
        <input 
          type="number" 
          className="w-full p-2 border rounded" 
          value={tables}
          onChange={(e) => setTables(e.target.value)}
          min="0"
        />
      </div>

      <h3 className="font-semibold mb-2">Sélection des outils :</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className={`p-2 border rounded ${
              selectedTools.includes(tool.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleToolSelection(tool.id)}
          >
            {tool.name}
          </button>
        ))}
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Démarrer la session
      </button>
    </form>
  );
};

export default SessionConfig;