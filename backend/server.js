require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const supabase = require("./config/supabase");
const bookingRoutes = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

/* ===========================
   BOOKING SYSTEM API
=========================== */
app.use("/api/bookings", bookingRoutes);

/* ===========================
   FRONTEND FILES
=========================== */
const frontendPath = path.resolve(__dirname, "../frontend");
app.use(express.static(frontendPath));

/* ===========================
   HOME CONTENT API
=========================== */
app.get("/api/home-content", async (req, res) => {
    try {

        console.log("📡 Fetching Home Content...");

        const [notices, events, committee, gallery] =
            await Promise.all([
                supabase.from("notices").select("*"),
                supabase.from("events").select("*"),
                supabase.from("committee").select("*"),
                supabase.from("gallery").select("*")
            ]);

        if (
            notices.error ||
            events.error ||
            committee.error ||
            gallery.error
        ) {
            return res.status(500).json({
                error: "Database fetch failed"
            });
        }

        res.json({
            notices: notices.data,
            events: events.data,
            committee: committee.data,
            gallery: gallery.data
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
});

/* ===========================
   ADMIN ADD CONTENT API
=========================== */
app.post("/api/admin/add/:table", async (req, res) => {

    const { table } = req.params;

    try {

        const { data, error } =
            await supabase
                .from(table)
                .insert([req.body]);

        if (error) throw error;

        res.status(200).json({
            success: true,
            data
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            error: err.message
        });

    }

});

/* ===========================
   ADMIN DASHBOARD
=========================== */
app.get("/admin", (req, res) => {

    res.sendFile(
        path.join(
            frontendPath,
            "admin",
            "dashboard.html"
        )
    );

});

/* ===========================
   HOME PAGE
=========================== */
app.get("/", (req, res) => {

    res.sendFile(
        path.join(frontendPath, "index.html")
    );

});

/* ===========================
   SPA CATCH ALL
=========================== */
app.use((req, res) => {

    if (req.path.startsWith("/api")) return;

    res.sendFile(
        path.join(frontendPath, "index.html")
    );

});

/* ===========================
   START SERVER
=========================== */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});