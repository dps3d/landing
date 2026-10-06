import express from "express";
import cors from 'cors';

import settings from "./data/common.json" with {type: 'json'};
import pages from "./data/pages.json" with {type: 'json'};


const app = express();
app.use(cors(
    {origin: process.env.FRONTEND_URL}
));

const PORT = process.env.PORT || 3000;

app.get('/api/settings', (req, res) => {
    res.json(settings);
})

app.get('/api/pages', (req, res) => {
    const page = pages.find((p) => p.path === req.query.path);

    if(!page){
        return res.status(404).json({error: 'Page not found'})
    }

    res.json(page);
})

app.listen(PORT, () => {
    console.log(`Server works on http://localhost:${PORT}`);
})