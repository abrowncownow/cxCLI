import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    backupConfig: { 
        machineDetails: String,
        backupSchedule: String, // this could be further broken down depending on how you want to handle scheduling
        dataSize: Number, // in GB or TB
        lastBackup: Date,
        nextBackup: Date
    },
    paymentDetails: {
        status: String, // paid, due, overdue, etc.
        lastPayment: Date,
        nextPayment: Date,
        totalPaid: Number
    },
    contracts: [{
        startDate: Date,
        endDate: Date,
        serviceLevel: String // gold, silver, bronze, etc.
    }]
});

export default mongoose.model('Customer', customerSchema);