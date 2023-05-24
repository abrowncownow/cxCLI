import inquirer from 'inquirer';
import mongoose from 'mongoose';
import Customer from './models/customer.js';
import { config } from 'dotenv';
config();
import * as inquirerFunctions from './inquirerFunctions.js';
import * as dbOperations from './databaseOperations.js';


// const inquirer = require('inquirer');
// const mongoose = require('mongoose');
// const Customer = require('./models/customer.js');
// require('dotenv').config();
// const inquirerFunctions = require('./inquirerFunctions');
// const dbOperations = require('./databaseOperations');


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
            const name = await inquirerFunctions.getCustomerByName();
            console.log (name);
            const customer = await dbOperations.findCustomersByName(name);
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
            // TODO: Ask for the customer's name/ID, then ask for the updated information and update the Customer document
            break;
        case 'Delete Customer':
            // TODO: Ask for the customer's name/ID, then delete the Customer document
            break;
        case 'Exit':
            process.exit();
        default:
            console.log('Invalid choice');
            break;

    }
}

menu();