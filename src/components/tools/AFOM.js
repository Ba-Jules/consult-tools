import React, { useState } from 'react';
import { Plus, Save, Edit, Trash2 } from 'lucide-react';
import styled from '@emotion/styled';

// Styles pour les quadrants AFOM
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

// Styles pour les éléments de texte
const ElementText = styled.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`;

const AFOM = () => {
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

    const handleAdd = () => {
        if (newElement.text.trim()) {
            const newId = `${newElement.category}-${Date.now()}`;
            setElements(prev => ({
                ...prev,
                [newElement.category]: [
                    ...prev[newElement.category],
                    { id: newId, text: newElement.text }
                ]
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
        if (window.confirm('Voulez-vous vraiment supprimer cet élément ?')) {
            setElements(prev => ({
                ...prev,
                [category]: prev[category].filter(el => el.id !== id)
            }));
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
                            <div>
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
                                                <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-800">
                                                    <Save size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-start">
                                                <ElementText>{element.text}</ElementText>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 ml-2">
                                                    <button onClick={() => handleEdit(key, element.id)} className="text-blue-600 hover:text-blue-800">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(key, element.id)} className="text-red-600 hover:text-red-800">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </AFOMQuadrant>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AFOM;