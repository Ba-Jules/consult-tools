import React, { useState } from 'react';
import { Plus, Save, Edit, Trash2, RefreshCcw, FileText, Users } from 'lucide-react';
import styled from '@emotion/styled';

const AFOMQuadrant = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  height: 100%;
  
  &.atouts { background-color: rgba(0, 255, 0, 0.1); }
  &.faiblesses { background-color: rgba(255, 165, 0, 0.1); }
  &.opportunites { background-color: rgba(0, 0, 255, 0.1); }
  &.menaces { background-color: rgba(255, 0, 0, 0.1); }
`;

const ElementsList = styled.div`
  flex: 1;
`;

const ElementText = styled.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`;

const AFOM = ({ sessionConfig }) => {
  const [elements, setElements] = useState({
    atouts: [],
    faiblesses: [],
    opportunites: [],
    menaces: []
  });

  const [newElement, setNewElement] = useState({
    category: 'atouts',
    text: ''
  });

  const [editingElement, setEditingElement] = useState(null);
  const [showParticipants, setShowParticipants] = useState(true);

  const handleAdd = () => {
    if (newElement.text.trim()) {
      const newId = `${newElement.category}-${Date.now()}`;
      setElements(prev => ({
        ...prev,
        [newElement.category]: [...prev[newElement.category], { id: newId, text: newElement.text }]
      }));
      setNewElement(prev => ({ ...prev, text: '' }));
    }
  };

  const handleEdit = (category, id) => {
    const element = elements[category].find(el => el.id === id);
    if (element) {
      setEditingElement({
        id,
        category,
        text: element.text
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingElement) {
      setElements(prev => ({
        ...prev,
        [editingElement.category]: prev[editingElement.category].map(el =>
          el.id === editingElement.id ? { ...el, text: editingElement.text } : el
        )
      }));
      setEditingElement(null);
    }
  };

  const handleDelete = (category, id) => {
    setElements(prev => ({
      ...prev,
      [category]: prev[category].filter(el => el.id !== id)
    }));
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser tous les éléments ?')) {
      setElements({
        atouts: [],
        faiblesses: [],
        opportunites: [],
        menaces: []
      });
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        {/* Barre d'ajout */}
        <div className="p-4">
          <div className="flex gap-2">
            <select
              value={newElement.category}
              onChange={e => setNewElement(prev => ({ ...prev, category: e.target.value }))}
              className="rounded border p-2"
            >
              <option value="atouts">Atouts</option>
              <option value="faiblesses">Faiblesses</option>
              <option value="opportunites">Opportunités</option>
              <option value="menaces">Menaces</option>
            </select>
            <input
              type="text"
              value={newElement.text}
              onChange={e => setNewElement(prev => ({ ...prev, text: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleAdd()}
              placeholder="Ajouter un nouvel élément..."
              className="flex-1 rounded border p-2"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grille AFOM */}
        <div className="flex-1 grid grid-cols-2 gap-4 p-4">
          {Object.entries({
            atouts: 'Atouts',
            faiblesses: 'Faiblesses',
            opportunites: 'Opportunités',
            menaces: 'Menaces'
          }).map(([key, title]) => (
            <AFOMQuadrant key={key} className={key}>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <ElementsList>
                {elements[key].map(element => (
                  <div key={element.id} className="bg-white p-3 rounded mb-2 shadow-sm group">
                    {editingElement?.id === element.id ? (
                      <div className="flex gap-2">
                        <textarea
                          value={editingElement.text}
                          onChange={e => setEditingElement(prev => ({ ...prev, text: e.target.value }))}
                          className="flex-1 border rounded p-1 min-h-[60px]"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start">
                        <ElementText>{element.text}</ElementText>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 ml-2">
                          <button
                            onClick={() => handleEdit(key, element.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(key, element.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </ElementsList>
            </AFOMQuadrant>
          ))}
        </div>

        {/* Les 4 boutons d'action */}
        <div className="flex justify-center gap-4 p-4">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Save size={16} />
            Sauvegarder
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setShowParticipants(!showParticipants)}
          >
            <Users size={16} />
            {showParticipants ? 'Masquer' : 'Afficher'} participants
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <FileText size={16} />
            Générer rapport
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <RefreshCcw size={16} />
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Section des participants */}
      {showParticipants && (
        <div className="w-64 border-l border-gray-200 p-4">
          <h3 className="font-bold text-gray-900 mb-4">Participants</h3>
          {sessionConfig && (
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Nombre de participants</p>
                <p className="font-medium">{sessionConfig.nombreParticipants}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Nombre de tables</p>
                <p className="font-medium">{sessionConfig.nombreTables}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AFOM;