import React from 'react';
import AFOM from './tools/AFOM';
import ArbreProbleme from './tools/ArbreProbleme';
import CadreLogique from './tools/CadreLogique';
import DiagrammeGantt from './tools/DiagrammeGantt';
import AnalyseParties from './tools/AnalyseParties'; // Corrige cet import
import AnalyseGenre from './tools/AnalyseGenre';
import CarteMentale from './tools/CarteMentale';
import AnalyseMulticriteres from './tools/AnalyseMulticriteres';

const MainContent = ({ selectedTool }) => {
  const renderToolContent = () => {
    switch (selectedTool) {
      case 'afom':
        return <AFOM />;
      case 'arbre-problemes':
        return <ArbreProbleme />;
      case 'cadre-logique':
        return <CadreLogique />;
      case 'gantt':
        return <DiagrammeGantt/>;
      case 'parties-prenantes': 
        return <AnalyseParties />;
      case 'analyse-genre':
        return <AnalyseGenre />;
      case 'carte-mentale':
        return <CarteMentale/>;
      case 'analyse-multicriteres':
        return <AnalyseMulticriteres/>;
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