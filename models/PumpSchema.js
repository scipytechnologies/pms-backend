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
      type: Number,
    },
  });
const InventoryManagementSchema = new mongoose.Schema(
  {
    InventoryManagementId: {
      type: String,

    },
    CategoryName: {
      type: String,

    },
    ItemName: {
      type: String,
    },
  });
const ProductSchema = new mongoose.Schema(
  {
    ProductId: {
      type: String,
    },
    CategoryName: {
      type: String,

    },
    Description: {
      type: String,

    }
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
    DipStockId: {
      type: String,
    },
    Date: {
      type: String
    },
    InvoiceNumber: {
      type: String,
    },
    Product: {
      type: String
    },
    Quantity: {
      type: String
    },
    Price: {
      type: String
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
const EcommerceSaleSchema = new mongoose.Schema({
  ID: {
    type: String,
  },
  SalesId: {
    type: String
  },
  Date: {
    type: Date,
    default: Date.now
  },
  TotalSaleAmount: {
    type: String
  }
})
const FuelTestSchema = new Schema({
  FuelTestId: {
    type: String
  },
  EmployeeName: {
    type: String
  },
  EmployeeId: {
    type: String
  },
  NozzleId: {
    type: String
  },
  Product: {
    type: String
  }
})
const EvaporationRateSchema = new Schema({
  EvaporationId: {
    type: String
  },
  Tank: {
    type: String
  },
  Tankid: {
    type: String
  },
  InitialQuantity: {
    type: String
  },
  ActualQuantity: {
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
    Payment: [PaymentSchema],
    Ecommerce: [EcommerceSaleSchema],
    FuelTesting: [FuelTestSchema],
    Evaporation: [EvaporationRateSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("pump", PumpSchema);