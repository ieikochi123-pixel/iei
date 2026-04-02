const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. THE PERMISSION: Allows Chaithanya's frontend to talk to your backend
app.use(cors());
app.use(express.json());

// 2. THE CONNECTION: Using the keys you saved in the .env file
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// 3. THE "MENU" (The Route): This is where the website asks for data
app.get('/api/members', async (req, res) => {
    try {
        // Go to Supabase and get all members sorted by their order
        const { data, error } = await supabase
            .from('iei_members')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;

        // Send the data back to the website
        res.status(200).json(data);
    } catch (error) {
        console.error("Database Error:", error.message);
        res.status(500).json({ error: "Failed to fetch IEI members" });
    }
});

// 4. THE WELCOME ROUTE: Just to check if the server is alive
app.get('/', (req, res) => {
    res.send("IEI Kochi API is Running... 🚀");
});

// 5. START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Waiter is ready at: http://localhost:${PORT}`);
});