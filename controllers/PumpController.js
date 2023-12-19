const Pump = require("../models/PumpSchema")
module.exports = {
    createPump: async (req, res) => {
        const { PumpName, PhoneNumber, Address, email } = req.body;
        try {
            const result = await Pump.create({
                PumpName,
                PhoneNumber,
                Address,
                email,
                Tank: [],
                Employee: [],
                Fuel: [],
                Customer: [],
                InventoryManagement: [],
                Product: [],
                SalesAndBilling: [],
                DipStock: [],
                Nozzle: [],
                CardPayment: [],
                UPIPayment: [],
                OtherPayment: []
            });
            res.status(200).json({ result });
        }
        catch (err) {
            res.status(400).json({ err });
        }
    },

    getPump: async (req, res) => {
        const id = req.params.id
        try {
            const result1 = await Pump.find()
            res.status(200).json({ result1 });
        }
        catch (err) {
            res.status(400).json({ err });
        }
    },
    getPumpById: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Pump.findById(id)
            res.status(200).json({ result2 });
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    getCustomer: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Pump.findById(id)
            const customerResult = result2.Customer
            res.status(200).json({ customerResult});
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    getDipStock: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Pump.findById(id)
            const dipStockResult = result2.DipStock
            res.status(200).json({ dipStockResult});
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    getEmployee: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Pump.findById(id)
            const employeeResult = result2.Employee
            res.status(200).json({ employeeResult});
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    getInventoryManagement: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Pump.findById(id)
            const inventoryManagementResult = result2.InventoryManagement
            res.status(200).json({ inventoryManagementResult});
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    getProduct: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Pump.findById(id)
            const productResult = result2.Product
            res.status(200).json({ productResult});
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    getSalesAndBilling: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Pump.findById(id)
            const salesAndBillingResult = result2.SalesAndBilling
            res.status(200).json({ salesAndBillingResult});
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    createTank: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndUpdate(id, {
                $push: {
                    Tank: req.body.Tank
                }
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    createFuel: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndUpdate(id, {
                $push: {
                    Fuel: req.body.Fuel
                }
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    createNozzle: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndUpdate(id, {
                $push: {
                    Nozzle: req.body.Nozzle
                }
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    createCardPayment: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndUpdate(id, {
                $push: {
                    CardPayment: req.body.CardPayment
                }
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    createUPIPayment: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndUpdate(id, {
                $push: {
                    UPIPayment: req.body.UPIPayment
                }
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    createOtherPayment: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndUpdate(id, {
                $push: {
                    OtherPayment: req.body.OtherPayment
                }
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },

    updatePump: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndUpdate(id, {
                PumpName: req.body.PumpName,
                PhoneNumber: req.body.PhoneNumber,
                Address: req.body.Address,
                email: req.body.email,
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    deletePump: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndDelete(id)
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err });
        }

    }
}
