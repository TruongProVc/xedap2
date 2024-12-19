import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [priceFilters, setPriceFilters] = useState({});

  // Fetch brands
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

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Update filtered products based on brand and price filters
  useEffect(() => {
    let filtered = products;

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter((product) => product.IdBrand === selectedBrand);
    }

    // Filter by price
    const activePriceFilters = Object.keys(priceFilters).filter(
      (key) => priceFilters[key]
    );

    if (activePriceFilters.length > 0) {
      const priceRanges = {
        under5m: (price) => price < 5000000,
        "5m-10m": (price) => price >= 5000000 && price <= 10000000,
        "10m-20m": (price) => price > 10000000 && price <= 20000000,
        "20m-50m": (price) => price > 20000000 && price <= 50000000,
        "50m-200m": (price) => price > 50000000 && price <= 200000000,
        above200m: (price) => price > 200000000,
      };

      filtered = filtered.filter((product) =>
        activePriceFilters.some((key) => priceRanges[key](product.Price))
      );
    }

    setFilteredProducts(filtered);
  }, [selectedBrand, priceFilters, products]);

  const handleBrandClick = (brandId) => {
    setSelectedBrand(brandId);
  };

  const handlePriceFilterChange = (range) => {
    setPriceFilters((prevFilters) => ({
      ...prevFilters,
      [range]: !prevFilters[range],
    }));
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="breadcrumb-section breadcrumb-bg-color--golden  ">
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
                      <li>
                        <a href="###" onClick={() => setSelectedBrand(null)}>
                          Tất cả
                        </a>
                      </li>
                      {brands.map((brand) => (
                        <li key={brand.BrandId}>
                          <a
                            href="###"
                            onClick={() => handleBrandClick(brand.BrandId)}
                          >
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
                      {[
                        { label: "Dưới 5.000.000 VNĐ", value: "under5m" },
                        { label: "5.000.000 - 10.000.000 VNĐ", value: "5m-10m" },
                        { label: "10.000.000 - 20.000.000 VNĐ", value: "10m-20m" },
                        { label: "20.000.000 - 50.000.000 VNĐ", value: "20m-50m" },
                        { label: "50.000.000 - 200.000.000 VNĐ", value: "50m-200m" },
                        { label: "Trên 200.000.000 VNĐ", value: "above200m" },
                      ].map((range) => (
                        <li key={range.value} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                          <label>
                            <input
                              type="checkbox"
                              name="price-range"
                              checked={priceFilters[range.value] || false}
                              onChange={() => handlePriceFilterChange(range.value)}
                            />
                          </label>
                          <span style={{ marginLeft: '10px' }}>{range.label}</span>
                        </li>
                      ))}
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
                    <div
                      className="col-lg-4 col-md-6 col-sm-12 mb-4"
                      key={product.ProductId}
                    >
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
                              <a href="#">{product.ProductName.split(' ').slice(0, 4).join(' ')}{product.ProductName.split(' ').length > 6 ? '...' : ''}
                              </a>
                            </h6>
                          </div>
                          <div className="content-right">
                            <span className="price" style={{ fontSize: "14px", color: "#c42241" }}>
                              {Number(product.Price).toLocaleString()} VNĐ
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p>Không có sản phẩm phù hợp.</p>
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
