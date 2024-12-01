const fs = require('fs').promises;

async function createReorganizeScript() {
    const scriptContent = `const fs = require('fs').promises;
const path = require('path');

// Structure cible du projet
const projectStructure = {
    'src': {
        'components': {
            'common': {
                'Header.js': async (srcPath, destPath) => {
                    await moveFile(
                        path.join(srcPath, 'components/ui/Header.js'),
                        destPath
                    );
                },
                'Loading.js': async (destPath) => {
                    await createFile(destPath, \`
import React from 'react';

const Loading = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
);

export default Loading;
                    \`);
                }
            },
            'moderator': {
                'tools': {},
                'SessionConfig.js': async (srcPath, destPath) => {
                    await moveFile(
                        path.join(srcPath, 'components/SessionConfig.js'),
                        destPath
                    );
                }
            },
            'participant': {
                'toolInterface': {
                    'AFOMInterface.js': async (srcPath, destPath) => {
                        await moveFile(
                            path.join(srcPath, 'components/Participant/toolInterface/AFOMInterface.js'),
                            destPath
                        );
                    },
                    'ArbreInterface.js': async (srcPath, destPath) => {
                        await moveFile(
                            path.join(srcPath, 'components/Participant/toolInterface/ArbreInterface.js'),
                            destPath
                        );
                    }
                }
            }
        },
        'routes': {
            'ModeratorRoute.js': async (destPath) => {
                await createFile(destPath, \`
import React from 'react';
import SessionConfig from '../components/moderator/SessionConfig';
import MainContent from '../components/moderator/MainContent';

const ModeratorRoute = () => {
    return <MainContent />;
};

export default ModeratorRoute;
                \`);
            },
            'ParticipantRoute.js': async (srcPath, destPath) => {
                await moveFile(
                    path.join(srcPath, 'components/routes/ParticipantRoute.js'),
                    destPath
                );
            }
        },
        'utils': {
            'api.js': async (destPath) => {
                await createFile(destPath, \`
const API_URL = process.env.API_URL || 'http://localhost:8083';

export const fetchSession = async (sessionId) => {
    try {
        const response = await fetch(\`\${API_URL}/api/sessions/\${sessionId}\`);
        if (!response.ok) throw new Error('Session non trouvée');
        return await response.json();
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
};
                \`);
            }
        }
    }
};

// Fonctions utilitaires
async function moveFile(sourcePath, destPath) {
    try {
        const content = await fs.readFile(sourcePath, 'utf-8');
        await fs.writeFile(destPath, content);
    } catch (error) {
        console.error(\`Erreur lors du déplacement de \${sourcePath}:\`, error);
    }
}

async function createFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content.trim());
    } catch (error) {
        console.error(\`Erreur lors de la création de \${filePath}:\`, error);
    }
}

async function createStructure(basePath, structure, currentPath = '') {
    for (const [name, content] of Object.entries(structure)) {
        const fullPath = path.join(basePath, currentPath, name);
        
        if (typeof content === 'function') {
            await content(basePath, fullPath);
        } else if (typeof content === 'object') {
            await fs.mkdir(fullPath, { recursive: true });
            await createStructure(basePath, content, path.join(currentPath, name));
        }
    }
}

async function reorganizeProject() {
    const projectRoot = process.cwd();
    const backupDir = path.join(projectRoot, 'backup_src');
    const srcDir = path.join(projectRoot, 'src');

    try {
        console.log('Création de la sauvegarde...');
        await fs.rename(srcDir, backupDir);

        console.log('Création de la nouvelle structure...');
        await createStructure(projectRoot, { src: projectStructure });

        console.log('Réorganisation terminée !');
        console.log('Sauvegarde dans backup_src/');

    } catch (error) {
        console.error('Erreur lors de la réorganisation:', error);
        try {
            await fs.rm(srcDir, { recursive: true, force: true });
            await fs.rename(backupDir, srcDir);
            console.log('Restauration effectuée');
        } catch (restoreError) {
            console.error('Erreur lors de la restauration:', restoreError);
        }
    }
}

reorganizeProject().catch(console.error);`;

    try {
        await fs.writeFile('create-reorganize-script.js', `
// Ce script crée reorganize-project.js
const fs = require('fs').promises;

async function createScript() {
    const scriptContent = ${JSON.stringify(scriptContent)};
    await fs.writeFile('reorganize-project.js', scriptContent);
    console.log('Script de réorganisation créé !');
}

createScript().catch(console.error);
        `);

        console.log('Créez maintenant le script de réorganisation avec :');
        console.log('node create-reorganize-script.js');
        console.log('Puis exécutez-le avec :');
        console.log('node reorganize-project.js');

    } catch (error) {
        console.error('Erreur lors de la création du script :', error);
    }
}

createReorganizeScript().catch(console.error);