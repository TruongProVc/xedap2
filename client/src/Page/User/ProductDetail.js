import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [productdetails, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specifications, setSpecifications]=useState([]);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        //call tới để chuyển sang trang detail
        const response = await fetch(`http://localhost:3000/productdetails/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSpecifications = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}/specifications`);
        if (!response.ok) throw new Error('Failed to fetch specifications');
        const data = await response.json();
        setSpecifications(data.data); // Lấy mảng specifications từ API
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProductDetails();
    fetchSpecifications();
  }, [id]);

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

 


return (
  <>
    <div className="breadcrumb-section breadcrumb-bg-color--golden">
      <div className="breadcrumb-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="breadcrumb-title">Chi tiết sản phẩm</h3>
              <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                <nav aria-label="breadcrumb">
                  <ul>
                    <li>
                      <a href="index.html">Trang chủ - Chi tiết sản phẩm </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>{" "}
    {/* ...:::: End Breadcrumb Section:::... */}
    {/* Start Product Details Section */}
    <div className="product-details-section">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-6">
            <div
              className="product-details-gallery-area"
              data-aos="fade-up"
              data-aos-delay={0}
            >
              {/* Start Large Image */}
              <div className="product-large-image product-large-image-horaizontal swiper-container">
              <div className="swiper-wrapper">
                <div className="product-image-large-image">
                  <img
                    src={`http://localhost:3000/uploads/${productdetails.Avatar}`} // Đường dẫn ảnh
                    alt={productdetails.ProductName}
                  />
                </div>
              </div>
            </div>

              {/* End Large Image */}
              {/* Start Thumbnail Image */}
              <div className="product-image-thumb product-image-thumb-horizontal swiper-container "></div>
              {/* End Thumbnail Image */}
            </div>
          </div>
          <div className="col-xl-7 col-lg-6">
            <div
              className="product-details-content-area "
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {/* Start  Product Details Text Area*/}
              <div className="product-details-text">
                <h4 className="title">{productdetails.ProductName}</h4>
                <div className="d-flex align-items-center">
                  <ul className="review-star">
                    <li className="fill">
                      <i className="ion-android-star" />
                    </li>
                    <li className="fill">
                      <i className="ion-android-star" />
                    </li>
                    <li className="fill">
                      <i className="ion-android-star" />
                    </li>
                    <li className="fill">
                      <i className="ion-android-star" />
                    </li>
                    <li className="empty">
                      <i className="ion-android-star" />
                    </li>
                  </ul>
                </div>
                <div className="price">{Number(productdetails.Price).toLocaleString()} VNĐ</div>
                <p>
                 Mổ tả :{productdetails.Description}
                </p>
              </div>{" "}
              {/* End  Product Details Text Area*/}
              {/* Start Product Variable Area */}
              <div className="product-details-variable">
                {/* Product Variable Single Item */}
                <div className="variable-single-item">
                  <div className="product-stock">
                    {" "}
                    <span className="product-stock-in">
                      <i className="ion-checkmark-circled" />
                    </span>{" "}
                    200 IN STOCK
                  </div>
                </div>
                {/* Product Variable Single Item */}
                
                {/* Product Variable Single Item */}
                <div className="d-flex align-items-center ">
                  <div className="product-add-to-cart-btn">
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#modalAddcart"
                    >
                      {" "}
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>{" "}
              {/* End Product Variable Area */}
            
            </div>
          </div>
        </div>
      </div>
    </div>{" "}
    {/* End Product Details Section */}
    {/* Start Product Content Tab Section */}
    <div className="product-details-content-tab-section section-top-gap-100">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div
          className="product-details-content-tab-wrapper"
          data-aos="fade-up"
          data-aos-delay={0}
        >
          {/* Start Product Details Tab Button */}
          <ul className="nav tablist product-details-content-tab-btn d-flex justify-content-center">
            <li>
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="#specifications"
              >
                Thông số kỹ thuật</a>
            </li>
          </ul>
          {/* End Product Details Tab Button */}
          {/* Start Product Details Tab Content */}
          <div className="product-details-content-tab">
            <div className="tab-content">
              {/* Start Product Details Tab Content Single */}
              <div className="tab-pane active show" id="specifications">
                <div className="single-tab-content-item">
                  {/* Start - Technical Specifications Table */}
                  <div className="specifications-table-wrapper">
                    <table className="table table-bordered">
                    <tbody>
                    {specifications.length > 0 ? (
                      specifications.map((spec, index) => (
                        <tr key={index}>
                          <th>{spec.SpecificationName}</th>
                          <td>{spec.SpecificationContent}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">Không có thông số kỹ thuật nào.</td>
                      </tr>
                    )}
                  </tbody>
                    </table>
                  </div>
                  {/* End - Technical Specifications Table */}
                </div>
              </div>
              {/* End Product Details Tab Content Single */}
            </div>
          </div>
          {/* End Product Details Tab Content */}
        </div>
      </div>
    </div>
  </div>
</div>

    {/* End Product Content Tab Section */}
  </>
    );
  };
export default ProductDetails;
