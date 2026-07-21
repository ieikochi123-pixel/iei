const express = require("express");
const router = express.Router();

const supabase = require("../config/bookingSupabase");
const { sendAdminNotification } = require("../services/mailer");

const TOTAL_ROOMS = 6; // Each venue has 6 rooms/slots available per date

// Returns true if two [start, end) date ranges overlap on at least one night.
// end is treated as exclusive (checkout day itself is not occupied).
function rangesOverlap(startA, endA, startB, endB) {
    return new Date(startA) < new Date(endB) && new Date(startB) < new Date(endA);
}

// Builds an array of YYYY-MM-DD strings for every night in [start, end).
function nightsInRange(start, end) {
    const nights = [];
    const cursor = new Date(start);
    const endDate = new Date(end);
    while (cursor < endDate) {
        nights.push(cursor.toISOString().split("T")[0]);
        cursor.setDate(cursor.getDate() + 1);
    }
    return nights;
}

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

        // Fetch every active (non-cancelled/rejected) booking for this facility once,
        // then reuse it for whichever check applies below.
        const { data: existingBookings, error: fetchError } =
            await supabase
                .from("bookings")
                .select("id, status, booking_date, start_date, end_date")
                .eq("facility", booking.facility)
                .not("status", "in", '("Cancelled","Rejected")');

        if (fetchError) {
            return res.status(400).json({
                success: false,
                message: "Not Available"
            });
        }

        // ROOM AVAILABILITY CHECK — SINGLE-DATE BOOKINGS (classroom / conference / aban)
        if (booking.booking_date) {

            const sameDateCount = existingBookings.filter(
                b => b.booking_date === booking.booking_date
            ).length;

            if (sameDateCount >= TOTAL_ROOMS) {
                return res.status(400).json({
                    success: false,
                    message: "All rooms are fully booked for this date. Iei Kochi will contact you soon."
                });
            }
        }

        // ROOM AVAILABILITY CHECK — DATE-RANGE BOOKINGS (guest room check-in/check-out)
        if (booking.start_date && booking.end_date) {

            if (new Date(booking.start_date) >= new Date(booking.end_date)) {
                return res.status(400).json({
                    success: false,
                    message: "Check-out date must be after the check-in date."
                });
            }

            // Only bookings that overlap the requested range even matter
            const overlappingBookings = existingBookings.filter(b => {
                if (b.start_date && b.end_date) {
                    return rangesOverlap(booking.start_date, booking.end_date, b.start_date, b.end_date);
                }
                if (b.booking_date) {
                    return b.booking_date >= booking.start_date && b.booking_date < booking.end_date;
                }
                return false;
            });

            // Check every individual night of the requested stay against the 6-room cap
            const requestedNights = nightsInRange(booking.start_date, booking.end_date);
            const fullNights = requestedNights.filter(night => {
                const nightCount = overlappingBookings.filter(b => {
                    if (b.start_date && b.end_date) {
                        return night >= b.start_date && night < b.end_date;
                    }
                    if (b.booking_date) {
                        return b.booking_date === night;
                    }
                    return false;
                }).length;
                return nightCount >= TOTAL_ROOMS;
            });

            if (fullNights.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `All rooms are fully booked on: ${fullNights.join(", ")}. Iei Kochi will contact you soon.`
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

        // SEND ADMIN EMAIL (best-effort, never blocks the booking response)
        try {
            await sendAdminNotification(booking);
            console.log("Admin Email Sent Successfully");
        } catch (mailError) {
            console.error("Email Error:", mailError);
        }

        return res.json({
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

// GET AVAILABILITY FOR A FACILITY (rooms left per date)
router.get("/availability", async (req, res) => {

    try {

        const { facility, booking_date } = req.query;

        if (!facility || !booking_date) {
            return res.status(400).json({
                success: false,
                message: "facility and booking_date are required"
            });
        }

        const { data, error } = await supabase
            .from("bookings")
            .select("id, status, booking_date, start_date, end_date")
            .eq("facility", facility)
            .not("status", "in", '("Cancelled","Rejected")');

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        const bookedCount = data.filter(b => {
            if (b.booking_date) {
                return b.booking_date === booking_date;
            }
            if (b.start_date && b.end_date) {
                return booking_date >= b.start_date && booking_date < b.end_date;
            }
            return false;
        }).length;

        const roomsLeft = Math.max(TOTAL_ROOMS - bookedCount, 0);

        res.json({
            success: true,
            facility,
            booking_date,
            total_rooms: TOTAL_ROOMS,
            booked: bookedCount,
            rooms_left: roomsLeft,
            is_full: roomsLeft === 0
        });

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