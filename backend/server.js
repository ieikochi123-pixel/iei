require('dotenv').config(); // This loads the variables

const express = require('express');
const app = express();

// Now you can access your secrets using process.env
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

console.log("Connecting to:", mongoURI);

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());

// 1. Database Schemas
const MemberSchema = new mongoose.Schema({
    name: String,
    position: String, // Chairman, Secretary, etc.
    email: String,
    photoUrl: String,
    order: Number // To sort them correctly on the UI
});

const EventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    imageUrl: String,
    regLink: String // For the custom registration forms
});

const Member = mongoose.model('Member', MemberSchema);
const Event = mongoose.model('Event', EventSchema);

// 2. Routes
app.get('/api/members', async (req, res) => {
    const members = await Member.find().sort({ order: 1 });
    res.json(members);
});

app.get('/api/events', async (req, res) => {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
});

// 3. Start Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    // Ensure you use ` (backtick), NOT ' (single quote)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 IEI Backend Live on Port: ${PORT}`);
        });
    })
    .catch(err => console.log("Database Error:", err));
// Add these to your backend/server.js
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
// ✅ CORRECT: Use the exact names from your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: 'iei_kochi_gallery' },
});

const upload = multer({ storage: storage });

// The "Admin Only" Route to upload a Photo
app.post('/api/admin/upload', upload.single('image'), (req, res) => {
  res.json({ url: req.file.path }); // This returns the URL to store in MongoDB
});