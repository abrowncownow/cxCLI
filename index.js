import inquirer from 'inquirer';
import mongoose from 'mongoose';
import Customer from './models/customer.js';
import { config } from 'dotenv';
config();
import * as inquirerFunctions from './inquirerFunctions.js';
import * as dbOperations from './databaseOperations.js';


mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

async function menu(){
    const answers = await inquirer.prompt([{
        name: 'choice',
        type: 'list',
        choices: ['View All Customers', 'Search Customer By Name', 'New Customer', 'Update Customer', 'Delete Customer', 'Exit'],
        message: 'What would you like to do?'
    }]);
    switch (answers.choice){
        case 'View All Customers':
            const customers = await dbOperations.getAllCustomers();
            console.log(customers);
            menu();
            break;
        case 'Search Customer By Name':
            const id = await inquirerFunctions.getCustomerName();
            const customer = await dbOperations.findCustomerById(id);
            console.log(customer);
            menu();
            break;
        case 'New Customer':
            const newCustomerData = await inquirerFunctions.getCustomerContact();
            const newCustomer = await dbOperations.createCustomer(newCustomerData);
            console.log('Created new customer:', newCustomer);
            menu();
            break;
        case 'Update Customer':
            const idToUpdate = await inquirerFunctions.getCustomerName();
            const customerToUpdate = await dbOperations.findCustomerById(idToUpdate);
            const updateChoice = await inquirerFunctions.updateCustomerMenu();
            switch (updateChoice.choice) {
                case 'Update Contact Info':
                    const updatedContactInfo = await inquirerFunctions.getCustomerContact(customerToUpdate);
                    // Call a dbOperations function to update the customer in the database
                    await dbOperations.updateCustomerContact(idToUpdate, updatedContactInfo);
                    menu();
                    break;
                case 'Add Backup Config':
                    const newBackupConfig = await inquirerFunctions.getBackupConfig();
                    // Call a dbOperations function to update the customer in the database
                    console.log('New config saved');
                    console.log(newBackupConfig);
                    console.log('updating db...')
                    await dbOperations.updateCustomerBackupConfig(idToUpdate, newBackupConfig);
                    console.log('update completed');
                    menu();
                    break;

                case 'Add Payment Details':
                    const newPaymentDetails = await inquirerFunctions.getPaymentDetails();
                    // Call a dbOperations function to update the customer in the database
                    await dbOperations.updateCustomerPaymentDetails(idToUpdate, newPaymentDetails);
                    menu();
                    break;
                case 'Add Contract':
                    const newContract = await inquirerFunctions.getContract();
                    // Call a dbOperations function to update the customer in the database
                    await dbOperations.addCustomerContract(idToUpdate, newContract);
                    menu();
                    break;
            }
            break;
        case 'Delete Customer':
            const idToDelete = await inquirerFunctions.getCustomerName();
            const customerToDelete = await dbOperations.findCustomerById(idToDelete);
            console.log("Do you want to delete this customer:");
            console.log(customerToDelete);
            const confirmDelete = await inquirerFunctions.deleteCustomerConfirm();
            if (confirmDelete.name === customerToDelete.name){
                await dbOperations.deleteCustomer(idToDelete);
                console.log(`Customer '${customerToDelete.name}' deleted!!!`);
            } else{
                console.log('Name entered does not match customer name. Returning to menu');
            }
            menu();
            break;
        case 'Exit':
            process.exit();
        default:
            console.log('Invalid choice');
            break;

    }
}

menu();