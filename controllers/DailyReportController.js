const SalesModel = require('../models/SalesAndBillingSchema');
module.exports = {
    getPumpSalesOnDate: async (req, res) => {
        const pumpId = req.params.id
        const targetDate = req.params.Date
        try {
            const sales = await SalesModel.find({ PumpId: pumpId });
            console.log("salesdate",sales)
           
            const salesOnDate = sales.filter((sale) => 
            sale.Date == targetDate);

            if (salesOnDate.length === 0) {
                console.log(`No sales found for pump with ID ${pumpId} on ${targetDate}.`);
                return res.status(404).json({ error: `No sales found for pump with ID ${pumpId} on ${targetDate}.` });
            }

            console.log("salesOnDate", salesOnDate);
            res.status(200).json({ salesOnDate });

        } catch (error) {
            console.error('Error fetching pump sales:', error);
            res.status(400).json({ error })
        }
    }

}