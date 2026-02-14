import BrandModel from "../models/Brand.js";

/* ============ CREATE ============ */
export const createBrand = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    const { userId } = req.params;

    if (!title || !imageUrl || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const brand = new BrandModel({
      title,
      imageUrl,
      userId,
    });

    await brand.save();

    res.status(201).json({
      success: true,
      brand,
      message: "Brand added",
    });

  } catch (error) {
    console.log("Brand Create Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ============ GET ============ */
export const getBrands = async (req, res) => {
  try {
    const { userId } = req.params;

    const brands = await BrandModel.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      brands,
    });

  } catch (error) {
    console.log("Brand Get Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ============ DELETE ============ */
export const deleteBrand = async (req, res) => {
  try {
    const brand = await BrandModel.findByIdAndDelete(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand deleted",
    });

  } catch (error) {
    console.log("Brand Delete Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
