import Offer from "../models/Offer.js";

/* CREATE */
export const createOffer = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    const { userId } = req.params;

    if (!title || !imageUrl || !userId) {
      return res.status(400).json({
        success: false,
      });
    }

    const offer = new Offer({
      title,
      imageUrl,
      userId,
    });

    await offer.save();

    res.status(201).json({
      success: true,
      offer,
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* GET */
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ userId: req.params.userId });

    res.json({
      success: true,
      offers,
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* DELETE */
export const deleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};
