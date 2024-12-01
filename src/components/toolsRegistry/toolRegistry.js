import React from 'react';

// Configuration complète des outils avec lazy loading
const toolsConfig = {
    'afom': { 
        id: 'afom', 
        name: 'AFOM', 
        icon: '📊',
        description: 'Analyse des Forces, Faiblesses, Opportunités et Menaces',
        component: React.lazy(() => import('../tools/AFOM')),
        presentation: React.lazy(() => import('../tools/AFOMPresentation')),
        category: 'analyse',
        tags: ['stratégie', 'diagnostic', 'planification']
    },
    'arbre-problemes': { 
        id: 'arbre-problemes', 
        name: 'Arbre à problèmes', 
        icon: '🌳',
        description: 'Visualisation hiérarchique des causes et conséquences d\'un problème',
        component: React.lazy(() => import('../tools/ArbreProbleme')),
        presentation: React.lazy(() => import('../tools/ArbreProblemePresentation')),
        category: 'analyse',
        tags: ['diagnostic', 'causalité', 'problématique']
    },
    'cadre-logique': { 
        id: 'cadre-logique', 
        name: 'Cadre logique', 
        icon: '📋',
        description: 'Structuration logique des objectifs et résultats attendus',
        component: React.lazy(() => import('../tools/CadreLogique')),
        presentation: React.lazy(() => import('../tools/CadreLogiquePresentation')),
        category: 'planification',
        tags: ['objectifs', 'indicateurs', 'résultats']
    },
    'gantt': { 
        id: 'gantt', 
        name: 'Diagramme de Gantt', 
        icon: '📅',
        description: 'Planification temporelle des activités du projet',
        component: React.lazy(() => import('../tools/DiagrammeGantt')),
        presentation: React.lazy(() => import('../tools/DiagrammeGanttPresentation')),
        category: 'planification',
        tags: ['planning', 'temps', 'activités']
    },
    'parties-prenantes': { 
        id: 'parties-prenantes', 
        name: 'Analyse des parties prenantes', 
        icon: '👥',
        description: 'Cartographie et analyse des acteurs du projet',
        component: React.lazy(() => import('../tools/AnalyseParties')),
        presentation: React.lazy(() => import('../tools/AnalysePartiesPresentation')),
        category: 'analyse',
        tags: ['acteurs', 'stakeholders', 'partenaires']
    },
    'analyse-genre': { 
        id: 'analyse-genre', 
        name: 'Analyse genre', 
        icon: '⚖️',
        description: 'Évaluation des aspects liés au genre dans le projet',
        component: React.lazy(() => import('../tools/AnalyseGenre')),
        presentation: React.lazy(() => import('../tools/AnalyseGenrePresentation')),
        category: 'analyse',
        tags: ['égalité', 'inclusion', 'social']
    },
    'carte-mentale': { 
        id: 'carte-mentale', 
        name: 'Carte mentale', 
        icon: '🧠',
        description: 'Représentation visuelle des idées et concepts',
        component: React.lazy(() => import('../tools/CarteMentale')),
        presentation: React.lazy(() => import('../tools/CarteMentalePresentation')),
        category: 'ideation',
        tags: ['brainstorming', 'créativité', 'organisation']
    },
    'analyse-multicriteres': { 
        id: 'analyse-multicriteres', 
        name: 'Analyse multicritères', 
        icon: '🎯',
        description: 'Évaluation comparative selon plusieurs critères',
        component: React.lazy(() => import('../tools/AnalyseMulticriteres')),
        presentation: React.lazy(() => import('../tools/AnalyseMulticriteresPresentation')),
        category: 'decision',
        tags: ['décision', 'évaluation', 'comparaison']
    }
};

// Fonctions d'accès aux outils
export const getToolConfig = (toolId) => {
    return toolsConfig[toolId] || null;
};

export const getTools = () => Object.values(toolsConfig);

// Fonction pour récupérer le nom d'un outil
export const getToolName = (toolId) => {
    return toolsConfig[toolId]?.name || 'Outil inconnu';
};

// Fonction pour obtenir les outils par catégorie
export const getToolsByCategory = (category) => {
    return Object.values(toolsConfig).filter(tool => tool.category === category);
};

// Fonction de recherche d'outils
export const searchTools = (keyword) => {
    const searchTerm = keyword.toLowerCase();
    return Object.values(toolsConfig).filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
};

// Fonction pour obtenir toutes les catégories uniques
export const getCategories = () => {
    const categories = new Set(Object.values(toolsConfig).map(tool => tool.category));
    return Array.from(categories);
};

// Fonction pour obtenir tous les tags uniques
export const getTags = () => {
    const tags = new Set(
        Object.values(toolsConfig).flatMap(tool => tool.tags)
    );
    return Array.from(tags);
};

// Fonction de vérification de disponibilité d'un outil
export const isToolAvailable = (toolId) => {
    return toolId in toolsConfig;
};

// Fonction pour le chargement asynchrone des outils (pour compatibilité)
export const loadTool = async (toolId) => {
    const tool = toolsConfig[toolId];
    if (!tool) return null;
    try {
        const component = await tool.component;
        return component.default || component;
    } catch (error) {
        console.error(`Erreur lors du chargement de l'outil ${toolId}:`, error);
        return null;
    }
};

// Fonction pour le chargement asynchrone des présentations (pour compatibilité)
export const loadToolPresentation = async (toolId) => {
    const tool = toolsConfig[toolId];
    if (!tool) return null;
    try {
        const presentation = await tool.presentation;
        return presentation.default || presentation;
    } catch (error) {
        console.error(`Erreur lors du chargement de la présentation ${toolId}:`, error);
        return null;
    }
};

export default toolsConfig;