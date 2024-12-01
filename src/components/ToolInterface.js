import React, { useState, Suspense, lazy } from 'react';
import { Save, Users, FileText, RefreshCcw, ArrowLeftCircle, Presentation, Play } from 'lucide-react';
import ParticipantsView from './ParticipantsView';

const toolsModules = {
    'afom': {
        tool: lazy(() => import('./tools/AFOM')),
        presentation: lazy(() => import('./tools/AFOMPresentation'))
    },
    'arbre-problemes': {
        tool: lazy(() => import('./tools/ArbreProbleme')),
        presentation: lazy(() => import('./tools/ArbreProblemePresentation'))
    },
    'cadre-logique': {
        tool: lazy(() => import('./tools/CadreLogique')),
        presentation: lazy(() => import('./tools/CadreLogiquePresentation'))
    }
};

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
);

const ToolInterface = ({ toolId, projectName, sessionConfig }) => {
    const [mode, setMode] = useState(null);
    const [showParticipants, setShowParticipants] = useState(true);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const participantsInfo = {
        tables: sessionConfig?.tables || 1,
        totalParticipants: sessionConfig?.totalParticipants || 0,
        participantsPerTable: Math.ceil((sessionConfig?.totalParticipants || 0) / (sessionConfig?.tables || 1))
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Sauvegarde effectuée avec succès');
        } catch (error) {
            alert('Erreur lors de la sauvegarde');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleParticipants = () => {
        setShowParticipants(prev => !prev);
    };

    const handleGenerateReport = () => {
        alert('Génération du rapport en cours...');
    };

    const handleReset = () => {
        if (window.confirm('Êtes-vous sûr de vouloir réinitialiser ? Toutes les données seront perdues.')) {
            setResetTrigger(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (window.confirm('Voulez-vous vraiment quitter ? Les modifications non sauvegardées seront perdues.')) {
            setMode(null);
        }
    };

    const renderContent = () => {
        if (!mode) {
            return (
                <div className="grid grid-cols-2 gap-8 p-8 h-full">
                    <button 
                        onClick={() => setMode('presentation')}
                        className="p-8 bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
                    >
                        <Presentation className="w-12 h-12 text-blue-600 mb-4" />
                        <h2 className="text-xl font-bold mb-4">Présentation</h2>
                        <p className="text-gray-600">
                            Découvrez l'outil à travers une présentation interactive
                        </p>
                    </button>

                    <button 
                        onClick={() => setMode('exploitation')}
                        className="p-8 bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
                    >
                        <Play className="w-12 h-12 text-green-600 mb-4" />
                        <h2 className="text-xl font-bold mb-4">Démarrer</h2>
                        <p className="text-gray-600">
                            Commencer l'exploitation avec les participants
                        </p>
                    </button>
                </div>
            );
        }

        if (!toolsModules[toolId]) {
            return <div className="flex items-center justify-center h-full">Outil non disponible</div>;
        }

        const Component = mode === 'presentation' ? toolsModules[toolId].presentation : toolsModules[toolId].tool;

        return (
            <Suspense fallback={<LoadingSpinner />}>
                <Component 
                    key={resetTrigger}
                    sessionConfig={sessionConfig}
                    resetTrigger={resetTrigger}
                />
            </Suspense>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <header className="bg-white border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        {projectName} - {mode === 'presentation' ? 'Présentation' : mode === 'exploitation' ? 'Mode Exploitation' : 'Sélection du mode'}
                    </h1>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 bg-white p-4 overflow-auto">
                    {renderContent()}
                </main>

                {showParticipants && (
                    <aside className="w-64 bg-gray-50 p-4 border-l">
                        <ParticipantsView 
                            totalParticipants={participantsInfo.totalParticipants}
                            numberOfTables={participantsInfo.tables}
                            participantsPerTable={participantsInfo.participantsPerTable}
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
                    onClick={handleToggleParticipants}
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
                    <ArrowLeftCircle className="w-5 h-5" /> Retour
                </button>
            </footer>
        </div>
    );
};

export default ToolInterface;