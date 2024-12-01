import React from 'react';

const TestInterface = ({ sessionInfo, toolId }) => {
    console.log('TestInterface rendu avec:', { sessionInfo, toolId });
    return (
        <div style={{ 
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1 style={{ 
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#2563eb'
            }}>
                Interface Test
            </h1>

            <div style={{
                backgroundColor: '#f3f4f6',
                padding: '16px',
                borderRadius: '4px',
                marginBottom: '16px'
            }}>
                <h2 style={{ 
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '12px'
                }}>
                    Session Info
                </h2>
                <div>
                    <p>Session ID: {sessionInfo?.sessionId || 'N/A'}</p>
                    <p>Projet: {sessionInfo?.projectName || 'N/A'}</p>
                    <p>Outil: {toolId || 'N/A'}</p>
                </div>
            </div>

            <pre style={{
                backgroundColor: '#eef2ff',
                padding: '16px',
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
            }}>
                {JSON.stringify({ sessionInfo, toolId }, null, 2)}
            </pre>
        </div>
    );
};

export default TestInterface;