import Volunteer from "../models/volunteer.model.js";

// Create Volunteer : /api/volunteer/create
export const createVolunteer = async (req, res) => {
    const { name, email, phone, address, city, state, zip } = req.body;

    try {
        // Check if volunteer with email already exists
        const existingVolunteer = await Volunteer.findOne({ email });
        if (existingVolunteer) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        const volunteer = await Volunteer.create({
            name,
            email,
            phone,
            address,
            city,
            state,
            zip
        });

        return res.status(201).json({ success: true, volunteer });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Volunteers : /api/volunteer/get-all
export const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, volunteers });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get Volunteer by ID : /api/volunteer/id
export const getVolunteerById = async (req, res) => {
    const { id } = req.params;
    try {
        const volunteer = await Volunteer.findById(id);
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }
        return res.status(200).json({ success: true, volunteer });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update Volunteer : /api/volunteer/update
export const updateVolunteer = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, city, state, zip } = req.body;

    try {
        const volunteer = await Volunteer.findById(id);
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }

        // Check if email is being changed and if it already exists
        if (email && email !== volunteer.email) {
            const existingVolunteer = await Volunteer.findOne({ email });
            if (existingVolunteer) {
                return res.status(409).json({ success: false, message: "Email already in use" });
            }
        }

        const updatedVolunteer = await Volunteer.findByIdAndUpdate(
            id,
            {
                name: name || volunteer.name,
                email: email || volunteer.email,
                phone: phone || volunteer.phone,
                address: address || volunteer.address,
                city: city || volunteer.city,
                state: state || volunteer.state,
                zip: zip || volunteer.zip
            },
            { new: true }
        );

        return res.status(200).json({ success: true, volunteer: updatedVolunteer });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Volunteer : /api/volunteer/delete
export const deleteVolunteer = async (req, res) => {
    const { id } = req.params;
    try {
        const volunteer = await Volunteer.findById(id);
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }

        await Volunteer.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Volunteer deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get Volunteer Statistics : /api/volunteer/stats
export const getVolunteerStats = async (req, res) => {
    try {
        const totalVolunteers = await Volunteer.countDocuments();

        const volunteersByState = await Volunteer.aggregate([
            {
                $group: {
                    _id: "$state",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        const volunteersByCity = await Volunteer.aggregate([
            {
                $group: {
                    _id: "$city",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            }
        ]);

        return res.status(200).json({
            success: true,
            stats: {
                totalVolunteers,
                volunteersByState,
                topCities: volunteersByCity
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}; 