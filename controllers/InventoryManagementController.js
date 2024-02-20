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
    const pumpid = req.params.pumpid;
    const basic = await InventoryManagement.findById(id);
    let CurrentCount = 0;
    if (req.body.Mode == "Add to Store") {
      CurrentCount = parseInt(basic.CurrentStock) - parseInt(req.body.Stock);
      console.log(CurrentCount);
    }
    if (req.body.Mode == "Add New Stock") {
      CurrentCount = parseInt(basic.CurrentStock) + parseInt(req.body.Stock);
      console.log(CurrentCount);
    }
    if (req.body.Mode == "Damaged") {
      CurrentCount = parseInt(basic.CurrentStock) - parseInt(req.body.Stock);
      console.log(CurrentCount);
    }
    try {
      const historyupdate = await InventoryManagement.findByIdAndUpdate(id, {
        $push: {
          InventoryHistory: [
            {
              Date: req.body.Date,
              Stock: req.body.Stock,
              Mode: req.body.Mode,
              CurrentStock: CurrentCount,
              Note: req.body.Note,
            },
          ],
        },
      });
      try {
        const update = await InventoryManagement.findByIdAndUpdate(id, {
          CurrentStock: CurrentCount,
        });
        try {
          const object = await Pump.findById(pumpid);
          if (!object) {
            return res.status(404).send("Object not found");
          } else {
            const nestedInventory = object.InventoryManagement.find(
              (nestedObj) => nestedObj.InventoryManagementId == id
            );
            if (!nestedInventory) {
              return res.status(404).send("Nested object not found");
            }
            // Update the customer's data with the provided updatedCustomerData
            const updatedInventoryData = nestedInventory;
            updatedInventoryData.CurrentStock = CurrentCount;
            Object.assign(nestedInventory, updatedInventoryData);

            await object.save();

            res.send("Object updated successfully");
          }
        } catch (err) {
          res.status(400).json({ err });
        }
      } catch (err) {
        res.status(400).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
