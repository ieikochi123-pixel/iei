const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./config/supabase.js'); 

const app = express();
app.use(cors());
app.use(express.json());

// Serving the frontend folder as static files
app.use(express.static(path.join(__dirname, '../frontend')));

// --- 1. HOME CONTENT ENGINE (NEW & REQUIRED) ---
// This is what the Home Page calls to show Notices, Events, etc.
app.get('/api/home-content', async (req, res) => {
    try {
        console.log("📡 Fetching Home Content for Frontend...");
        
        // Fetch data from all 4 tables at once
        const [notices, events, committee, gallery] = await Promise.all([
            supabase.from('notices').select('*'),
            supabase.from('events').select('*'),
            supabase.from('committee').select('*'),
            supabase.from('gallery').select('*')
        ]);

        // Error checking
        if (notices.error || events.error || committee.error || gallery.error) {
            console.error("❌ Supabase Fetch Error:", notices.error || events.error || committee.error || gallery.error);
            return res.status(500).json({ error: "Database fetch failed" });
        }

        // Send the data back to home.js
        res.json({
            notices: notices.data,
            events: events.data,
            committee: committee.data,
            gallery: gallery.data
        });
        
        console.log("✅ Home content sent successfully.");
    } catch (err) {
        console.error("🔥 Server Crash:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// --- 2. ADMIN POST ROUTE ---
app.post('/api/admin/add/:table', async (req, res) => {
    const { table } = req.params;
    const rowData = req.body;

    console.log(`🚀 Incoming request for [${table}]:`, rowData);

    try {
        const { data, error } = await supabase
            .from(table)
            .insert([rowData]);

        if (error) {
            console.error("❌ Supabase Rejected:", error.message);
            return res.status(400).json({ error: error.message });
        }

        console.log(`✅ Successfully added to ${table}`);
        return res.status(200).json({ message: "Success", data });
    } catch (err) {
        console.error("🔥 Server Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// --- 3. ADMIN PANEL ROUTING ---
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin/dashboard.html'));
});

// Start the server
const PORT = process.env.PORT || 10000; // Render uses 10000 by default, or its own process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});
// Replace your current static line with this:
app.use(express.static(path.join(__dirname, '../frontend')));
