const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TankSchema = new mongoose.Schema(
  {
    TankNumber: {
      type: String,

    },
    Volume: {
      type: String,

    },
    Product: {
      type: String,

    },
    ProductCode: {
      type: String,

    },
    Quantity: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    Active: {
      type: Boolean,
    },

  });
const EmployeeSchema = new mongoose.Schema(
  {
    EmployeeName: {
      type: String,

    },
    EmployeeId: {
      type: String,

    },
    Designation: {
      type: String,

    },
    DOB: {
      type: String,

    },
    PhoneNumber: {
      type: String,

    },
  });
const CustomerSchema = new mongoose.Schema(
  {
    CustomerName: {
      type: String,
    },
    CustomerId: {
      type: String,
    },
    MobileNo: {
      type: String,
    },
    CreditBalance: {
      type: String,
    },
  });
const InventoryManagementSchema = new mongoose.Schema(
  {
    InventoryManagementName: {
      type: String,

    },
    InventoryManagementId: {
      type: String,

    },
  });
const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,

    },
    ProductId: {
      type: String,

    },
  });
const SalesAndBillingSchema = new mongoose.Schema(
  {
    ID: {
      type: String,

    },
    Date: {
      type: String,

    },
    Employee: {
      type: String,

    },
    EmployeeId: {
      type: String,

    },
    Shift: {
      type: String,

    },
    TotalAmount: {
      type: String,

    },
  });
const DipstockSchema = new mongoose.Schema(
  {
    DipstockName: {
      type: String,

    },
    DipstockId: {
      type: String,

    },
  });
const FuelSchema = new mongoose.Schema(
  {
    FuelName: {
      type: String,

    },
    FuelPricePerLitre: {
      type: String,

    },
  });
const CardPaymentSchema = new mongoose.Schema(
  {
    Name: {
      type: String,

    },
  });
const UPIPaymentSchema = new mongoose.Schema(
  {
    Name: {
      type: String,

    },
  });
const OtherPaymentSchema = new mongoose.Schema(
  {
    Name: {
      type: String,

    },
  });
const NozzleSchema = new mongoose.Schema(
  {
    NozzleName: {
      type: String,

    },
    Reading: {
      type: String,

    },
    // Opening: {
    //   type: String,

    // },
    // Closing: {
    //   type: String,

    // },
    FuelId: {
      type: String,

    },
  }
);
const ShiftSchema = new mongoose.Schema({
  ShiftName: {
    type: String
  },
  From: {
    type: String
  },
  To: {
    type: String
  }
}) 
const CreditSalesSchema = new mongoose.Schema({
  CreditId: {
    type: String
  },
  Token: {
    type: String
  }
})
const PaymentSchema = new mongoose.Schema({
  PaymentId: {
    type: String
  },
  CustomerID: {
    type: String
  }
})
const PumpSchema = new Schema(
  {
    PumpName: {
      type: String,

    },
    PhoneNumber: {
      type: String,

    },
    Address: {
      type: String,

    },
    email: {
      type: String,
      unique: true,
    },
    Tank: [TankSchema],
    Employee: [EmployeeSchema],
    Fuel: [FuelSchema],
    Customer: [CustomerSchema],
    InventoryManagement: [InventoryManagementSchema],
    Product: [ProductSchema],
    SalesAndBilling: [SalesAndBillingSchema],
    DipStock: [DipstockSchema],
    Nozzle: [NozzleSchema],
    CardPayment: [CardPaymentSchema],
    UPIPayment: [UPIPaymentSchema],
    OtherPayment: [OtherPaymentSchema],
    Shift: [ShiftSchema],
    CreditSales: [CreditSalesSchema],
    Payment: [PaymentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("pump", PumpSchema);