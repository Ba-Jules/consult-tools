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

const toolsConfig = {
   'afom': { 
       id: 'afom', 
       name: 'AFOM', 
       icon: '📊',
       description: 'Analyse des Forces, Faiblesses, Opportunités et Menaces',
       component: AFOM,
       presentation: AFOMPresentation,
       category: 'analyse',
       tags: ['stratégie', 'diagnostic', 'planification']
   },
   'arbre-problemes': { 
       id: 'arbre-problemes', 
       name: 'Arbre à problèmes', 
       icon: '🌳',
       description: 'Visualisation hiérarchique des causes et conséquences',
       component: ArbreProbleme,
       presentation: ArbreProblemePresentation,
       category: 'analyse',
       tags: ['diagnostic', 'causalité', 'problématique']
   },
   'cadre-logique': { 
       id: 'cadre-logique', 
       name: 'Cadre logique', 
       icon: '📋',
       description: 'Structuration logique des objectifs et résultats',
       component: CadreLogique,
       presentation: CadreLogiquePresentation,
       category: 'planification',
       tags: ['objectifs', 'indicateurs', 'résultats']
   },
   'gantt': {
       id: 'gantt',
       name: 'Diagramme de Gantt',
       icon: '📅', 
       description: 'Planification temporelle des activités du projet',
       component: DiagrammeGantt,
       presentation: DiagrammeGanttPresentation,
       category: 'planification',
       tags: ['planning', 'temps', 'activités']
   },
   'parties-prenantes': {
       id: 'parties-prenantes',
       name: 'Analyse des parties prenantes',
       icon: '👥',
       description: 'Cartographie et analyse des acteurs du projet', 
       component: AnalyseParties,
       presentation: AnalysePartiesPresentation,
       category: 'analyse',
       tags: ['acteurs', 'stakeholders', 'partenaires']
   },
   'analyse-genre': {
       id: 'analyse-genre',
       name: 'Analyse genre',
       icon: '⚖️',
       description: 'Évaluation des aspects liés au genre dans le projet',
       component: AnalyseGenre,
       presentation: AnalyseGenrePresentation,
       category: 'analyse',
       tags: ['égalité', 'inclusion', 'social']
   },
   'carte-mentale': {
       id: 'carte-mentale',
       name: 'Carte mentale',
       icon: '🧠',
       description: 'Représentation visuelle des idées et concepts',
       component: CarteMentale,
       presentation: CarteMentalePresentation,
       category: 'ideation',
       tags: ['brainstorming', 'créativité', 'organisation']
   },
   'analyse-multicriteres': {
       id: 'analyse-multicriteres',
       name: 'Analyse multicritères',
       icon: '🎯',
       description: 'Évaluation comparative selon plusieurs critères',
       component: AnalyseMulticriteres,
       presentation: AnalyseMulticriteresPresentation,
       category: 'decision',
       tags: ['décision', 'évaluation', 'comparaison']
   }
};

export const getToolConfig = (toolId) => toolsConfig[toolId] || null;

export const getTools = () => Object.values(toolsConfig);

export const getToolName = (toolId) => toolsConfig[toolId]?.name || 'Outil inconnu';

export const getToolsByCategory = (category) => 
   Object.values(toolsConfig).filter(tool => tool.category === category);

export const searchTools = (keyword) => {
   const searchTerm = keyword.toLowerCase();
   return Object.values(toolsConfig).filter(tool => 
       tool.name.toLowerCase().includes(searchTerm) ||
       tool.description.toLowerCase().includes(searchTerm) ||
       tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
   );
};

export const getCategories = () => 
   Array.from(new Set(Object.values(toolsConfig).map(tool => tool.category)));

export const getTags = () => 
   Array.from(new Set(Object.values(toolsConfig).flatMap(tool => tool.tags)));

export const isToolAvailable = (toolId) => toolId in toolsConfig;

export const loadTool = async (toolId) => {
   try {
       const toolConfig = toolsConfig[toolId];
       if (!toolConfig) {
           throw new Error(`Outil ${toolId} non trouvé`);
       }
       return toolConfig.component;
   } catch (error) {
       console.error(`Erreur lors du chargement de l'outil ${toolId}:`, error);
       return null;
   }
};

export const loadToolPresentation = async (toolId) => {
   try {
       const toolConfig = toolsConfig[toolId];
       if (!toolConfig) {
           throw new Error(`Présentation de l'outil ${toolId} non trouvée`);
       }
       return toolConfig.presentation;
   } catch (error) {
       console.error(`Erreur lors du chargement de la présentation ${toolId}:`, error);
       return null;
   }
};

export default toolsConfig;