// toolRegistry.js

// Import des composants pour chaque outil
import AFOM from '../tools/AFOM'; 
import AFOMPresentation from '../tools/AFOMPresentation'; // Présentation de l'outil
import ArbreProbleme from '../tools/ArbreProbleme';
import ArbreProblemePresentation from '../tools/ArbreProblemePresentation'; // Présentation de l'outil
import CadreLogique from '../tools/CadreLogique';
import CadreLogiquePresentation from '../tools/CadreLogiquePresentation'; // Présentation de l'outil
import DiagrammeGantt from '../tools/DiagrammeGantt';
import DiagrammeGanttPresentation from '../tools/DiagrammeGanttPresentation'; // Présentation de l'outil
import AnalyseParties from '../tools/AnalyseParties';
import AnalysePartiesPresentation from '../tools/AnalysePartiesPresentation'; // Présentation de l'outil
import AnalyseGenre from '../tools/AnalyseGenre';
import AnalyseGenrePresentation from '../tools/AnalyseGenrePresentation'; // Présentation de l'outil
import CarteMentale from '../tools/CarteMentale';
import CarteMentalePresentation from '../tools/CarteMentalePresentation'; // Présentation de l'outil
import AnalyseMulticriteres from '../tools/AnalyseMulticriteres';
import AnalyseMulticriteresPresentation from '../tools/AnalyseMulticriteresPresentation'; // Présentation de l'outil

// Configuration des outils : associe chaque outil à son composant et sa présentation
const toolsConfig = [
  { id: 'afom', name: 'AFOM', component: AFOM, presentation: AFOMPresentation },
  { id: 'arbre-problemes', name: 'Arbre à problèmes', component: ArbreProbleme, presentation: ArbreProblemePresentation },
  { id: 'cadre-logique', name: 'Cadre logique', component: CadreLogique, presentation: CadreLogiquePresentation },
  { id: 'gantt', name: 'Diagramme de Gantt', component: DiagrammeGantt, presentation: DiagrammeGanttPresentation },
  { id: 'parties-prenantes', name: 'Analyse des parties prenantes', component: AnalyseParties, presentation: AnalysePartiesPresentation },
  { id: 'analyse-genre', name: 'Analyse genre', component: AnalyseGenre, presentation: AnalyseGenrePresentation },
  { id: 'carte-mentale', name: 'Carte mentale', component: CarteMentale, presentation: CarteMentalePresentation },
  { id: 'analyse-multicriteres', name: 'Analyse multicritères', component: AnalyseMulticriteres, presentation: AnalyseMulticriteresPresentation },
];

// Fonction pour obtenir le composant d'un outil par son id
export const getToolConfig = (toolId) => {
  return toolsConfig.find(t => t.id === toolId);
};

// Fonction pour obtenir tous les outils disponibles
export const getTools = () => {
  return toolsConfig;
};

// Fonction pour charger un outil
export const loadTool = (toolId) => {
  const toolConfig = getToolConfig(toolId);
  return toolConfig ? toolConfig.component : null;
};

// Fonction pour charger la présentation d'un outil
export const loadToolPresentation = (toolId) => {
  const toolConfig = getToolConfig(toolId);
  return toolConfig ? toolConfig.presentation : null;
};

// Pour récupérer le nom d'un outil par son id
export const getToolName = (toolId) => {
  const tool = toolsConfig.find(t => t.id === toolId);
  return tool ? tool.name : 'Outil inconnu';
};

// Fonction d'enregistrement et de suppression (si nécessaire pour des fonctionnalités futures)
export const registerTool = (tool) => {
  toolsConfig.push(tool);
};

export const unregisterTool = (toolId) => {
  const index = toolsConfig.findIndex(t => t.id === toolId);
  if (index !== -1) {
    toolsConfig.splice(index, 1);
  }
};

export default {
  getToolConfig,
  getTools,
  loadTool,
  loadToolPresentation,
  getToolName,
  registerTool,
  unregisterTool
};