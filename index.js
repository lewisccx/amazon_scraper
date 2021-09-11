const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) =>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// To parse json
app.use(express.json());
app.get('/', (req, res) => {
    res.send('it works!')
})

const options = {
    timeout: 1800000
}

// Get Product details 
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.sg/dp/${productId}`,options);
        res.json(JSON.parse(response));
    }catch(err){
        res.json(err);
    }
})


// Get Product review
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.sg/product-reviews/${productId}`,options);
        res.json(JSON.parse(response));
    }catch(err){
        res.json(err);
    }
})

// Get Product offer
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.sg/gp/offer-listing/${productId}`,options);
        res.json(JSON.parse(response));
    }catch(err){
        res.json(err);
    }
})

// Get Search result
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.sg/s?k=${searchQuery}`,options);
        res.json(JSON.parse(response));
    }catch(err){
        res.json(err);
    }
})

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
});