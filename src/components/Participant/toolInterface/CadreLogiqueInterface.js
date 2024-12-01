import React from 'react';

const CadreLogiqueInterface = ({ sessionInfo }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <h1 className="text-2xl font-bold mb-4">Interface Cadre Logique</h1>
            <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600">
                    Interface en cours de développement
                </p>
                {sessionInfo && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            Session ID: {sessionInfo.sessionId}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CadreLogiqueInterface;