const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middelware
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req, res) => {
  const nameURL =
    "https://openexchangerates.org/api/currencies.json?app_id=c8c800a29f574ec2a5980cd4bb56c42b";



    try {
        const namesResponse = await axios.get(nameURL);
        const nameData = namesResponse.data;
    
        return res.json(nameData);
        
    } catch (err) {
        console.error(err);
        
    }
});

//get target amount
app.get("/convert", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
        req.query;
    
    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=c8c800a29f574ec2a5980cd4bb56c42b`;

        const dataResponce = await axios.get(dataURL);
        const rates = dataResponce.data.rates;

        //rates of source and target currency
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //conversion
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));
        
    } catch (err) {
        console.error(err);
    }
});

//Listen to a port
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
