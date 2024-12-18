import GiftCard from "../Models/giftcardModel.js";
import CardRate from "../Models/rateModel.js"

export const getGiftCards = async (req, res) => {
    try {
        const giftCards = await GiftCard.find()
        .populate({
            path: "rates.rateDetails",
            model: "Card_rate",
            select: "countryName currencyCode currencySymbol flag",
        })
        res.status(200).json(giftCards);
    } catch (error) {
        console.log("Error in get giftCards controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
}

export const updateGiftCard = async (req, res) => {
    const {name, value} = req.body;
    try {
        const updatedGiftCard = await GiftCard.findOneAndUpdate({name: name}, {value: value},{new:true});
        res.status(200).json(updatedGiftCard);
    } catch (error) {
        console.log("Error in updateGiftCard controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}