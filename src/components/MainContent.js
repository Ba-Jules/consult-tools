import React from 'react';
import ToolInterface from './ToolInterface';
import { getToolConfig } from './toolsRegistry/toolRegistry';

const MainContent = ({ selectedTool }) => {
  if (!selectedTool) {
    return (
      <div className="p-8">
        <h1 className="text-3xl">Sélectionnez un outil pour commencer.</h1>
      </div>
    );
  }

  const toolConfig = getToolConfig(selectedTool);

  if (!toolConfig) {
    return (
      <div className="p-8">
        <h1 className="text-2xl">Outil non trouvé.</h1>
      </div>
    );
  }

  // Ne pas passer de children à ToolInterface
  return <ToolInterface 
    toolId={selectedTool} 
    projectName="Mon Projet" 
    moderatorName="Modérateur"
  />;
};

export default MainContent;