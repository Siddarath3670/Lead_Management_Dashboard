const Lead = require('../models/Lead');

// @desc    Get all leads with search, filter, sort, pagination
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
    try {
        const { search, status, sort, page = 1, limit = 10 } = req.query;

        const query = {};

        // Search (Name or Email)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        // Filter by Status
        if (status && status !== 'All') {
            query.status = status;
        }

        // Sorting
        let sortOption = { createdAt: -1 }; // Default: Newest first
        if (sort) {
            const [field, order] = sort.split(':');
            sortOption = { [field]: order === 'desc' ? -1 : 1 };
        }

        const count = await Lead.countDocuments(query);
        const leads = await Lead.find(query)
            .sort(sortOption)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        res.json({
            leads,
            page: Number(page),
            pages: Math.ceil(count / Number(limit)),
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single lead details
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (lead) {
            res.json(lead);
        } else {
            res.status(404).json({ message: 'Lead not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get analytics metrics
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const convertedLeads = await Lead.countDocuments({ status: 'Closed' });

        const leadsByStatus = await Lead.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        res.json({
            totalLeads,
            convertedLeads,
            leadsByStatus,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getLeads, getLeadById, getDashboardStats };
