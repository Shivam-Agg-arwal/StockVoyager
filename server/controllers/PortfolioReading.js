const User = require("../models/User");
const PortfolioGraphReading=require('../models/PortfolioGraphReading')

//controller to add a stock to the watchlist

exports.addToGraph = async (req, res) => {
    try {
        //get data from body
        const { curr_value,buy_value } = req.body;
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

        const graph=await PortfolioGraphReading.create({
            buying_value:buy_value,
            curr_value:curr_value
        });



        userDetails.portfolioGraph.push(graph._id);
        await userDetails.save();

        const updatedUser = await User.findById(userID).populate('portfolio').populate('transactions').populate('watchList').populate('portfolioGraph');

        return res.status(200).json({
            success:true,
            message:"Reading Added",
            data:updatedUser,
        })
        
    } catch (error) {
        console.log("Watchlist updattion failed", error);
        return res.status(500).json({
            success: false,
            message: "Watchlist updated failed",
            error:error
        });
    }
};

