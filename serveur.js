const path = require('path');
const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = 8083;

// Configuration CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Fonction pour obtenir l'IP locale
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const ifname of Object.keys(interfaces)) {
        for (const iface of interfaces[ifname]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// Route API qui renvoie uniquement l'IP
app.get('/get-local-ip', (req, res) => {
    try {
        const ipAddress = getLocalIpAddress();
        console.log('IP demandée:', ipAddress);
        // Envoyer une réponse JSON valide
        res.json({ ip: ipAddress });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
    const ipAddress = getLocalIpAddress();
    console.log('\n=== Serveur API démarré sur le port', PORT, '===');
    console.log('IP locale:', ipAddress);
    console.log('===================\n');
});