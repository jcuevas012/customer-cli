const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.Promise = global.Promise

const db = mongoose.connect('mongodb://localhost:27017/customercli', {useMongoClient: true})


db.on('error', (err) => {
    console.log(chalk.red('Something went wrong '+err))
    process.exit(0)
})

const Customer = require('./models/customer')

// add customer

const addCustomer = async(customer) => {
    try {
        const created = await Customer.create(customer)
        console.info(chalk.green('New customer added.'))
        db.close()
    } catch (error) {
        return new Error(error.message)
    }
}

// find customer

const findCustomer = async(name) => {
    try {
        let search = new RegExp(name, 'i')
        const found = await Customer.find({
            $or: [
                {
                    firstName: search
                }, {
                    lastName: search
                }
            ]
        })
        console.info(JSON.stringify(found))
        db.close()
    } catch (error) {
        return new Error(error.message)
    }
}

const updateCustomer = async (_id, data ) => {
    try {
        let rs = await Customer.update({ _id }, data)
        db.close()
        console.log(chalk.green('Customer updated !'))
        console.log(JSON.stringify(rs))
        process.exit(0)
    } catch (e) {
        return new Error(e)
    }
}

const removeCustomer = async (_id) => {
    try {
        let rs = await Customer.findByIdAndRemove({ _id })
        db.close()
        console.log(chalk.green('Customer Removed !'))
    } catch (e) {
        return new Error(e)
    }
}

const listCustomer = async () => {
    try {
        let rs = await Customer.find()
        console.info(JSON.stringify(rs))
        db.close()
        console.info(JSON.stringify(rs))
    } catch (e) {
        return new Error(e)
    }
}
        

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}