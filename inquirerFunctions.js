import inquirer from 'inquirer';
import * as dbOperations from './databaseOperations.js';
//Get Customer By Name Prompt
export async function getCustomerName() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the customer you want to find: '
        }
    ]);
    const matchingCustomers = await dbOperations.findCustomersByName(answers.name);
    if (matchingCustomers.length === 0) {
        console.log(`No customers found with name ${answers.name}`);
        // You might want to loop back to the start of the menu here
        return getCustomerName();
    } else if (matchingCustomers.length === 1) {
        // If there's only one match, just return that one
        return matchingCustomers[0]._id;
    } else {
        // If there's more than one match, we need to ask the user to choose one
        return await selectCustomerFromList(matchingCustomers);
    }
};
//create a list if multiple customers are returned from one name
export async function selectCustomerFromList(customers) {
    const customerChoices = customers.map(customer => {
        return {
            name: `${customer.name} (${customer.email}, ${customer.phone})`, // This will be displayed in the list
            value: customer._id // This will be the value returned when this option is chosen
        };
    });
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'customerId',
            message: 'Multiple customers found. Please choose one from the list: ',
            choices: customerChoices
        }
    ]);
    return answers.customerId;
}
// Get Customer Contact
export async function getCustomerContact(existingCustomer = {}) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the customer: ',
            default: existingCustomer.name || ''
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email of the customer: ',
            default: existingCustomer.email || '',
            validate: function(value) {
                var pass = value.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }

                return 'Please enter a valid email';
            }
        },
        {
            type: 'input',
            name: 'phone',
            message: 'Enter the phone number of the customer (in the format xxx-xxx-xxxx): ',
            default: existingCustomer.phone || '123-456-7890',
            validate: function(value) {
                var pass = value.match(
                    /^\d{3}-\d{3}-\d{4}$/
                );
                if (pass) {
                    return true;
                }

                return 'Please enter a valid phone number in the format xxx-xxx-xxxx';
            }
        },
        {
            type: 'input',
            name: 'address',
            message: 'Enter the address of the customer: ',
            default: existingCustomer.address || ''
        }
    ]);
};
//update Menu
export async function updateCustomerMenu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to update?',
            choices: ['Update Contact Info', 'Add Backup Config', 'Add Payment Details', 'Add Contract']
        }
    ]);
}

export async function getBackupConfig() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'machineDetails',
            message: 'Enter the machine details for backup: '
        },
        {
            type: 'input',
            name: 'backupSchedule',
            message: 'Enter the backup schedule: '
        },
        {
            type: 'number',
            name: 'dataSize',
            message: 'Enter the data size in GB: ',
            default: '500',
            validate: function (value) {
                if (Number.isInteger(value) && value > 0) {
                    return true;
                }
                return 'Please enter a valid data size in GB (e.g., 500)';
            }
        },
        {
            type: 'date',
            name: 'lastBackup',
            message: 'Enter the last backup date: ',
            default: `${new Date().toLocaleDateString('en-US')}`,
            validate: function (value) {
                if (isNaN(Date.parse(value))) {
                    return 'Please enter a valid date format';
                }
                return true;
            }
        },
        {
            type: 'date',
            name: 'nextBackup',
            message: 'Enter the next backup date: ',
            validate: function (value) {
                if (isNaN(Date.parse(value))) {
                    return 'Please enter a valid date format';
                }
                return true;
            }
        }
    ]);
}

export async function getPaymentDetails() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'status',
            message: 'Enter the payment status: '
        },
        {
            type: 'input',
            name: 'lastPayment',
            message: 'Enter the last payment date: '
        },
        {
            type: 'input',
            name: 'nextPayment',
            message: 'Enter the next payment date: '
        },
        {
            type: 'input',
            name: 'totalPaid',
            message: 'Enter the total amount paid: '
        }
    ]);
}

export async function getContract() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'startDate',
            message: 'Enter the contract start date: '
        },
        {
            type: 'input',
            name: 'endDate',
            message: 'Enter the contract end date: '
        },
        {
            type: 'input',
            name: 'serviceLevel',
            message: 'Enter the service level: '
        }
    ]);
}

export async function deleteCustomerConfirm() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'To confirm you wish to delete this customer, enter their name.'
        }
    ]);
}
