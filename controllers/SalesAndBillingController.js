const SalesAndBilling = require("../models/SalesAndBillingSchema")
const Pump = require("../models/PumpSchema")
module.exports={
  createSalesAndBilling:async(req,res)=>{
    const {Name,Shift,TotalAmount,ExcessAmount,Date,Dinomination,Product,Paymentmethod}=req.body;
    try{
        const result=await SalesAndBilling.create({
            Name,
            Shift, 
            TotalAmount,
            ExcessAmount,
            Date,
            Dinomination,
            Product,
            Paymentmethod
        });
        try {
            await Pump.findByIdAndUpdate(req.params.id, {
                $push: {
                    SalesAndBilling: [{
                        SalesAndBillingId: result._id,
                        SalesAndBillingName: result.Date
                    }]
                }
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(401).json({err});
        }

    }
    catch (err) {
        res.status(400).json({ err });
    }
},

   
getSalesAndBilling:async(req,res)=>{
    // const id=req.params.id
    try {
         const result1=await SalesAndBilling.find()
         res.status(200).json({result1});
    }
    catch(err) {
        res.status(400).json({err});
        } 
},
getSalesAndBillingById:async(req,res)=>{
    const id=req.params.id
    try {
         const result2=await SalesAndBilling.findById(id)
         res.status(200).json({result2});
    }
    catch(err) {
        res.status(400).json({err});
        }

    
},
updateSalesAndBilling:async(req,res)=>{
    const id=req.params.id
    try {
         await SalesAndBilling.findByIdAndUpdate(id,{
            Name:req.body.Name,
            Shift:req.body.Shift,
            TotalAmount:req.body.TotalAmount,
            ExcessAmount:req.body.ExcessAmount,
            Date:req.body.Date,
            Dinomination:req.body.Dinomination,
            Product:req.body.Product,
            Paymentmethod:req.body.Paymentmethod
         });
         res.status(200).json("success");
    }
    catch(err) {
        res.status(400).json({err});
        }

    },
deleteSalesAndBilling:async(req,res)=>{
        const id=req.params.id
        try {
             await SalesAndBilling.findByIdAndDelete(id)
             res.status(200).json("success");
        }
        catch(err) {
            res.status(400).json({err});
            }
    
        }}
    