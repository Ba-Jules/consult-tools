// src/components/Participant/ParticipantError.js
import React from 'react';
import { Link } from 'react-router-dom';

const ParticipantError = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full text-center space-y-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Accès non disponible
                </h1>
                <p className="text-gray-600 mb-4">
                    Cette session n'est pas accessible ou a expiré.
                </p>
                <Link
                    to="/"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
};

export default ParticipantError;