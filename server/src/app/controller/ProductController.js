const Product = require('../models/Product');
const Brand = require('../models/Brand');
const Specification = require('../models/Specification');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('../models/Image')
const { Op } = require("sequelize");
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ include: Brand });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Tạo thư mục upload nếu chưa tồn tại
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// multer luu anh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
exports.addProduct = async (req, res) => {
    upload.fields([
        { name: 'Avatar', maxCount: 1 }, 
        { name: 'Images', maxCount: 10 } 
    ])(req, res, async (err) => {
        if (err) {
            console.error('Lỗi upload:', err);
            return res.status(500).json({ error: 'Lỗi khi upload hình ảnh' });
        }

        try {
            const { ProductName, Description, SummaryDescription, Discount, IdBrand, Price, specifications } = req.body;

            let avatarPath = req.files['Avatar'] ? req.files['Avatar'][0].filename : null;

            const newProduct = await Product.create({
                ProductName,
                Description,
                SummaryDescription,
                Discount,
                IdBrand,
                Price,
                Avatar: avatarPath
            });

            // console.log('Avatar path:', avatarPath);

            // Lấy danh sách các hình ảnh (Images) từ request
            const images = req.files['Images'] || [];
            console.log(images)
            if (images.length > 0) {
                // Lưu các hình ảnh vào bảng Image
                const imagePromises = images.map((image) =>
                    Image.create({
                        ImageUrl: image.filename, 
                        ProductId: newProduct.ProductId 
                    })
                );
                await Promise.all(imagePromises); 
            }

            let parsedSpecifications = [];
            if (specifications) {
                try {
                    parsedSpecifications = JSON.parse(specifications);
                } catch (parseError) {
                    console.error('Lỗi khi parse thông số kỹ thuật:', parseError);
                    return res.status(400).json({ error: 'Thông số kỹ thuật không hợp lệ' });
                }
            }

            // Lưu thông số kỹ thuật vào bảng Specification
            if (parsedSpecifications.length > 0) {
                const specPromises = parsedSpecifications.map((spec) =>
                    Specification.create({
                        SpecificationName: spec.SpecificationName,
                        SpecificationContent: spec.SpecificationContent,
                        ProductId: newProduct.ProductId
                    })
                );
                await Promise.all(specPromises); 
            }

            res.status(201).json({ message: 'Thêm sản phẩm thành công', productId: newProduct.ProductId });
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            res.status(500).json({ error: error.message });
        }
    });
};
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        if (product.Avatar && fs.existsSync(product.Avatar)) {
            fs.unlinkSync(product.Avatar);
        }
        await Image.destroy({
            where: {
                ProductId: id 
            }
        });
        await Specification.destroy({
            where: {
                ProductId: id 
            }
        });
        await product.destroy();
        res.json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).json({ error: error.message });
    }
};
//
exports.getProductDetails = async (req, res) => {
    try {
      const { id } = req.params; // Lấy id từ URL
      const product = await Product.findByPk(id, {
        include: [Brand, Specification]  
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
      }
  
      res.json(product); 
    } catch (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      res.status(500).json({ error: error.message });
    }
  };
// Thêm vào phần các route của bạn
exports.searchProducts = async (req, res) => {
    const query = req.query.q; // Lấy từ khóa tìm kiếm từ query string
    try {
      const results = await Product.findAll({
        where: {
          ProductName: {
            [Op.like]: `%${query}%` // Sử dụng Op.like thay cho $like
          },
        },
      });
      res.json(results);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error); // Log chi tiết lỗi
      res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm", error });
    }
  };
  //Hiện thông số kĩ thuật
  exports.getProductSpecifications = async (req, res) => {
    try {
        const { productId } = req.params; // Lấy productId từ URL

        // Tìm tất cả các thông số kỹ thuật dựa trên ProductId
        const specifications = await Specification.findAll({
            where: { ProductId: productId },
        });

        if (specifications.length === 0) {
            return res.status(404).json({
                message: 'Không có thông số kỹ thuật nào cho sản phẩm này.',
            });
        }

        res.json({
            message: 'Thông số kỹ thuật của sản phẩm',
            data: specifications,
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông số kỹ thuật:', error);
        res.status(500).json({
            error: 'Lỗi khi lấy thông số kỹ thuật của sản phẩm',
            details: error.message,
        });
    }
};