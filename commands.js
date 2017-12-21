#!/usr/bin/env node
const program = require('commander')
const { prompt } = require('inquirer')
const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
} = require('./index')

const questions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter Customer First Name'

    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter Customer Last Name'

    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Customer Email'

    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter Customer Phone Number'

    }
]
// vesion document
program
    .version('1.0.0')
    .description('Customer Managment System')

//  program
//     .command('add <firstName> <lastName> <email> <phone>')
//     .alias('a')
//     .description('Add customer')
//     .action((firstName, lastName, email, phone) => {
//         addCustomer({ firstName, lastName, email, phone })
//     })   
 
//add customer
program
    .command('add')
    .alias('a')
    .description(' Add customer')
    .action(() => {
        prompt(questions).then((answers) => addCustomer(answers))
    })    

//update customer    
program
    .command('update <_id>')
    .alias('u')
    .description(' Update customer')
    .action(( _id ) => {
        prompt(questions).then((answers) => updateCustomer(_id, answers))
    })    

    //remove customer
program
    .command('remove <_id>')
    .alias('r')
    .description(' Remove customer')
    .action(( _id ) => {
         removeCustomer(_id)
    })    

    //find custumer by Name
program
    .command('find <name>')
    .alias('f')
    .description('Find customer')
    .action((name) => {
        findCustomer(name)
    })

        //find custumer by Name
program
    .command('list')
    .alias('l')
    .description('list customers')
    .action(() => {
        listCustomer()
    })


    program.parse(process.argv)