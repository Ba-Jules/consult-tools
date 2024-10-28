import React, { useState, useEffect } from 'react';
import { Plus, Save, Edit, Trash2, ArrowDown } from 'lucide-react';
import styled from '@emotion/styled';

// Styles des composants
const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
  gap: 2rem;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  
  &.consequences {
    background-color: rgba(0, 255, 0, 0.1);
  }
  
  &.problem {
    background-color: rgba(255, 165, 0, 0.1);
  }
  
  &.causes {
    background-color: rgba(255, 0, 0, 0.1);
  }
`;

const ElementContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
`;

const initialState = {
  consequences: [],
  centralProblem: "",
  causes: []
};

const ArbreProbleme = ({ onReset }) => {
  // États
  const [elements, setElements] = useState(initialState);
  const [newElement, setNewElement] = useState({
    type: 'causes',
    text: ''
  });
  const [editingElement, setEditingElement] = useState(null);
  const [editingProblem, setEditingProblem] = useState(false);

  // Gestion de la réinitialisation
  useEffect(() => {
    if (onReset) {
      setElements(initialState);
      setNewElement({ type: 'causes', text: '' });
      setEditingElement(null);
      setEditingProblem(false);
    }
  }, [onReset]);

  // Gestionnaires d'événements
  const handleAdd = () => {
    if (newElement.text.trim()) {
      const newId = `${newElement.type}-${Date.now()}`;
      setElements(prev => ({
        ...prev,
        [newElement.type]: [...prev[newElement.type], { id: newId, text: newElement.text }]
      }));
      setNewElement(prev => ({ ...prev, text: '' }));
    }
  };

  const handleEdit = (type, id) => {
    const element = elements[type].find(el => el.id === id);
    if (element) {
      setEditingElement({
        id,
        type,
        text: element.text
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingElement) {
      setElements(prev => ({
        ...prev,
        [editingElement.type]: prev[editingElement.type].map(el =>
          el.id === editingElement.id ? { ...el, text: editingElement.text } : el
        )
      }));
      setEditingElement(null);
    }
  };

  const handleDelete = (type, id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet élément ?')) {
      setElements(prev => ({
        ...prev,
        [type]: prev[type].filter(el => el.id !== id)
      }));
    }
  };

  const handleProblemEdit = () => {
    setEditingProblem(true);
  };

  const handleProblemSave = (newText) => {
    setElements(prev => ({
      ...prev,
      centralProblem: newText
    }));
    setEditingProblem(false);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        {/* Barre d'ajout */}
        <div className="p-4">
          <div className="flex gap-2">
            <select
              value={newElement.type}
              onChange={e => setNewElement(prev => ({ ...prev, type: e.target.value }))}
              className="rounded border p-2"
            >
              <option value="consequences">Conséquences</option>
              <option value="causes">Causes</option>
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

        {/* Arbre à problèmes */}
        <TreeContainer>
          {/* Conséquences */}
          <Section className="consequences">
            <h3 className="font-bold text-lg mb-2">Conséquences</h3>
            {elements.consequences.map(element => (
              <ElementContainer key={element.id}>
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
                  <div className="flex items-start justify-between group">
                    <div className="flex-1">{element.text}</div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={() => handleEdit('consequences', element.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete('consequences', element.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </ElementContainer>
            ))}
          </Section>

          <ArrowContainer>
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </ArrowContainer>

          {/* Problème central */}
          <Section className="problem">
            <h3 className="font-bold text-lg mb-2">Problème Central</h3>
            <ElementContainer>
              {editingProblem ? (
                <div className="flex gap-2">
                  <textarea
                    value={elements.centralProblem}
                    onChange={e => setElements(prev => ({ ...prev, centralProblem: e.target.value }))}
                    className="flex-1 border rounded p-1 min-h-[60px]"
                    autoFocus
                  />
                  <button
                    onClick={() => handleProblemSave(elements.centralProblem)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Save size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-start justify-between group">
                  <div className="flex-1">
                    {elements.centralProblem || "Cliquez pour définir le problème central"}
                  </div>
                  <button
                    onClick={handleProblemEdit}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              )}
            </ElementContainer>
          </Section>

          <ArrowContainer>
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </ArrowContainer>

          {/* Causes */}
          <Section className="causes">
            <h3 className="font-bold text-lg mb-2">Causes</h3>
            {elements.causes.map(element => (
              <ElementContainer key={element.id}>
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
                  <div className="flex items-start justify-between group">
                    <div className="flex-1">{element.text}</div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={() => handleEdit('causes', element.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete('causes', element.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </ElementContainer>
            ))}
          </Section>
        </TreeContainer>
      </div>
    </div>
  );
};

export default ArbreProbleme;