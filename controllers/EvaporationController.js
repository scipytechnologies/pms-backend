const EvaporationSchema = require("../models/EvaporationSchema")
const Pump = require("../models/PumpSchema")

module.exports = {
    createEvaporation: async (req, res) => {
        const { Tank, Tankid, InitialQuantity, ActualQuantity, Missing, Date, TestedBy } = req.body
        try {
            const result = await EvaporationSchema.create({
                Tank, Tankid, InitialQuantity, ActualQuantity, Missing, Date, TestedBy
            })
            try {
                await Pump.findByIdAndUpdate(req.params.id, {
                    $push: {
                        Evaporation: [{
                            EvaporationId: result._id,
                            Tank: result.Tank,
                            Date: result.Date,
                            InitialQuantity: result.InitialQuantity,
                            ActualQuantity: result.ActualQuantity,
                            TestedBy: result.TestedBy,
                            Missing: result.Missing
                        }]
                    }
                })
                res.status(200).json("success")
            }
            catch (err) {
                res.status(401).json({ err })
            }
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },
    getEvaporation: async (req, res) => {
        try {
            const result1 = await EvaporationSchema.find()
            res.status(200).json({ result1 })
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },
    getEvaporationById: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await EvaporationSchema.findById(id)
            res.status(200).json({ result2 })
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },
    editEvaporation: async (req, res) => {
        const id = req.params.id
        const { Tank, Tankid, InitialQuantity, ActualQuantity, Missing, Date, TestedBy } = req.body
        try {
            await EvaporationSchema.findByIdAndUpdate(id, {
                Tank,
                Tankid,
                InitialQuantity,
                ActualQuantity,
                Missing,
                Date,
                TestedBy
            })
            res.status(200).json("Updated Successfully")
        }
        catch (err) {
            res.status(400).json({ err })
        }
    },
    deleteEvaporation: async (req, res) => {
        const id = req.params.id
        const pumpid = req.params.pumpid
        try {
            const deletedEvaporation = await EvaporationSchema.findByIdAndDelete(id)
            if (!deletedEvaporation) {
                res.status(500).json("Evaporation Not Found")
            }
            try {
                const updatedEvaporation = await Pump.findByIdAndUpdate(
                    pumpid,
                    {
                        $pull: {
                            Evaporation: {
                                EvaporationId: deletedEvaporation._id
                            }
                        }
                    }
                )
                if (!updatedEvaporation) {
                    res.status(404).json("No Evaporation Found")
                }
                res.status(200).json("Deleted")
            }
            catch (err) {
                res.status(401).json({ err })
            }
        }
        catch (err) {
            res.status(400).json({ err })
        }
    }
}