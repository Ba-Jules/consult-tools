import React, { useState, useEffect } from 'react';
import { Clock, Users, FilePlus, Clock as ClockIcon, LayoutGrid } from 'lucide-react';
import { getTools } from './toolsRegistry/toolRegistry';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "./ui/tabs";

const SummaryCard = ({ title, subtitle, icon }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
        <div>
            <p className="text-2xl font-bold">{title}</p>
            <p className="text-gray-500">{subtitle}</p>
        </div>
        {icon}
    </div>
);

const SessionConfig = ({ onStartSession }) => {
    // États
    const [sessionState, setSessionState] = useState({
        participants: [],
        totalParticipants: 0,
        participantsExpected: 0,
        tables: 1,
        participantsPerTable: 0,
        duration: { hours: 1, minutes: 0 },
        remainingTime: 60,
        tdrFile: null,
        charterFile: null,
        selectedTools: [],
        projectName: '',
        participantLink: ''
    });

    // Fonction de mise à jour générique
    const updateSessionState = (field, value) => {
        setSessionState(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Effets
    useEffect(() => {
        setSessionState(prev => ({
            ...prev,
            participantLink: `${window.location.origin}/join-session`
        }));
    }, []);

    // Gestionnaires d'événements
    const handleTotalParticipantsChange = (e) => {
        const newTotal = Math.max(0, parseInt(e.target.value) || 0);
        setSessionState(prev => ({
            ...prev,
            participantsExpected: newTotal,
            totalParticipants: newTotal,
            participantsPerTable: Math.ceil(newTotal / prev.tables)
        }));
    };

    const handleTablesChange = (e) => {
        const newTables = Math.max(1, parseInt(e.target.value) || 0);
        setSessionState(prev => ({
            ...prev,
            tables: newTables,
            participantsPerTable: Math.ceil(prev.participantsExpected / newTables)
        }));
    };

    const handleDurationChange = (e, type) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setSessionState(prev => {
            const newDuration = {
                ...prev.duration,
                [type]: value
            };
            return {
                ...prev,
                duration: newDuration,
                remainingTime: (newDuration.hours * 60) + newDuration.minutes
            };
        });
    };

    const handleFileUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            if (type === 'participants') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const content = e.target.result;
                        const lines = content.split('\n');
                        const newParticipants = lines.slice(1).map(line => {
                            const [firstName, lastName, email, phone] = line.split(',').map(item => item.trim());
                            return { firstName, lastName, email, phone };
                        });
                        setSessionState(prev => ({
                            ...prev,
                            participants: newParticipants,
                            totalParticipants: newParticipants.length
                        }));
                    } catch (error) {
                        alert('Format de fichier invalide. Utilisez un fichier CSV avec le format: prénom,nom,email,téléphone');
                    }
                };
                reader.readAsText(file);
            } else {
                setSessionState(prev => ({
                    ...prev,
                    [type === 'tdr' ? 'tdrFile' : 'charterFile']: file
                }));
            }
        }
    };

    const handleToolSelection = (toolId) => {
        setSessionState(prev => ({
            ...prev,
            selectedTools: prev.selectedTools.includes(toolId)
                ? prev.selectedTools.filter(id => id !== toolId)
                : [...prev.selectedTools, toolId]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation initiale
        if (!sessionState.projectName.trim()) {
            alert("Veuillez entrer un nom de projet.");
            return;
        }
    
        if (sessionState.selectedTools.length === 0) {
            alert("Veuillez sélectionner au moins un outil.");
            return;
        }
    
        // S'assurer que toutes les valeurs numériques sont des nombres
        const totalParticipants = parseInt(sessionState.totalParticipants) || 0;
        const participantsExpected = parseInt(sessionState.participantsExpected) || 0;
        const tables = Math.max(1, parseInt(sessionState.tables) || 1);
        const participantsPerTable = Math.ceil(participantsExpected / tables);
    
        // Validation des valeurs numériques
        if (participantsExpected <= 0) {
            alert("Le nombre de participants doit être supérieur à 0.");
            return;
        }
    
        // Construction de l'objet de configuration dans le format attendu
        const sessionConfig = {
            projectName: sessionState.projectName.trim(),
            selectedTools: sessionState.selectedTools,
            // Valeurs numériques strictement formatées
            totalParticipants: totalParticipants,
            participantsExpected: participantsExpected,
            tables: tables,
            participantsPerTable: participantsPerTable,
            // Informations de durée
            duration: {
                hours: parseInt(sessionState.duration.hours) || 0,
                minutes: parseInt(sessionState.duration.minutes) || 0
            },
            // Autres propriétés
            participants: sessionState.participants || [],
            tdrFile: sessionState.tdrFile,
            charterFile: sessionState.charterFile,
            // Calcul de la durée totale en minutes
            remainingTime: (parseInt(sessionState.duration.hours) || 0) * 60 + 
                          (parseInt(sessionState.duration.minutes) || 0)
        };
    
        // Log pour déboggage
        console.log("Configuration formatée:", sessionConfig);
    
        // Vérification finale
        if (!sessionConfig.tables || !sessionConfig.participantsPerTable) {
            alert("Configuration incomplète. Veuillez vérifier les valeurs numériques.");
            return;
        }
    
        // Envoi de la configuration
        onStartSession(sessionConfig);
    };

    // Liste des outils disponibles
    const availableTools = getTools();

    // Le rendu du composant
    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LayoutGrid className="w-6 h-6" />
                        Configuration de la Session
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Nom du projet */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom du projet
                        </label>
                        <input
                            type="text"
                            value={sessionState.projectName}
                            onChange={(e) => updateSessionState('projectName', e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Entrez le nom du projet"
                            required
                        />
                    </div>

                    <Tabs defaultValue="participants">
                        <TabsList>
                            <TabsTrigger value="participants">Participants</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                            <TabsTrigger value="tools">Outils</TabsTrigger>
                        </TabsList>

                        <TabsContent value="participants">
                            <div>
                                <div className="flex items-center space-x-4 mt-4">
                                    <label htmlFor="participants-file" className="flex items-center space-x-2 cursor-pointer">
                                        <FilePlus className="w-6 h-6" />
                                        <span>Télécharger la liste des participants</span>
                                    </label>
                                    <input
                                        type="file"
                                        id="participants-file"
                                        onChange={(e) => handleFileUpload(e, 'participants')}
                                        className="hidden"
                                        accept=".csv"
                                    />
                                    <p>Lien pour s'inscrire : <a href={sessionState.participantLink} target="_blank" rel="noopener noreferrer">{sessionState.participantLink}</a></p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <label htmlFor="total-participants" className="block text-sm font-medium text-gray-700 mb-2">
                                            Participants prévus
                                        </label>
                                        <input
                                            type="number"
                                            id="total-participants"
                                            value={sessionState.participantsExpected}
                                            onChange={handleTotalParticipantsChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="tables" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre de tables
                                        </label>
                                        <input
                                            type="number"
                                            id="tables"
                                            value={sessionState.tables}
                                            onChange={handleTablesChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            min="1"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Durée prévue
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                value={sessionState.duration.hours}
                                                onChange={(e) => handleDurationChange(e, 'hours')}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                min="0"
                                            />
                                            <span>h</span>
                                            <input
                                                type="number"
                                                value={sessionState.duration.minutes}
                                                onChange={(e) => handleDurationChange(e, 'minutes')}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                min="0"
                                                max="59"
                                            />
                                            <span>min</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="documents">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="tdr-file" className="flex items-center space-x-2 cursor-pointer">
                                        <FilePlus className="w-6 h-6" />
                                        <span>Télécharger le TDR</span>
                                    </label>
                                    <input
                                        type="file"
                                        id="tdr-file"
                                        onChange={(e) => handleFileUpload(e, 'tdr')}
                                        className="hidden"
                                    />
                                    {sessionState.tdrFile && <p>{sessionState.tdrFile.name}</p>}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="charter-file" className="flex items-center space-x-2 cursor-pointer">
                                        <FilePlus className="w-6 h-6" />
                                        <span>Télécharger le cahier des charges</span>
                                    </label>
                                    <input
                                        type="file"
                                        id="charter-file"
                                        onChange={(e) => handleFileUpload(e, 'charter')}
                                        className="hidden"
                                    />
                                    {sessionState.charterFile && <p>{sessionState.charterFile.name}</p>}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="tools">
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold">Sélectionnez les outils :</h4>
                                {availableTools.map((tool) => (
                                    <div key={tool.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`tool-${tool.id}`}
                                            checked={sessionState.selectedTools.includes(tool.id)}
                                            onChange={() => handleToolSelection(tool.id)}
                                            className="form-checkbox"
                                        />
                                        <label htmlFor={`tool-${tool.id}`} className="text-sm font-medium text-gray-700">
                                            {tool.icon} {tool.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Résumé de la configuration */}
            <Card>
                <CardHeader>
                    <CardTitle>Résumé de la configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <SummaryCard
                            title={sessionState.projectName || 'Non défini'}
                            subtitle="Projet"
                            icon={<LayoutGrid className="w-10 h-10 text-blue-500" />}
                        />
                        <SummaryCard
                            title={sessionState.selectedTools.length.toString()}
                            subtitle="Outils sélectionnés"
                            icon={<Users className="w-10 h-10 text-blue-500" />}
                        />
                        <SummaryCard
                            title={sessionState.totalParticipants.toString()}
                            subtitle="Participants inscrits"
                            icon={<Users className="w-10 h-10 text-blue-500" />}
                        />
                        <SummaryCard
                            title={sessionState.participantsExpected.toString()}
                            subtitle="Participants prévus"
                            icon={<Users className="w-10 h-10 text-blue-500" />}
                        />
                        <SummaryCard
                            title={`${sessionState.tables} tables de ${sessionState.participantsPerTable} personnes`}
                            subtitle="Configuration des tables"
                            icon={<LayoutGrid className="w-10 h-10 text-blue-500" />}
                        />
                        <SummaryCard
                            title={`${Math.floor(sessionState.remainingTime / 60)}h ${sessionState.remainingTime % 60}min`}
                            subtitle="Durée prévue"
                            icon={<ClockIcon className="w-10 h-10 text-blue-500" />}
                        />
                        <SummaryCard
                            title={sessionState.tdrFile ? 'TDR téléchargé' : 'Aucun TDR'}
                            subtitle="TDR"
                            icon={<FilePlus className="w-10 h-10 text-blue-500" />}
                        />
                        <SummaryCard
                            title={sessionState.charterFile ? 'Cahier des charges téléchargé' : 'Aucun cahier des charges'}
                            subtitle="Cahier des charges"
                            icon={<FilePlus className="w-10 h-10 text-blue-500" />}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Bouton de soumission */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
            >
                <Clock className="w-5 h-5" />
                Démarrer la session
            </button>
        </form>
    );
};

export default SessionConfig;