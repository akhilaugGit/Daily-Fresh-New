const Product = require("../models/Productmodel");

// Get all products
const viewProduct = async (req, res) => {
  try {
    const { name, category } = req.query;

    // Construct the query object conditionally
    const query = {
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(category && { category }),
    };

    // Fetch products based on the constructed query
    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by ID
const viewProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    
    // Ensure the category is either 'fish' or 'poultry'
    if (!["fish", "poultry"].includes(category)) {
      return res
        .status(400)
        .json({ message: "Invalid category. Must be fish or poultry." });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category, // Category dropdown field
      subcategory, // Subcategory text field
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

// Edit Product
const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, imageUrl },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
// Disable/Enable Product
const handleDisableProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Toggle the isDisabled field
    product.isDisabled = !product.isDisabled;
    await product.save(); // Ensure the product is saved

    res.status(200).json({
      message: `Product ${
        product.isDisabled ? "disabled" : "enabled"
      } successfully`,
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling product visibility", error });
  }
};

// Export the functions
module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  viewProduct,
  viewProductById,
  handleDisableProduct,
};
