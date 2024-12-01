import React, { useState, useEffect } from 'react';
import { Send, List, Mic, Edit, Pencil } from 'lucide-react';
import VoiceInput from '../base/InputMethods/VoiceInput';
import KeyboardInput from '../base/InputMethods/KeyboardInput';
import StylusInput from '../base/InputMethods/StylusInput';
import ContributionHistory from '../common/ContributionHistory';
//import ParticipantLayout from '../ParticipantLayout';

const AFOMInterface = ({ sessionInfo, toolId }) => {
    // États
    const [inputMethod, setInputMethod] = useState('keyboard');
    const [contribution, setContribution] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Charger les contributions au démarrage
    useEffect(() => {
        if (sessionInfo?.sessionId) {
            fetchContributions();
        }
    }, [sessionInfo?.sessionId]);

    // Fonction pour récupérer les contributions existantes
    const fetchContributions = async () => {
        try {
            const response = await fetch(`/api/sessions/${sessionInfo.sessionId}/contributions`);
            if (response.ok) {
                const data = await response.json();
                setContributions(data.contributions || []);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des contributions:', error);
        }
    };

    // Les types de contributions restent les mêmes...
    const contributionTypes = [
        { id: 'atout', label: 'Acquis', color: 'bg-red-200 hover:bg-red-300', activeColor: 'bg-red-400' },
        { id: 'faiblesse', label: 'Faiblesse', color: 'bg-green-200 hover:bg-green-300', activeColor: 'bg-green-400' },
        { id: 'opportunite', label: 'Opportunité', color: 'bg-blue-200 hover:bg-blue-300', activeColor: 'bg-blue-400' },
        { id: 'menace', label: 'Menace', color: 'bg-pink-200 hover:bg-pink-300', activeColor: 'bg-pink-400' }
    ];

    // Gestionnaires inchangés...
    const handleVoiceTranscription = (transcription) => {
        setContribution(transcription);
    };

    const handleKeyboardInput = (text) => {
        setContribution(text);
    };

    const handleStylusInput = (imageData) => {
        setContribution(imageData);
    };

    // Gestionnaire de soumission modifié pour communiquer avec le serveur
    const handleSubmit = async () => {
        if (!contribution.trim() || !selectedType || !sessionInfo?.sessionId) return;

        setIsSubmitting(true);
        try {
            const newContribution = {
                content: contribution,
                type: selectedType,
                timestamp: new Date().toISOString(),
                inputMethod: inputMethod,
                sessionId: sessionInfo.sessionId,
                toolId: toolId
            };

            // Envoyer au serveur
            const response = await fetch(`/api/sessions/${sessionInfo.sessionId}/contributions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContribution)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi de la contribution');
            }

            const savedContribution = await response.json();

            // Ajouter à l'historique local
            setContributions(prev => [savedContribution, ...prev]);

            // Réinitialiser le formulaire
            setContribution('');
            setSelectedType(null);
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            alert('Erreur lors de l\'envoi de la contribution');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Le rendu des méthodes de saisie reste le même...
    const renderInputMethod = () => {
        // ... code existant ...
    };

    // L'historique est maintenant un composant séparé
    const renderHistory = () => {
        if (!showHistory) return null;

        return (
            <ContributionHistory 
                contributions={contributions}
                contributionTypes={contributionTypes}
            />
        );
    };

    // Vérification de la session
    if (!sessionInfo?.sessionId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-600">Session invalide</div>
            </div>
        );
    }

    // Le reste du rendu reste le même, mais ajoutons des informations de session
    return (
        <div className="max-w-md mx-auto p-4">
            {/* En-tête avec info session */}
            <div className="text-center mb-6">
                <h1 className="text-xl font-semibold mb-2">Contribution AFOM</h1>
                <p className="text-sm text-gray-600">Session: {sessionInfo.projectName || 'Sans titre'}</p>
                <p className="text-xs text-gray-500">ID: {sessionInfo.sessionId}</p>
            </div>

            {/* Le reste du JSX reste identique */}
            {/* ... */}
        </div>
    );
};

export default AFOMInterface;