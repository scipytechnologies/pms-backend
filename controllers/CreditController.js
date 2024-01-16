const Credit = require("../models/CreditSalesSchema")
const Pump = require("../models/PumpSchema")
module.exports = {
    createCredit: async (req, res) => {
        const { Token, VehicleNumber, Product, Quantity, Price, Amount, Status } = req.body;
        try {
            const result = await Credit.create({
                Token,
                VehicleNumber,
                Product,
                Quantity,
                Price,
                Amount,
                Status
            })

            try {
                await Pump.findByIdAndUpdate(req.params.id, {
                    $push: {
                        CreditSales: [{
                            CreditId: result._id,
                            Token: result.Token
                        }]
                    }
                })
                res.status(200).json("success")
            }
            catch (err) {
                res.status(401).json({ err });
            }

        }
        catch (err) {
            res.status(400).json({ err })
        }

    },

    getCredit: async (req, res) => {
        const id = req.params.id
        try {
            const result1 = await Credit.find()
            res.status(200).json({ result1 });
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },

    getCreditById: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Credit.findById(id)
            res.status(200).json({ result2 })
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },

    updateCredit: async (req, res) => {
        const id = req.params.id
        const { Token, VehicleNumber, Product, Quantity, Price, Amount, Status } = req.body;
        try {
            await Credit.findByIdAndUpdate(id, {
                Token,
                VehicleNumber,
                Product,
                Quantity,
                Price,
                Amount,
                Status
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },

    deleteCredit: async (req, res) => {
        const pumpId = req.params.pumpId
        const creditId = req.params.creditId
        try {
            const deletedCredit = await Credit.findByIdAndDelete(creditId)
            if (!deletedCredit) {
                return res.status(404).json({ error: "Credit you want to delete is not found" })
            }
            const pumpupdate = await Pump.findByIdAndUpdate(
                pumpId,
                {
                    $pull: {
                        CreditSales: { CreditId: deletedCredit._id }
                    }
                }
            );
            if (!pumpupdate) { 
                return res.status(404).json({ error: "Failed to update pump" })
            }
            res.status(200).json({ deletedCredit })
        }
        catch (err) {
            res.status(400).json({ err })
        }
    }

}