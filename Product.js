import ProductModel from "../models/Product.js";

/* ================= CREATE ================= */
export const ProdutCreate = async (req, res) => {
  try {
    const { title, des, Image_url, category, price } = req.body; // ✅ ADD PRICE
    const { userId } = req.params;

    // Validation
    if (!title || !des || !Image_url || !category || !price || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = new ProductModel({
      title,
      des,
      Image_url,
      category,
      price, // ✅ SAVE PRICE
      userId,
    });

    await product.save();

    res.status(201).json({
      success: true,
      product,
      message: "Product created",
    });

  } catch (error) {
    console.log("Create Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


/* ================= GET ================= */
export const GetProduct = async (req, res) => {
  try {
    const { userId } = req.params;

    const products = await ProductModel.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.log("Get Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


/* ================= UPDATE ================= */
export const Update = async (req, res) => {
  try {
    const { title, des, Image_url, category, price } = req.body; // ✅ ADD PRICE

    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        des,
        Image_url,
        category,
        price, // ✅ UPDATE PRICE
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.log("Update Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


/* ================= DELETE ================= */
export const DeleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    console.log("Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
