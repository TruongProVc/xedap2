import React from "react";
const AboutUs =()=>{
    return(
        <>
          <div className="breadcrumb-section breadcrumb-bg-color--golden">
            <div className="breadcrumb-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="breadcrumb-title">Về chúng tôi</h3>
                            <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  <div className="about-top">
    <div className="container">
      <div className="row d-flex align-items-center justify-content-between d-sm-column">
        <div className="col-md-6">
          <div className="about-img" data-aos="fade-up" data-aos-delay={0}>
            <div className="img-responsive">
              <img src="/images/about/img-about.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content" data-aos="fade-up" data-aos-delay={200}>
            <h3 className="title">ABOUT OUR HONO STORE</h3>
            <h5 className="semi-title">
              We believe that every project existing in digital world is a
              result of an idea and every idea has a cause.
            </h5>
            <p>
              For this reason, our each design serves an idea. Our strength in
              design is reflected by our name, our care for details. Our
              specialist won't be afraid to go extra miles just to approach near
              perfection. We don't require everything to be perfect, but we need
              them to be perfectly cared for. That's a reason why we are willing
              to give contributions at best. Not a single detail is missed out
              under Billey's professional eyes.The amount of dedication and
              effort equals to the level of passion and determination. Get
              better, together as one.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End About Top */}
  {/* Start Service Section */}
  <div className="service-promo-section section-top-gap-100">
    <div className="service-wrapper">
      <div className="container">
        <div className="row">
          {/* Start Service Promo Single Item */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div
              className="service-promo-single-item"
              data-aos="fade-up"
              data-aos-delay={0}
            >
              <div className="image">
                <img src="/images/icons/icon_about1.jpg" alt="" />
              </div>
              <div className="content">
                <h6 className="title">Creative Always</h6>
                <p>
                  Stay creative with Billey and the huge collection of premade
                  elements, layouts &amp; effects.
                </p>
              </div>
            </div>
          </div>
          {/* End Service Promo Single Item */}
          {/* Start Service Promo Single Item */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div
              className="service-promo-single-item"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="image">
                <img src="/images/icons/icon_about2.jpg" alt="" />
              </div>
              <div className="content">
                <h6 className="title">Express Customization</h6>
                <p>
                  Easy to install and configure the theme customization in a few
                  clicks with Billey.
                </p>
              </div>
            </div>
          </div>
          {/* End Service Promo Single Item */}
          {/* Start Service Promo Single Item */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div
              className="service-promo-single-item"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <div className="image">
                <img src="/images/icons/icon_about3.jpg" alt="" />
              </div>
              <div className="content">
                <h6 className="title">Premium Integrations</h6>
                <p>
                  Integrated premium plugins in Billey is the secret weapon for
                  your business to thrive.
                </p>
              </div>
            </div>
          </div>
          {/* End Service Promo Single Item */}
          {/* Start Service Promo Single Item */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div
              className="service-promo-single-item"
              data-aos="fade-up"
              data-aos-delay={600}
            >
              <div className="image">
                <img src="/images/icons/icon_about4.jpg" alt="" />
              </div>
              <div className="content">
                <h6 className="title">Real-time Editing</h6>
                <p>
                  Edit your work and preview the changes on the screen live with
                  advanced page builder.
                </p>
              </div>
            </div>
          </div>
          {/* End Service Promo Single Item */}
        </div>
      </div>
    </div>
  </div>
  {/* End Service Section */}
</>

    )
}
export default AboutUs;