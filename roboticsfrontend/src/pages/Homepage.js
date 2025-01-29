import React from "react";
import { FaChartLine, FaUsers, FaRobot } from "react-icons/fa"; // Import icons

const LandingPage = () => {
  return (
    <>
      {/* Hero Section - Full Screen */}
      <section
        className="container-fluid d-flex align-items-center text-center"
        id="hero"
        style={{ minHeight: "87vh", background: "#f8f9fa" }}
      >
        <div className="row w-100 align-items-center">
          <div className="col-md-6 text-start px-5">
            <h1 className="fw-bold display-2 text-primary">AI-Powered RoboAdvisor</h1>
            <p className="text-muted lead">
              Revolutionizing financial planning with automated AI-driven investment strategies.
            </p>
            <p>
              Our platform helps you manage, optimize, and grow your investments with minimal effort.
            </p>
            <a href="#services" className="btn btn-lg btn-primary">
              Explore Services
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/images/finance.png"
              className="img-fluid"
              alt="Financial Growth"
              style={{ maxHeight: "100vh" }}
            />
          </div>
        </div>
      </section>

      {/* Key Features Section with Box Shadow */}
      <section className="container mt-5 text-center" id="services">
        <h2 className="fw-bold display-5 mb-4">Key Features</h2>
        <div className="row">
          {[
            { title: "User Authentication & Profiles", desc: "Secure login with financial goals tracking.", icon: <FaUsers /> },
            { title: "Portfolio Management", desc: "Automated asset allocation based on user risk.", icon: <FaChartLine /> },
            { title: "Market Data Integration", desc: "Real-time market insights for investment decisions.", icon: <FaRobot /> },
            { title: "Performance Tracking", desc: "Track and analyze portfolio growth over time.", icon: <FaChartLine /> },
            { title: "Reporting & Notifications", desc: "Get reports and alerts on investment changes.", icon: <FaUsers /> },
          ].map((feature, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm border-0" style={{ borderRadius: "12px" }}>
                <div className="text-primary fs-1 mb-3">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p className="text-muted">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section - More Visual Appeal */}
      <section className="container mt-5 text-center" id="about">
        <h2 className="fw-bold display-5 mb-4">About Us</h2>
        <div className="row align-items-center">
          <div className="col-md-6 text-start px-5">
            <p className="lead">
              RoboAdvisor is an advanced AI-driven investment platform that helps individuals and businesses optimize
              their wealth. We bring the best financial technology to make investing easier for everyone.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2"><strong>✔ AI-Powered Strategies</strong> - Smart investments with automation.</li>
              <li className="mb-2"><strong>✔ Real-Time Market Insights</strong> - Stay updated with financial trends.</li>
              <li><strong>✔ Secure & Trusted</strong> - Your investments are in safe hands.</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img src="/images/robotics.png" className="img-fluid rounded shadow-lg" alt="About Us" />
          </div>
        </div>
      </section>

      {/* Footer (Hidden on Main Page Initially) */}
      <footer className="bg-dark text-light text-center py-3 mt-5 d-none d-md-block">
        <p>&copy; 2025 RoboAdvisor. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;
