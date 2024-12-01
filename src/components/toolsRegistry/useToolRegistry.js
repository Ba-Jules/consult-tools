// src/components/toolsRegistry/useToolRegistry.js

const toolsConfig = [
    { id: 'afom', name: 'AFOM', component: () => import('../tools/AFOM') },
    { id: 'arbre-problemes', name: 'Arbre à problèmes', component: () => import('../tools/ArbreProblemes') },
    { id: 'cadre-logique', name: 'Cadre logique', component: () => import('../tools/CadreLogique') },
    { id: 'gantt', name: 'Diagramme de Gantt', component: () => import('../tools/DiagrammeGantt') },
    { id: 'parties-prenantes', name: 'Analyse des parties prenantes', component: () => import('../tools/AnalyseParties') },
    { id: 'analyse-genre', name: 'Analyse genre', component: () => import('../tools/AnalyseGenre') },
    { id: 'carte-mentale', name: 'Carte mentale', component: () => import('../tools/CarteMentale') },
    { id: 'analyse-multicriteres', name: 'Analyse multicritères', component: () => import('../tools/AnalyseMulticriteres') },
  ];
  
  // Fonction pour obtenir la configuration d'un outil
  export const getToolConfig = (toolId) => {
    return toolsConfig.find(tool => tool.id === toolId);
  };
  
  // Fonction pour récupérer la liste complète des outils
  export const getTools = () => {
    return toolsConfig;
  };  