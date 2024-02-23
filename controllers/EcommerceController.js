const Ecommerce = require("../models/EcommerceSchema");
const Pump = require("../models/PumpSchema");
module.exports = {
  createEcommerce: async (req, res) => {
    const { SalesId, GST, PumpId, TotalSaleAmount, EcommerceSale } = req.body;
    let serialNumber = 10000;
    try {
      const latestCustomer = await Ecommerce.findOne({
        PumpId: req.params.id,
      })
        .sort({ createdAt: -1 })
        .limit(1);

      if (latestCustomer.serialNumber != undefined && latestCustomer) {
        serialNumber = parseInt(latestCustomer.serialNumber) + 1;
      }
      console.log(latestCustomer.serialNumber);
    } catch (err) {
      console.log("NO DATA");
    }
    try {
      const result = await Ecommerce.create({
        SalesId,
        GST,
        PumpId,
        TotalSaleAmount,
        EcommerceSale,
        serialNumber,
        PumpId: req.params.id,
      });
      try {
        await Pump.findByIdAndUpdate(req.params.id, {
          $push: {
            Ecommerce: {
              ID: result._id,
              Date: result.Date,
              SalesId: result.SalesId,
              TotalSaleAmount: result.TotalSaleAmount,
              serialNumber
            },
          },
        });
        res.status(200).json(result);
      } catch (err) {
        res.status(401).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getEcommerce: async (req, res) => {
    try {
      const result1 = await Ecommerce.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getByIdEcommerce: async (req, res) => {
    try {
      const id = req.params.id;
      const result2 = await Ecommerce.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
