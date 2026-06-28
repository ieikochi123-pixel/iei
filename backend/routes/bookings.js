const express = require("express");
const router = express.Router();

const supabase = require("../config/bookingSupabase");
const { sendAdminNotification } = require("../services/mailer");

// CREATE BOOKING
router.post("/", async (req, res) => {
    try {

        const booking = {
            booking_ref: req.body.booking_ref,
            facility: req.body.facility,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            membership_id: req.body.membership_id,
            booking_date: req.body.booking_date,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            duration: req.body.duration,
            status: req.body.status || "Pending"
        };

        // DUPLICATE BOOKING CHECK
        if (booking.booking_date) {

            const { data: existingBooking, error: checkError } =
                await supabase
                    .from("bookings")
                    .select("*")
                    .eq("facility", booking.facility)
                    .eq("booking_date", booking.booking_date);

            if (checkError) {
                return res.status(400).json({
                    success: false,
                    message: checkError.message
                });
            }

            if (existingBooking.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "This facility is already booked for that date."
                });
            }
        }

        // SAVE BOOKING
        const { data, error } = await supabase
            .from("bookings")
            .insert([booking])
            .select();

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // SEND ADMIN EMAIL
        try {

            await sendAdminNotification(booking);

            console.log("Admin Email Sent Successfully");

        } catch (mailError) {

            console.error("Email Error:", mailError);

        }

        res.json({
            success: true,
            message: "Booking saved successfully",
            booking: data
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

// GET ALL BOOKINGS
router.get("/", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("bookings")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.json(data);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// UPDATE BOOKING STATUS
router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const { data, error } = await supabase
            .from("bookings")
            .update({
                status: status
            })
            .eq("id", id)
            .select();

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.json({
            success: true,
            message: "Booking status updated",
            booking: data
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// DELETE BOOKING
router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const { error } = await supabase
            .from("bookings")
            .delete()
            .eq("id", id);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.json({
            success: true,
            message: "Booking deleted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;