const SalesAndBilling = require("../models/SalesAndBillingSchema");
const Pump = require("../models/PumpSchema");
module.exports = {
  createSalesAndBilling: async (req, res) => {
    const {
      PumpId,
      Employee,
      EmployeeId,
      Shift,
      TotalAmount,
      ExcessAmount,
      Date,
      Dinomination,
      Product,
      Cardpayment,
      Upipayment,
      Otherpayment,
    } = req.body;

    try {
      const result = await SalesAndBilling.create({
        PumpId,
        Employee,
        EmployeeId,
        Shift,
        TotalAmount,
        ExcessAmount,
        Date,
        Dinomination,
        Product,
        Cardpayment, // Make sure Cardpayment is defined in req.body
        Upipayment, // Make sure Upipayment is defined in req.body
        Otherpayment, // Make sure Otherpayment is defined in req.body
      });

      try {
        await Pump.findByIdAndUpdate(req.params.id, {
          $push: {
            SalesAndBilling: {
              ID: result._id,
              Date: result.Date,
              Employee : result.Employee,
              EmployeeId : result.EmployeeId,
              Shift: result.Shift,
              TotalAmount:result.TotalAmount
            },
          },
        });

        res.status(200).json("success");
      } catch (err) {
        res.status(401).json({ err });
      }

      try {
        const pump = await Pump.findById(req.params.id);
        if (!pump) {
          console.log("No Pump Found");
        } else {
          Product.map((item) => {
            const Nozzles = pump.Nozzle;
            const index = Nozzles.findIndex(
              (obj) => obj._id.toString() === item.NozzleId
            );
            Nozzles[index].Reading = item.Closing;

            const Tank = pump.Tank.find(
              (tank) => tank._id == Nozzles[index].FuelId
            );
            const TankClone = Tank;
            TankClone.Quantity =
              parseInt(TankClone.Quantity) - parseInt(item.Quantity);
            Object.assign(Tank, TankClone);
          });
          await pump.save();
          console.log("Nozzle Updated");
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getSalesAndBilling: async (req, res) => {
    // const id=req.params.id
    try {
      const result1 = await SalesAndBilling.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getSalesAndBillingById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await SalesAndBilling.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateSalesAndBilling: async (req, res) => {
    const id = req.params.id;
    try {
      await SalesAndBilling.findByIdAndUpdate(id, {
        Name: req.body.Name,
        Shift: req.body.Shift,
        TotalAmount: req.body.TotalAmount,
        ExcessAmount: req.body.ExcessAmount,
        Date: req.body.Date,
        Dinomination: req.body.Dinomination,
        Product: req.body.Product,
        Paymentmethod: req.body.Paymentmethod,
      });
      res.status(200).json("success");
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteSalesAndBilling: async (req, res) => {
    const id = req.params.id;
    try {
      await SalesAndBilling.findByIdAndDelete(id);
      res.status(200).json("success");
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
