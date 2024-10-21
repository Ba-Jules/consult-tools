import React from 'react';
import AFOMContent from './tools/AFOMContent';
import ArbreProblemeContent from './tools/ArbreProblemeContent';
import CadreLogiqueContent from './tools/CadreLogiqueContent';
import DiagrammeGanttContent from './tools/DiagrammeGanttContent';
import AnalysePartiesContent from './tools/AnalysePartiesContent'; // Corrige cet import
import AnalyseGenreContent from './tools/AnalyseGenreContent';
import CarteMentaleContent from './tools/CarteMentaleContent';
import AnalyseMulticriteresContent from './tools/AnalyseMulticriteresContent';

const MainContent = ({ selectedTool }) => {
  const renderToolContent = () => {
    switch (selectedTool) {
      case 'afom':
        return <AFOMContent />;
      case 'arbre-problemes':
        return <ArbreProblemeContent />;
      case 'cadre-logique':
        return <CadreLogiqueContent />;
      case 'gantt':
        return <DiagrammeGanttContent />;
      case 'parties-prenantes': // Assure-toi d'utiliser l'identifiant correct
        return <AnalysePartiesContent />;
      case 'analyse-genre':
        return <AnalyseGenreContent />;
      case 'carte-mentale':
        return <CarteMentaleContent />;
      case 'analyse-multicriteres':
        return <AnalyseMulticriteresContent />;
      default:
        return <p>Sélectionnez un outil pour commencer</p>;
    }
  };

  return (
    <div className="flex-1 p-10 bg-white">
      <h2 className="text-2xl font-semibold">Outil sélectionné : {selectedTool}</h2>
      {renderToolContent()}
    </div>
  );
};

export default MainContent;