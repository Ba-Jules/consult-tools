const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require(path.join(__dirname, 'config', 'database.js'));
const Session = require('./models/Session');

const app = express();
const PORT = process.env.PORT || 8083;

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8083'],
    credentials: true
}));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Route pour récupérer une session
app.get('/api/sessions/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    try {
        console.log('Recherche de la session:', sessionId);
        // Ajout des logs pour debug
        console.log('Critères de recherche:', { sessionId: sessionId });

        const session = await Session.findOne({
            sessionId: sessionId
        }).exec();

        // Log du résultat pour debug
        console.log('Résultat de la recherche:', session);

        if (session) {
            console.log('Session trouvée');
            res.json({ valid: true, session });
        } else {
            console.log('Session non trouvée');
            res.status(404).json({ valid: false, error: 'Session non trouvée' });
        }
    } catch (error) {
        console.error('Erreur lecture session:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour créer une nouvelle session
app.post('/api/sessions', async (req, res) => {
    try {
        const sessionData = {
            ...req.body,
            sessionId: `session-${Date.now()}`,
            createdAt: new Date()
        };

        const session = new Session(sessionData);
        await session.save();

        console.log('Nouvelle session créée:', session.sessionId);
        res.status(201).json(session);
    } catch (error) {
        console.error('Erreur création session:', error);
        res.status(500).json({ error: 'Erreur création session' });
    }
});

// Route pour ajouter un participant
app.post('/api/sessions/:sessionId/participants', async (req, res) => {
    const { sessionId } = req.params;
    const participant = {
        ...req.body,
        id: `participant-${Date.now()}`,
        joinedAt: new Date()
    };

    try {
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(404).json({ error: 'Session non trouvée' });
        }

        session.participants.push(participant);
        await session.save();

        res.status(201).json(participant);
    } catch (error) {
        console.error('Erreur ajout participant:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour enregistrer une contribution
app.post('/api/sessions/:sessionId/tools/:toolId/contributions', async (req, res) => {
    const { sessionId, toolId } = req.params;
    const contribution = {
        ...req.body,
        toolType: toolId,
        timestamp: new Date()
    };

    try {
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(404).json({ error: 'Session non trouvée' });
        }

        if (!session.contributions) {
            session.contributions = new Map();
        }

        if (!session.contributions.get(toolId)) {
            session.contributions.set(toolId, []);
        }

        session.contributions.get(toolId).push(contribution);
        await session.save();

        res.status(201).json(contribution);
    } catch (error) {
        console.error('Erreur enregistrement contribution:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour l'interface participant
app.get('/api/participant/:sessionId/:toolId/access', async (req, res) => {
    const { sessionId, toolId } = req.params;
    try {
        const session = await Session.findOne({ sessionId });

        if (!session) {
            return res.status(404).json({
                valid: false,
                error: 'Session non trouvée ou expirée'
            });
        }

        if (!session.selectedTools.includes(toolId)) {
            return res.status(404).json({
                valid: false,
                error: 'Outil non disponible pour cette session'
            });
        }

        res.json({
            valid: true,
            sessionInfo: {
                sessionId: session.sessionId,
                projectName: session.projectName,
                toolId,
                remainingTime: session.remainingTime
            }
        });
    } catch (error) {
        console.error('Erreur accès participant:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Routes pour servir l'application React
app.get('/moderator/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/participant/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Route fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, async () => {
    try {
        console.log(`
=== Serveur démarré ===
- Local:            http://localhost:${PORT}
- Interface modérateur: http://localhost:${PORT}/moderator
- CORS activé pour: http://localhost:3000, http://localhost:${PORT}
- MongoDB:          Connecté
=====================
        `);
    } catch (error) {
        console.error('Erreur au démarrage:', error);
    }
});