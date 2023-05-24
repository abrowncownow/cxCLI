import Customer from './models/customer.js'
export async function getAllCustomers() {
    return Customer.find({}).exec();
};

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

export async function deleteCustomer(name) {
    return Customer.findOneAndDelete({ name: name }).exec();
};