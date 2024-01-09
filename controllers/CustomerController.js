const Customer = require("../models/CustomerSchema")
const Pump = require("../models/PumpSchema")
module.exports = {
    createCustomer: async (req, res) => {
        const { Name, Address, MobileNo, GSTIN, OfficePhoneNo, EmailID, CreditBalance, CreditLimit,
            Note } = req.body;
        try {
            const result = await Customer.create({
                Name,
                Address,
                MobileNo,
                GSTIN,
                OfficePhoneNo,
                EmailID,
                CreditBalance,
                CreditLimit,
                Note
            });
            try {
                await Pump.findByIdAndUpdate(req.params.id, {
                    $push: {
                        Customer: [{
                            CustomerId: result._id,
                            CustomerName: result.Name
                        }]
                    }
                });
                res.status(200).json("success");
            }
            catch (err) {
                res.status(401).json({ err });
            }

        }
        catch (err) {
            res.status(400).json({ err });
        }
    },


    getCustomer: async (req, res) => {
        const id = req.params.id
        try {
            const result1 = await Customer.find()
            res.status(200).json({ result1 });
        }
        catch (err) {
            res.status(400).json({ err });
        }
    },
    getCustomerById: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Customer.findById(id)
            res.status(200).json({ result2 });
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    updateCustomer: async (req, res) => {
        const id = req.params.id
        try {
            await Customer.findByIdAndUpdate(id, {
                Name: req.body.Name,
                Address: req.body.Address,
                MobileNo: req.body.MobileNo,
                GSTIN: req.body.GSTIN,
                OfficePhoneNo: req.body.OfficePhoneNo,
                EmailID: req.body.EmailID,
                CreditBalance: req.body.CreditBalance,
                CreditLimit: req.body.CreditLimit,
                Note: req.body.Note
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    deleteCustomer: async (req, res) => {
        const pumpId = req.params.pumpId;
        const customerId = req.params.customerId;
        try {
            const deletedCustomer = await Pump.findOneAndUpdate(
                { _id: pumpId },
                {
                    $pull: {
                        Customer: { CustomerId: customerId },
                    },
                });
            res.status(200).json({ deletedCustomer });
        }
        catch (err) {
            res.status(400).json({ err });
        }
    }
}
