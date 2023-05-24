import Customer from './models/customer.js'
export async function getAllCustomers() {
    return Customer.find({}).exec();
};

export async function findCustomerById(id) {
    try {
        const customer = await Customer.findById(id);
        return customer;
    } catch (error) {
        console.error('Error finding customer by id:', error);
        throw error;
    }
}
export async function findCustomersByName(name) {
    const nameRegex = new RegExp(name, 'i'); // 'i' flag makes the search case insensitive
    const matchingCustomers = await Customer.find({ name: nameRegex });
    return matchingCustomers;
};

export async function createCustomer(newCustomerData) {
    const customer = new Customer(newCustomerData);
    return customer.save();
};

export async function updateCustomer(name, email) {
    return Customer.findOneAndUpdate({ name: name }, { email: email }).exec();
};

export async function deleteCustomer(idToDelete) {
    return Customer.findOneAndDelete(idToDelete).exec();
};


export async function updateCustomerContact(id, updatedContactInfo) {
    try {
        const customer = await Customer.findByIdAndUpdate(
            id,
            { $set: { name: updatedContactInfo.name, email: updatedContactInfo.email, phone: updatedContactInfo.phone, address: updatedContactInfo.address } },
            { new: true }
        );
        return customer;
    } catch (error) {
        console.error('Error updating customer contact:', error);
        throw error;
    }
}

export async function updateCustomerBackupConfig(id, newBackupConfig) {
    try {
        const customer = await Customer.findByIdAndUpdate(
            id,
            { $set: { backupConfig: newBackupConfig } },
            { new: true }
        );
        return customer;
    } catch (error) {
        console.error('Error updating customer backup config:', error);
        throw error;
    }
}

export async function updateCustomerPaymentDetails(id, newPaymentDetails) {
    try {
        const customer = await Customer.findByIdAndUpdate(
            id,
            { $set: { paymentDetails: newPaymentDetails } },
            { new: true }
        );
        return customer;
    } catch (error) {
        console.error('Error updating customer payment details:', error);
        throw error;
    }
}

export async function addCustomerContract(id, newContract) {
    try {
        const customer = await Customer.findByIdAndUpdate(
            id,
            { $push: { contracts: newContract } },
            { new: true }
        );
        return customer;
    } catch (error) {
        console.error('Error adding customer contract:', error);
        throw error;
    }
}