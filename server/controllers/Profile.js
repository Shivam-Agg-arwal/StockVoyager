//controllers to update teh display picture
const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url }
        );

        const updatedUser = await User.findById(userId)
            .populate("additionalDetails")
            .populate("portfolio")
            .populate("transactions")
            .populate("watchList")
            .populate("portfolioGraph");
        return res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//controller to update the details

exports.updateProfile = async (req, res) => {
    try {
        //get data from body
        const { firstName, lastName, gender, phoneNumber, about } = req.body;
        const userID = req.user.id;

        if (!userID) {
            return res.status(500).json({
                success: false,
                message: "User id field could not be fetched",
            });
        }

        //get profile id

        const userDetails = await User.findById(userID);
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "User not found",
            });
        }
        const profileDetails = await Profile.findById(
            userDetails.additionalDetails
        );

        if (gender) {
            profileDetails.gender = gender;
        }
        if (phoneNumber) {
            profileDetails.phoneNumber = phoneNumber;
        }
        if (about) {
            profileDetails.about = about;
        }
        await profileDetails.save();

        if (firstName) {
            userDetails.firstName = firstName;
        }
        if (lastName) {
            userDetails.lastName = lastName;
        }

        await userDetails.save();

        const updatedUser = await User.findById(userID)
            .populate("additionalDetails")
            .populate("portfolio")
            .populate("transactions")
            .populate("watchList")
            .populate("portfolioGraph");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data:updatedUser,
        });
    } catch (error) {
        console.log("profile updattion failed", error);
        return res.status(500).json({
            success: false,
            message: "Profile updated failed",
        });
    }
};
