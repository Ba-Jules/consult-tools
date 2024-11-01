import React, { useState, useEffect, Suspense } from 'react';
import { Save, Users, FileText, RefreshCcw, ArrowLeftCircle, Presentation, Play } from 'lucide-react';
import { getToolConfig } from './toolsRegistry/toolRegistry';

const ToolInterface = ({ toolId, projectName, moderatorName, sessionConfig }) => {
    const [mode, setMode] = useState(null);
    const [showParticipants, setShowParticipants] = useState(true);
    const [currentTool, setCurrentTool] = useState(null);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Chargement de l'outil
    useEffect(() => {
        if (!toolId) return;

        try {
            const tool = getToolConfig(toolId);
            if (tool) {
                console.log("Loaded tool config:", tool);
                setCurrentTool(tool);
            }
        } catch (error) {
            console.error("Error loading tool:", error);
        }
    }, [toolId]);

    // Gestionnaires d'événements
    const handleBack = () => {
        if (window.confirm('Voulez-vous vraiment quitter ? Les modifications non sauvegardées seront perdues.')) {
            setMode(null);
            setResetTrigger(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Sauvegarde effectuée avec succès');
        } catch (error) {
            alert('Erreur lors de la sauvegarde');
        } finally {
            setIsSaving(false);
        }
    };

    const handleGenerateReport = () => {
        alert('Génération du rapport en cours...');
    };

    const handleReset = () => {
        if (window.confirm('Êtes-vous sûr de vouloir réinitialiser ? Toutes les données seront perdues.')) {
            setResetTrigger(prev => !prev);
        }
    };

    const renderToolContent = () => {
        if (!currentTool) {
            return <div>Chargement de l'outil...</div>;
        }

        const Component = mode === 'presentation' ? 
            currentTool.presentation : 
            currentTool.component;

        if (!Component) {
            return <div>Composant non disponible</div>;
        }

        return (
            <Suspense fallback={<div>Chargement...</div>}>
                <Component 
                    key={`${toolId}-${resetTrigger}`}
                    onReset={resetTrigger}
                    sessionConfig={sessionConfig}
                />
            </Suspense>
        );
    };

    // Gestion des erreurs de chargement
    if (!currentTool) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-600">Outil non trouvé</div>
            </div>
        );
    }

    // Page d'accueil de l'outil
    if (!mode) {
        return (
            <div className="h-screen flex flex-col">
                <header className="bg-white border-b px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{currentTool.icon}</span>
                            <h1 className="text-xl font-semibold">{currentTool.name} - {projectName}</h1>
                        </div>
                        <div className="text-gray-600">{moderatorName} - {new Date().toLocaleDateString('fr-FR')}</div>
                    </div>
                </header>
                <div className="flex-1 bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-2 gap-8">
                            <button 
                                onClick={() => setMode('presentation')} 
                                className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
                            >
                                <Presentation className="w-12 h-12 text-blue-600 mb-4" />
                                <h2 className="text-xl font-semibold mb-2">Présentation de {currentTool.name}</h2>
                                <p className="text-gray-600 text-center">Découvrez l'outil à travers une présentation interactive</p>
                            </button>
                            <button 
                                onClick={() => setMode('exploitation')} 
                                className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
                            >
                                <Play className="w-12 h-12 text-green-600 mb-4" />
                                <h2 className="text-xl font-semibold mb-2">Démarrer l'exploitation</h2>
                                <p className="text-gray-600 text-center">Commencez à utiliser {currentTool.name} avec les participants</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Interface principale de l'outil
    return (
        <div className="h-screen flex flex-col">
            <header className="bg-white border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{currentTool.icon}</span>
                        <h1 className="text-xl font-semibold">{currentTool.name} - {mode === 'presentation' ? 'Présentation' : 'Mode Exploitation'}</h1>
                    </div>
                    <div className="text-gray-600">{moderatorName} - {new Date().toLocaleDateString('fr-FR')}</div>
                </div>
            </header>
            <div className="flex-1 flex">
                <main className="flex-1 bg-white p-4 overflow-auto">
                    {renderToolContent()}
                </main>
                {showParticipants && (
                    <aside className="w-64 bg-gray-50 p-4 border-l">
                        <h3 className="font-semibold mb-4">Participants</h3>
                        <div>
                            <p className="text-sm text-gray-500">Aucun participant pour le moment</p>
                        </div>
                    </aside>
                )}
            </div>
            <div className="bg-white border-t p-4">
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={handleSave} 
                        disabled={isSaving} 
                        className={`px-4 py-2 ${isSaving ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white rounded flex items-center gap-2`}
                    >
                        <Save className="w-5 h-5" /> {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                    </button>
                    <button 
                        onClick={() => setShowParticipants(!showParticipants)} 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Users className="w-5 h-5" /> {showParticipants ? 'Masquer' : 'Afficher'} participants
                    </button>
                    <button 
                        onClick={handleGenerateReport} 
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
                    >
                        <FileText className="w-5 h-5" /> Générer rapport
                    </button>
                    <button 
                        onClick={handleReset} 
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
                    >
                        <RefreshCcw className="w-5 h-5" /> Réinitialiser
                    </button>
                </div>
                <button 
                    onClick={handleBack} 
                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2"
                >
                    <ArrowLeftCircle className="w-5 h-5" /> Retour à la session
                </button>
            </div>
        </div>
    );
};

export default ToolInterface;