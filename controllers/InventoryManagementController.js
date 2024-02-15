const InventoryManagement = require("../models/InventoryManagementSchema");
const Pump = require("../models/PumpSchema");
module.exports = {
  createInventoryManagement: async (req, res) => {
    const {
      PumpId,
      SKUNo,
      ItemName,
      CategoryName,
      CurrentStock,
      Price,
      Brand,
      ExpiryDate,
      Description,
    } = req.body;
    try {
      const result = await InventoryManagement.create({
        PumpId,
        CategoryName,
        SKUNo,
        ItemName,
        CurrentStock,
        Price,
        Brand,
        ExpiryDate,
        Description,
        InventoryHistory: [
          {
            Date: Date.now(),
            Stock: CurrentStock,
            Mode: "Initial Stock",
            CurrentStock: CurrentStock,
          },
        ],
      });
      try {
        await Pump.findByIdAndUpdate(req.params.id, {
          $push: {
            InventoryManagement: [
              {
                InventoryManagementId: result._id,
                CategoryName: result.CategoryName,
                ItemName: result.ItemName,
                CurrentStock: result.CurrentStock,
              },
            ],
          },
        });
        res.status(200).json({ result });
      } catch (err) {
        res.status(401).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  getInventoryManagement: async (req, res) => {
    const id = req.params.id;
    try {
      const result1 = await InventoryManagement.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getInventoryManagementById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await InventoryManagement.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateInventoryManagement: async (req, res) => {
    const id = req.params.id;
    try {
      await InventoryManagement.findByIdAndUpdate(id, {
        SKUNo: req.body.SKUNo,
        ItemName: req.body.ItemName,
        CategoryName: req.body.CategoryName,
        CurrentStock: req.body.CurrentStock,
        Price: req.body.Price,
        Brand: req.body.Brand,
        ExpiryDate: req.body.ExpiryDate,
        Description: req.body.Description,
      });
      res.status(200).json("success");
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteInventoryManagement: async (req, res) => {
    const PumpId = req.params.pumpId;
    const InventoryId = req.params.inventoryId;
    try {
      const deletedEmployee = await InventoryManagement.findByIdAndDelete(
        InventoryId
      );
      if (!deletedEmployee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      const inventorydata = await Pump.findOneAndUpdate(
        { _id: PumpId },
        {
          $pull: {
            InventoryManagement: { InventoryManagementId: InventoryId },
          },
        }
      );
      res.status(200).json({ inventorydata });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updatehistory: async (req, res) => {
    const id = req.params.id;
    try {
      const historyupdate = await InventoryManagement.findByIdAndUpdate(id, {
        SKUNo: req.body.SKUNo,
        ItemName: req.body.ItemName,
        CategoryName: req.body.CategoryName,
        CurrentStock: req.body.CurrentStock,
        Price: req.body.Price,
        Brand: req.body.Brand,
        ExpiryDate: req.body.ExpiryDate,
        Description: req.body.Description,
        InventoryHistory: req.body.InventoryHistory,
      });
      res.status(200).json(historyupdate);
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
