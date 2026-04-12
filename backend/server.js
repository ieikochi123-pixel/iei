const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./config/supabase.js'); 

const app = express();
app.use(cors());
app.use(express.json());

// --- CRITICAL PATH LOGIC ---
// This tells Express to look one folder UP and then into 'frontend'
const frontendPath = path.resolve(__dirname, '../frontend');
app.use(express.static(frontendPath));

// --- 1. HOME CONTENT ENGINE ---
app.get('/api/home-content', async (req, res) => {
    try {
        console.log("📡 Fetching Home Content...");
        const [notices, events, committee, gallery] = await Promise.all([
            supabase.from('notices').select('*'),
            supabase.from('events').select('*'),
            supabase.from('committee').select('*'),
            supabase.from('gallery').select('*')
        ]);

        if (notices.error || events.error || committee.error || gallery.error) {
            console.error("❌ Supabase Error:", notices.error || events.error);
            return res.status(500).json({ error: "Database fetch failed" });
        }

        res.json({
            notices: notices.data,
            events: events.data,
            committee: committee.data,
            gallery: gallery.data
        });
        console.log("✅ Data sent to frontend.");
    } catch (err) {
        console.error("🔥 Crash:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// --- 2. ADMIN POST ROUTE ---
app.post('/api/admin/add/:table', async (req, res) => {
    const { table } = req.params;
    try {
        const { data, error } = await supabase.from(table).insert([req.body]);
        if (error) throw error;
        res.status(200).json({ message: "Success", data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- 3. ADMIN PANEL ROUTING ---
// Updated to find dashboard.html inside frontend/admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(frontendPath, 'admin/dashboard.html'));
});

// --- 4. CATCH-ALL FOR SPA ---
// This ensures that refreshing the page doesn't show an error
// --- 4. CATCH-ALL FOR SPA ---
// Change this: app.get('*', ...
// To this:
// --- 4. CATCH-ALL FOR SPA ---
// Using named parameter syntax to satisfy strict Express/path-to-regexp rules
app.get('/:any*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});