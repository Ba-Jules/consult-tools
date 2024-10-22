import React, { Suspense } from 'react'; 
import ToolInterface from './ToolInterface';
import { getToolConfig } from './toolsRegistry/toolRegistry';  // Importe directement getToolConfig

const MainContent = ({ selectedTool }) => {
  if (!selectedTool) {
    return (
      <div className="p-8">
        <h1 className="text-3xl">Sélectionnez un outil pour commencer.</h1>
      </div>
    );
  }

  const toolConfig = getToolConfig(selectedTool); // Récupérer la config de l'outil sélectionné

  if (!toolConfig) {
    return (
      <div className="p-8">
        <h1 className="text-2xl">Outil non trouvé.</h1>
      </div>
    );
  }

  return (
    <ToolInterface toolId={selectedTool}>
      <Suspense fallback={<div>Chargement de l'outil...</div>}>
        {React.createElement(toolConfig.component)} {/* Charger dynamiquement le composant de l'outil */}
      </Suspense>
    </ToolInterface>
  );
};

export default MainContent;