const Customer = require("../models/CustomerSchema")
const Pump = require("../models/PumpSchema")
module.exports={
  createCustomer:async(req,res)=>{
    const {Category,Name,Address,MobileNo,GSTIN,OfficePhoneNo,HomePhoneNo,EmailID,CreditBalance,CreditLimit,
    ExpenseAccount,DealerCard,CardAccount,ExpenseAsCredit,HideFromDR,
    Type,Operator,Active}=req.body;
    try{
        const result=await Customer.create({
            Category,
            Name, 
            Address,
            MobileNo,
            GSTIN,
            OfficePhoneNo,
            HomePhoneNo,
            EmailID,
            CreditBalance,
            CreditLimit,
            ExpenseAccount,
            DealerCard,
            CardAccount,
            ExpenseAsCredit,
            HideFromDR,
            Type,
            Operator,
            Active
        });
        try {
            await Pump.findByIdAndUpdate(req.params.id, {
                $push: {
                    Customer: [{
                        CustomerId: result._id,
                        CustomerName: result.Name
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

   
getCustomer:async(req,res)=>{
    const id=req.params.id
    try {
         const result1=await Customer.find()
         res.status(200).json({result1});
    }
    catch(err) {
        res.status(400).json({err});
        } 
},
getCustomerById:async(req,res)=>{
    const id=req.params.id
    try {
         const result2=await Customer.findById(id)
         res.status(200).json({result2});
    }
    catch(err) {
        res.status(400).json({err});
        }

    
},
updateCustomer:async(req,res)=>{
    const id=req.params.id
    try {
         await Customer.findByIdAndUpdate(id,{
            Category:req.body.Category,
            Name:req.body.Name,
            Address:req.body.Address,
            MobileNo:req.body.MobileNo,
            GSTIN:req.body.GSTIN,
            OfficePhoneNo:req.body.OfficePhoneNo,
            HomePhoneNo:req.body.HomePhoneNo,
            EmailID:req.body.EmailID,
            CreditBalance:req.body.CreditBalance,
            CreditLimit:req.body.CreditLimit,
            ExpenseAccount:req.body.ExpenseAccount,
            DealerCard:req.body.DealerCard,
            CardAccount:req.body.CardAccount,
            ExpenseAsCredit:req.body.ExpenseAsCredit,
            HideFromDR:req.body.HideFromDR,
            Type:req.body.Type,
            Operator:req.body.Operator,
            Active:req.body.Active,
         });
         res.status(200).json("success");
    }
    catch(err) {
        res.status(400).json({err});
        }

    },
deleteCustomer:async(req,res)=>{
        const id=req.params.id
        try {
             await Customer.findByIdAndDelete(id)
             res.status(200).json("success");
        }
        catch(err) {
            res.status(400).json({err});
            }
    
        }}
    