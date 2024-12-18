import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [priceRange, setPriceRange] = useState(null);

  //call tới hiện brand
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:3000/brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  //call tới hiện products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleBrandClick = (brandId) => {
    setSelectedBrand((prevBrand) => (prevBrand === brandId ? null : brandId));
  };
  
  //lọc giá tiền
  const handlePriceRangeChange = (range) => {
    setPriceRange((prevRange) => (prevRange === range ? null : range));
  };
  

 
// xử lí lọc giá tiền 
  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrand ? product.BrandId === selectedBrand : true;
    const matchesPrice =
      priceRange === null
        ? true  
        : priceRange === "under5m"
        ? product.Price < 5000000
        : priceRange === "5m-10m"
        ? product.Price >= 5000000 && product.Price <= 10000000
        : priceRange === "10m-20m"
        ? product.Price > 10000000 && product.Price <= 20000000
        : priceRange === "20m-50m"
        ? product.Price > 20000000 && product.Price <= 50000000
        : priceRange === "50m-200m"
        ? product.Price > 50000000 && product.Price <= 200000000
        : priceRange === "above200m"
        ? product.Price > 200000000
        : true;

    return matchesBrand && matchesPrice;
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="breadcrumb-section">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="breadcrumb-title">Tất cả sản phẩm</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Section */}
      <div className="shop-section">
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="siderbar-section">
                {/* Filter by Brand */}
                <div className="sidebar-single-widget">
                  <h6 className="sidebar-title">Thương hiệu</h6>
                  <div className="sidebar-content">
                    <ul className="sidebar-menu">
                      {brands.map((brand) => (
                        <li key={brand.brandId}>
                          <a href="###">
                            {brand.BrandName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Filter by Price */}
                <div className="sidebar-single-widget">
                  <h6 className="sidebar-title">Lọc theo giá</h6>
                  <div className="sidebar-content">
                    <ul style={{ listStyleType: "none", padding: 0, fontSize: '17px', margin: 10 }}>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                        <label>
                          <input
                            type="checkbox"
                            name="price-range"
                            checked={priceRange === "under5m"}
                            onChange={() => handlePriceRangeChange("under5m")}
                          />
                        </label>
                        <span style={{ marginLeft: '10px' }}>Dưới 5.000.000 VNĐ</span>
                      </li>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                        <label>
                          <input
                            type="checkbox"
                            name="price-range"
                            checked={priceRange === "5m-10m"}
                            onChange={() => handlePriceRangeChange("5m-10m")}
                          />
                        </label>
                        <span style={{ marginLeft: '10px' }}>5.000.000 - 10.000.000 VNĐ</span>
                      </li>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                        <label>
                          <input
                            type="checkbox"
                            name="price-range"
                            checked={priceRange === "10m-20m"}
                            onChange={() => handlePriceRangeChange("10m-20m")}
                          />
                        </label>
                        <span style={{ marginLeft: '10px' }}>10.000.000 - 20.000.000 VNĐ</span>
                      </li>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                        <label>
                          <input
                            type="checkbox"
                            name="price-range"
                            checked={priceRange === "20m-50m"}
                            onChange={() => handlePriceRangeChange("20m-50m")}
                          />
                        </label>
                        <span style={{ marginLeft: '10px' }}>20.000.000 - 50.000.000 VNĐ</span>
                      </li>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                        <label>
                          <input
                            type="checkbox"
                            name="price-range"
                            checked={priceRange === "50m-200m"}
                            onChange={() => handlePriceRangeChange("50m-200m")}
                          />
                        </label>
                        <span style={{ marginLeft: '10px' }}>50.000.000 - 200.000.000 VNĐ</span>
                      </li>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                        <label>
                          <input
                            type="checkbox"
                            name="price-range"
                            checked={priceRange === "above200m"}
                            onChange={() => handlePriceRangeChange("above200m")}
                          />
                        </label>
                        <span style={{ marginLeft: '10px' }}>Trên 200.000.000 VNĐ</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Product List */}
            <div className="col-lg-9">
              <div className="row">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
                      <div className="product-default-single-item">
                        <div className="image-box">
                          <Link to={`/productdetails/${product.ProductId}`}>
                            <img
                              src={`http://localhost:3000/uploads/${product.Avatar}`}
                              alt={product.ProductName}
                            />
                          </Link>
                          <div className="action-link">
                              <div className="action-link-left">
                                <a
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalAddcart"
                                >
                                  Add to Cart
                                </a>
                              </div>
                            </div>
                        </div>
                        <div className="content" style={{ textAlign: "center" }}>
                          <div className="content-left" style={{ marginBottom: "30px" }}>
                            <h6 className="title" style={{ margin: "2", fontSize: "16px" }}>
                              <a href="#">{product.ProductName}</a>
                            </h6>
                          </div>
                          <div className="content-right">
                            <span className="price" style={{ fontSize: "14px", color: "#333" }}>
                              {Number(product.Price).toLocaleString()} VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p>Không có sản phẩm trong mức giá này</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProduct;
