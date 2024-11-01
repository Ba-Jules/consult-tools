import React, { useState, useEffect, Suspense } from 'react';
import { Save, Users, FileText, RefreshCcw, ArrowLeftCircle, Presentation, Play } from 'lucide-react';
import { getToolConfig } from './toolsRegistry/toolRegistry';
import ParticipantsView from './ParticipantsView';

const ToolInterface = ({ toolId, projectName, moderatorName = "Modérateur", sessionConfig }) => {
    const [mode, setMode] = useState(null);
    const [showParticipants, setShowParticipants] = useState(true);
    const [currentTool, setCurrentTool] = useState(null);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        console.log("ToolInterface - Configuration reçue:", sessionConfig);
    }, [sessionConfig]);

    useEffect(() => {
        if (!toolId) {
            console.warn("ToolID manquant");
            return;
        }

        const tool = getToolConfig(toolId);
        if (tool) {
            setCurrentTool(tool);
        } else {
            console.warn("Outil non trouvé pour l'ID:", toolId);
        }
    }, [toolId]);

    if (!sessionConfig || typeof sessionConfig !== 'object') {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-lg">
                    <div className="text-xl text-gray-600 mb-4">
                        Configuration de session incomplète
                    </div>
                    <pre className="text-left bg-gray-100 p-4 rounded mt-4">
                        {JSON.stringify(sessionConfig, null, 2)}
                    </pre>
                </div>
            </div>
        );
    }

    const normalizedConfig = {
        totalParticipants: parseInt(sessionConfig.totalParticipants) || 0,
        tables: parseInt(sessionConfig.tables) || 1,
        participantsPerTable: parseInt(sessionConfig.participantsPerTable) || 0,
        projectName: sessionConfig.projectName || 'Projet',
        participants: sessionConfig.participants || []
    };

    const handleBack = () => {
        if (window.confirm('Voulez-vous vraiment quitter ? Les modifications non sauvegardées seront perdues.')) {
            setMode(null);
            setResetTrigger(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Sauvegarde effectuée avec succès');
        setIsSaving(false);
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
            return <div className="flex items-center justify-center h-full">Chargement de l'outil...</div>;
        }

        const Component = mode === 'presentation' ? currentTool.presentation : currentTool.component;

        return (
            <Suspense fallback={<div className="flex items-center justify-center h-full">Chargement...</div>}>
                <Component 
                    key={`${toolId}-${resetTrigger}`}
                    onReset={resetTrigger}
                    sessionConfig={normalizedConfig}
                />
            </Suspense>
        );
    };

    if (!mode) {
        return (
            <div className="flex flex-col h-full">
                <header className="bg-white border-b px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{currentTool?.icon}</span>
                            <h1 className="text-xl font-semibold">{currentTool?.name} - {projectName}</h1>
                        </div>
                        <div className="text-gray-600">{moderatorName} - {new Date().toLocaleDateString('fr-FR')}</div>
                    </div>
                </header>
                <div className="flex-1 bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8">
                        <button 
                            onClick={() => setMode('presentation')}
                            className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
                        >
                            <Presentation className="w-12 h-12 text-blue-600 mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Présentation</h2>
                            <p className="text-gray-600 text-center">
                                Découvrez l'outil à travers une présentation interactive
                            </p>
                        </button>
                        <button 
                            onClick={() => setMode('exploitation')}
                            className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
                        >
                            <Play className="w-12 h-12 text-green-600 mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Démarrer</h2>
                            <p className="text-gray-600 text-center">
                                Commencer l'exploitation avec les participants
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <header className="bg-white border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{currentTool?.icon}</span>
                        <h1 className="text-xl font-semibold">
                            {currentTool?.name} - {mode === 'presentation' ? 'Présentation' : 'Mode Exploitation'}
                        </h1>
                    </div>
                    <div className="text-gray-600">{moderatorName} - {new Date().toLocaleDateString('fr-FR')}</div>
                </div>
            </header>
            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 bg-white p-4 overflow-auto">
                    {renderToolContent()}
                </main>
                {showParticipants && (
                    <aside className="w-64 bg-gray-50 p-4 border-l">
                        <ParticipantsView
                            totalParticipants={normalizedConfig.totalParticipants}
                            numberOfTables={normalizedConfig.tables}
                            participantsPerTable={normalizedConfig.participantsPerTable}
                        />
                    </aside>
                )}
            </div>
            <footer className="bg-white border-t p-4 flex justify-center gap-4">
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
                <button 
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2"
                >
                    <ArrowLeftCircle className="w-5 h-5" /> Retour à la session
                </button>
            </footer>
        </div>
    );
};

export default ToolInterface;