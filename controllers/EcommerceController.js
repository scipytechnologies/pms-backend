const Ecommerce = require("../models/EcommerceSchema")
const Pump = require("../models/PumpSchema")
module.exports = {
    createEcommerce: async (req, res) => {
        const { SalesId, GST,PumpId,TotalSaleAmount, EcommerceSale } = req.body
        try {
            const result = await Ecommerce.create({
                SalesId,
                GST,
                PumpId,
                TotalSaleAmount,
                EcommerceSale
            })
            try {
                await Pump.findByIdAndUpdate(req.params.id, {
                    $push: {
                        Ecommerce: {
                            ID: result._id,
                            Date: result.Date,
                            SalesId: result.SalesId,
                            TotalSaleAmount: result.TotalSaleAmount,
                        },
                    },
                });
                res.status(200).json(result)
            }
            catch (err) {
                res.status(401).json({ err })
            }
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },
    getEcommerce: async (req, res) => {
        try {
            const result1 = await Ecommerce.find()
            res.status(200).json({ result1 })
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },
    getByIdEcommerce: async (req, res) => {
        try {
            const id = req.params.id
            const result2 = await Ecommerce.findById(id)
            res.status(200).json({ result2 })
        }
        catch (err) {
            res.status(400).json({ err })
        }
    }
}