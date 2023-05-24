import inquirer from 'inquirer';


//Get Customer By Name Prompt
export async function getCustomerByName() {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the name of the customer: '
    }]);
};
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
