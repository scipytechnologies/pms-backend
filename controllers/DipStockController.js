const DipStock = require("../models/DipStockSchema");
const PumpSchema = require("../models/PumpSchema");

async function AddQuantity(pumpID, UpdateTank) {
  try {
    const pump = await PumpSchema.findById(pumpID);
    if (!pump) {
      console.log("No Pump Found");
    } else {
      const Tank = pump.Tank.find((tank) => tank._id == UpdateTank.Tank);
      if (!Tank) {
        console.log("Tank Not found");
      } else {
        const TankClone = Tank;
        TankClone.Quantity =
          parseInt(UpdateTank.Quantity) + parseInt(TankClone.Quantity);
        Object.assign(Tank, TankClone);
        await pump.save();
        console.log("Tank Quantity Updated");
      }
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  createDipStock: async (req, res) => {
    const {
      Date,
      InvoiceNumber,
      VehicleNumber,
      AgentName,
      Product,
      Quantity,
      Price,
      Note,
      TotalQuantityFilled,
      RemainingQuantity,
      PhoneNumber,
      LFRAmount,
      Rate,
      VAT,
      Cess,
      TankDistribution,
      PumpId,
    } = req.body;
    try {
      const result = await DipStock.create({
        Date,
        InvoiceNumber,
        VehicleNumber,
        AgentName,
        Product,
        Quantity,
        Price,
        Note,
        TotalQuantityFilled,
        RemainingQuantity,
        PhoneNumber,
        LFRAmount,
        Rate,
        VAT,
        Cess,
        TankDistribution,
        PumpId,
      });
      const tanks = result.TankDistribution;
      tanks.map((tank) => {
        AddQuantity(PumpId, tank);
      });
      try {
        await PumpSchema.findByIdAndUpdate(req.params.id, {
          $push: {
            DipStock: {
              DipStockId: result._id,
              Date: result.Date,
              InvoiceNumber: result.InvoiceNumber,
              Product: result.Product,
              Quantity: result.Quantity,
              Price: result.Price,
            }
          }
        });
        res.status(200).json("success");
      }
      catch (err) {
        res.status(400).json({ err });
      }

    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getDipStock: async (req, res) => {
    // const id=req.params.id
    try {
      const result1 = await DipStock.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getDipStockById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await DipStock.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateDipStock: async (req, res) => {
    const id = req.params.id;
    const pumpid = req.params.pumpid
    try {
      await DipStock.findByIdAndUpdate(id, {
        Date: req.body.Date,
        InvoiceNumber: req.body.InvoiceNumber,
        VehicleNumber: req.body.VehicleNumber,
        AgentName: req.body.AgentName,
        Product: req.body.Product,
        Quantity: req.body.Quantity,
        Price: req.body.Price,
        Note: req.body.Note,
        TotalQuantityFilled: req.body.TotalQuantityFilled,
        RemainingQuantity: req.body.RemainingQuantity,
        TankDistribution: req.body.TankDistribution,

      });
      try {
        const object = await PumpSchema.findById(pumpid);
        if (!object) {
          return res.status(404).send("Object not found");
        } else {
          const nestedDipStock = object.DipStock.find(
            (nestedObj) => nestedObj.DipStockId === id
          );

          if (!nestedDipStock) {
            return res.status(404).send("Nested object not found");
          }

          const updatedDipStockData = {
            Date: req.body.Date,
            InvoiceNumber: req.body.InvoiceNumber,
            Product: req.body.Product,
            Quantity: req.body.Quantity,
            Price: req.body.Price,
          };
  
          Object.assign(nestedDipStock, updatedDipStockData);

          await object.save();

          res.send("Object updated successfully");
        }
      } catch (err) {
        res.status(400).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteDipStock: async (req, res) => {
    const pumpId = req.params.pumpId
    const DipStockid = req.params.id;
    try {
      const deletedDipStock = await DipStock.findByIdAndDelete(DipStockid);

      if (!deletedDipStock) {
        return res.status(404).json({ error: "Employee not found" });
      }
      const pumpUpdate = await PumpSchema.findByIdAndUpdate(
        pumpId,
        {
          $pull: {
            DipStock: { DipStockId: deletedDipStock._id }
          }
        }
      );

      if (!pumpUpdate) {
        return res.status(500).json({ error: "Failed to update Pump collection" });
      }
      res.status(200).json({ deletedEmployee });
    }
    catch (err) {
      res.status(400).json({ err });
    }
  },
};
