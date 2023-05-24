import inquirer from 'inquirer';

export async function getCustomerByName() {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the name of the customer: '
    }]);
};

export async function getNewCustomerData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new customer: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email of the new customer: '
        }
        // add more prompts here for additional fields as needed
    ]);
};