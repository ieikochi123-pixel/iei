const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// 1. Serve static files (CSS, Fonts, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// 2. API Routes (Manual String Match)
app.use((req, res, next) => {
    if (req.url === '/api/events') {
        return res.json([{ title: "39th National Convention", is_convention: true }]);
    }
    next();
});

// 3. THE FIX: Manual URL Handling (Bypasses path-to-regexp)
app.use((req, res, next) => {
    // If it's an API request we already handled, or it looks like a file (has a dot)
    if (req.url.startsWith('/api') || req.url.includes('.')) {
        return next();
    }

    // Route for Convention
    if (req.url === '/convention') {
        return res.sendFile(path.join(__dirname, '../frontend/convention/index.html'));
    }

    // Default to Homepage for everything else
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`
    🚀 IEI PLATFORM IS FINALLY LIVE
    --------------------------------
    🏠 Home: http://localhost:${PORT}
    🌌 Portal: http://localhost:${PORT}/convention
    `);
});