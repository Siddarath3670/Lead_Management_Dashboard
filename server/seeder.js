const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const User = require('./models/User');
const Lead = require('./models/Lead');

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();

    try {
        await Lead.deleteMany();
        await User.deleteMany();

        // Create Admin User
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
        });

        await adminUser.save();
        console.log('Admin user created: admin@example.com / password123');

        // Create Dummy Leads
        const leads = [];
        const statuses = ['New', 'Engaged', 'Proposal', 'Closed', 'Lost'];

        for (let i = 0; i < 500; i++) {
            leads.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                company: faker.company.name(),
                source: faker.helpers.arrayElement(['Website', 'Referral', 'LinkedIn', 'Ads']),
                score: Math.floor(Math.random() * 100),
                createdAt: faker.date.past(),
            });
        }

        await Lead.insertMany(leads);
        console.log('500 Dummy Leads Imported!');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();
