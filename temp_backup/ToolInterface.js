import React, { useState, Suspense } from 'react';
import { Play, Presentation, ArrowLeftCircle } from 'lucide-react';
import Header from './Header';
import { getToolConfig } from './toolsRegistry/toolRegistry';  // Récupère la config de l'outil à afficher

const ToolInterface = ({ 
  toolId, 
  projectName,
  moderatorName 
}) => {
  const [mode, setMode] = useState(null);

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleBack = () => {
    setMode(null);
  };

  const handleHome = () => {
    setMode(null); // Réinitialise la vue pour revenir à la session principale
  };

  // Obtenir la config de l'outil en fonction de toolId
  const toolConfig = getToolConfig(toolId);

  if (!mode) {
    return (
      <div className="h-screen flex flex-col">
        <Header 
          projectName={projectName}
          moderatorName={moderatorName}
          date={currentDate}
          onBack={handleBack}
          onHome={handleHome}
        />
        <div className="flex-1 bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-8">
              <button
                onClick={() => setMode('presentation')}
                className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                <Presentation size={48} className="text-blue-600 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Présentation de l'outil</h2>
                <p className="text-gray-600 text-center">
                  Découvrez l'outil à travers une présentation interactive
                </p>
              </button>

              <button
                onClick={() => setMode('exploitation')}
                className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                <Play size={48} className="text-green-600 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Démarrer l'exploitation</h2>
                <p className="text-gray-600 text-center">
                  Commencez à utiliser l'outil avec les participants
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'presentation') {
    const PresentationComponent = toolConfig.presentation;

    return (
      <div className="h-screen flex flex-col">
        <Header 
          projectName={projectName}
          moderatorName={moderatorName}
          date={currentDate}
          onBack={handleBack}
          onHome={handleHome}
        />
        <div className="flex-1 bg-gray-100">
          <PresentationComponent />
        </div>

        {/* Bouton Retour à la session */}
        <div className="flex justify-between items-center bg-white p-4">
          <button
            onClick={handleHome}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center"
          >
            <ArrowLeftCircle size={20} className="mr-2" />
            Retour à la session
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'exploitation') {
    const ToolComponent = toolConfig.component;

    return (
      <div className="h-screen flex flex-col">
        <Header 
          projectName={projectName}
          moderatorName={moderatorName}
          date={currentDate}
          onBack={handleBack}
          onHome={handleHome}
        />
        <div className="flex-1 flex">
          <div className="flex-1 bg-white p-4 border-r overflow-auto">
            <ToolComponent />
          </div>
        </div>

        {/* Bouton Retour à la session */}
        <div className="flex justify-between items-center bg-white p-4">
          <button
            onClick={handleHome}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center"
          >
            <ArrowLeftCircle size={20} className="mr-2" />
            Retour à la session
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ToolInterface;