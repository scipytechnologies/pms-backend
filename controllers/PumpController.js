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
            res.status(200).json({ customerResult });
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
            res.status(200).json({ dipStockResult });
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
            res.status(200).json({ employeeResult });
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
            res.status(200).json({ inventoryManagementResult });
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
            res.status(200).json({ productResult });
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
            res.status(200).json({ salesAndBillingResult });
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
    getFuel: async (req, res) => {
        const id = req.params.id
        console.log("hifuel", id)
        try {
            const result2 = await Pump.findById(id)
            const FuelResult = result2.Fuel
            res.status(200).json({ FuelResult })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    editFuel: async (req, res) => {
        const pumpId = req.params.pumpId;
        const fuelId = req.params.fuelId;

        try {
            const result = await Pump.findOneAndUpdate(
                { _id: pumpId, 'Fuel._id': fuelId },
                {
                    $set: {
                        'Fuel.$.FuelName': req.body.FuelName,
                        'Fuel.$.FuelPricePerLitre': req.body.FuelPricePerLitre,
                    },
                },
                // { new: true } 
            );

            console.log('fueledit:', result);

            if (!result) {
                return res.status(404).json({ error: 'Pump or Fuel not found' });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteFuel: async (req, res) => {
        const pumpId = req.params.pumpId;
        const fuelId = req.params.fuelId;

        try {
            const result = await Pump.findOneAndUpdate(
                { _id: pumpId },
                {
                    $pull: {
                        Fuel: { _id: fuelId },
                    },
                },
            );

            console.log('fuel delete result:', result);

            if (!result) {
                return res.status(404).json({ error: 'Pump or Fuel not found' });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createShift: async (req, res) => {
        const id = req.params.id
        try {
            await Pump.findByIdAndUpdate(id, {
                $push: {
                    Shift: req.body.Shift
                }
            })
            res.status(200).json("success")
        }
        catch (error) {
            res.status(400).json(error)
        }
    },
    getShift: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Pump.findById(id)
            const Final = result2.Shift
            res.status(200).json({ Final })
        }
        catch (error) {
            res.status(400).json(error)
        }

    },
    editShift: async (req, res) => {
        const pumpId = req.params.pumpId
        const shiftId = req.params.shiftId
        console.log("pump", pumpId)
        console.log("shift", shiftId)
        try {
            const result = await Pump.findOneAndUpdate(
                { _id: pumpId, 'Shift._id': shiftId },
                {
                    $set: {
                        'Shift.$.ShiftName': req.body.ShiftName,
                        'Shift.$.To': req.body.To,
                        'Shift.$.From': req.body.From,
                    },
                },
            )
            console.log("hello", result)
            res.status(200).json("successfully updated")
        }
        catch (error) {
            res.status(400).json(error)

        }
    },
    deleteShift: async (req, res) => {
        const pumpId = req.params.pumpId
        const shiftId = req.params.shiftId
        try {
            const result = await Pump.findOneAndUpdate(
                { _id: pumpId },
                {
                    $pull: {
                        Shift: { _id: shiftId },
                    }
                },
            )
            res.status(200).json(result)
        }
        catch (error) {
            res.status(400).json(error)
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
    getNozzle: async (req, res) => {
        const id = req.params.id
        console.log("hinozzle", id)
        try {
            const result2 = await Pump.findById(id)
            const NozzleResult = result2.Nozzle
            res.status(200).json({ NozzleResult })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    createCardPayment: async (req, res) => {
        const id = req.params.id
        console.log("backid", id)
        console.log("backdata", req.body)
        try {
            const updatecard = await Pump.findByIdAndUpdate(id, {
                $push: {
                    CardPayment: req.body.CardPayment
                }
            });

            if (!updatecard) {
                return res.status(404).json({ error: 'Pump not found' });
            }
            res.status(200).json({ success: true });
            console.log("updatedcard", updatecard)
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
                Tank: req.body.Tank,
                Employee: req.body.Employee,
                Fuel: req.body.Fuel,
                Customer: req.body.Customer,
                InventoryManagement: req.body.InventoryManagement,
                Product: req.body.Product,
                SalesAndBilling: req.body.SalesAndBilling,
                DipStock: req.body.DipStock,
                Nozzle: req.body.Nozzle,
                CardPayment: req.body.CardPayment,
                UPIPayment: req.body.UPIPayment,
                OtherPayment: req.body.OtherPayment
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
