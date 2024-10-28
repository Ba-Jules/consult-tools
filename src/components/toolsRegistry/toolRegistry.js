import React from 'react';

// Import des composants pour chaque outil
import AFOM from '../tools/AFOM';
import AFOMPresentation from '../tools/AFOMPresentation';
import ArbreProbleme from '../tools/ArbreProbleme';
import ArbreProblemePresentation from '../tools/ArbreProblemePresentation';
import CadreLogique from '../tools/CadreLogique';
import CadreLogiquePresentation from '../tools/CadreLogiquePresentation';
import DiagrammeGantt from '../tools/DiagrammeGantt';
import DiagrammeGanttPresentation from '../tools/DiagrammeGanttPresentation';
import AnalyseParties from '../tools/AnalyseParties';
import AnalysePartiesPresentation from '../tools/AnalysePartiesPresentation';
import AnalyseGenre from '../tools/AnalyseGenre';
import AnalyseGenrePresentation from '../tools/AnalyseGenrePresentation';
import CarteMentale from '../tools/CarteMentale';
import CarteMentalePresentation from '../tools/CarteMentalePresentation';
import AnalyseMulticriteres from '../tools/AnalyseMulticriteres';
import AnalyseMulticriteresPresentation from '../tools/AnalyseMulticriteresPresentation';

// Configuration des outils avec icônes et descriptions
const toolsConfig = [
  { 
    id: 'afom', 
    name: 'AFOM', 
    icon: '📊',
    description: 'Analyse des Forces, Faiblesses, Opportunités et Menaces',
    component: AFOM, 
    presentation: AFOMPresentation,
    category: 'analyse',
    tags: ['stratégie', 'diagnostic', 'planification']
  },
  { 
    id: 'arbre-problemes', 
    name: 'Arbre à problèmes', 
    icon: '🌳',
    description: 'Visualisation hiérarchique des causes et conséquences d\'un problème',
    component: ArbreProbleme, 
    presentation: ArbreProblemePresentation,
    category: 'analyse',
    tags: ['diagnostic', 'causalité', 'problématique']
  },
  { 
    id: 'cadre-logique', 
    name: 'Cadre logique', 
    icon: '📋',
    description: 'Structuration logique des objectifs et résultats attendus',
    component: CadreLogique, 
    presentation: CadreLogiquePresentation,
    category: 'planification',
    tags: ['objectifs', 'indicateurs', 'résultats']
  },
  { 
    id: 'gantt', 
    name: 'Diagramme de Gantt', 
    icon: '📅',
    description: 'Planification temporelle des activités du projet',
    component: DiagrammeGantt, 
    presentation: DiagrammeGanttPresentation,
    category: 'planification',
    tags: ['planning', 'temps', 'activités']
  },
  { 
    id: 'parties-prenantes', 
    name: 'Analyse des parties prenantes', 
    icon: '👥',
    description: 'Cartographie et analyse des acteurs du projet',
    component: AnalyseParties, 
    presentation: AnalysePartiesPresentation,
    category: 'analyse',
    tags: ['acteurs', 'stakeholders', 'partenaires']
  },
  { 
    id: 'analyse-genre', 
    name: 'Analyse genre', 
    icon: '⚖️',
    description: 'Évaluation des aspects liés au genre dans le projet',
    component: AnalyseGenre, 
    presentation: AnalyseGenrePresentation,
    category: 'analyse',
    tags: ['égalité', 'inclusion', 'social']
  },
  { 
    id: 'carte-mentale', 
    name: 'Carte mentale', 
    icon: '🧠',
    description: 'Représentation visuelle des idées et concepts',
    component: CarteMentale, 
    presentation: CarteMentalePresentation,
    category: 'ideation',
    tags: ['brainstorming', 'créativité', 'organisation']
  },
  { 
    id: 'analyse-multicriteres', 
    name: 'Analyse multicritères', 
    icon: '🎯',
    description: 'Évaluation comparative selon plusieurs critères',
    component: AnalyseMulticriteres, 
    presentation: AnalyseMulticriteresPresentation,
    category: 'decision',
    tags: ['décision', 'évaluation', 'comparaison']
  }
];

// Toutes les fonctions sans export individuel
const getToolConfig = (toolId) => {
  return toolsConfig.find(t => t.id === toolId) || null;
};

const getTools = () => toolsConfig;

const loadTool = (toolId) => {
  const toolConfig = getToolConfig(toolId);
  if (!toolConfig) {
    console.error(`Outil avec l'ID "${toolId}" introuvable.`);
    return null;
  }
  return toolConfig.component;
};

const loadToolPresentation = (toolId) => {
  const toolConfig = getToolConfig(toolId);
  if (!toolConfig) {
    console.error(`Présentation de l'outil avec l'ID "${toolId}" introuvable.`);
    return null;
  }
  return toolConfig.presentation;
};

const getToolName = (toolId) => {
  const tool = getToolConfig(toolId);
  return tool ? tool.name : 'Outil inconnu';
};

const getToolsByCategory = (category) => {
  return toolsConfig.filter(tool => tool.category === category);
};

const searchTools = (keyword) => {
  const searchTerm = keyword.toLowerCase();
  return toolsConfig.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

const getCategories = () => {
  const categories = new Set(toolsConfig.map(tool => tool.category));
  return Array.from(categories);
};

const getTags = () => {
  const tags = new Set(toolsConfig.flatMap(tool => tool.tags));
  return Array.from(tags);
};

const registerTool = (tool) => {
  if (!getToolConfig(tool.id)) {
    toolsConfig.push(tool);
    return true;
  }
  console.warn(`L'outil avec l'ID "${tool.id}" est déjà enregistré.`);
  return false;
};

const unregisterTool = (toolId) => {
  const index = toolsConfig.findIndex(t => t.id === toolId);
  if (index !== -1) {
    toolsConfig.splice(index, 1);
    return true;
  }
  console.warn(`L'outil avec l'ID "${toolId}" n'existe pas dans la configuration.`);
  return false;
};

const isToolAvailable = (toolId) => {
  return toolsConfig.some(tool => tool.id === toolId);
};

// Un seul export avec toutes les fonctions
export {
  getToolConfig,
  getTools,
  loadTool,
  loadToolPresentation,
  getToolName,
  getToolsByCategory,
  searchTools,
  getCategories,
  getTags,
  registerTool,
  unregisterTool,
  isToolAvailable
};