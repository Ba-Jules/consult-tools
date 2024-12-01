const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
    content: String,
    type: String,
    author: String,
    toolType: String,
    timestamp: { type: Date, default: Date.now }
});

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    projectName: { type: String, required: true },
    selectedTools: [String],
    totalParticipants: Number,
    participantsExpected: Number,
    tables: Number,
    duration: {
        hours: Number,
        minutes: Number
    },
    remainingTime: Number,
    participants: [{
        id: String,
        name: String,
        joinedAt: Date
    }],
    contributions: {
        type: Map,
        of: [contributionSchema]
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'completed'],
        default: 'active'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);