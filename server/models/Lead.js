const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['New', 'Engaged', 'Proposal', 'Closed', 'Lost'],
        default: 'New',
    },
    company: {
        type: String,
    },
    source: {
        type: String, // e.g., Website, Referral, Ad
    },
    score: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Index for search optimization
leadSchema.index({ name: 'text', email: 'text', company: 'text' });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
