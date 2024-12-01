import React from 'react';
import { useLocation } from 'react-router-dom';

const ParticipantLayout = ({ children }) => {
    const location = useLocation();
    console.log('ParticipantLayout - Current location:', location);

    return (
        <div style={{ 
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <header style={{
                    backgroundColor: 'white',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#2563eb'
                    }}>
                        Interface Participant
                    </h1>
                </header>

                <main style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ParticipantLayout;