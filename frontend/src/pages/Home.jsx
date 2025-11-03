import React, { useEffect, useState } from "react";
import axios from "../api/api.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const { user, logout } = useAuth();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/services`);
        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else {
          console.warn("Unexpected services response:", res.data);
          setServices([]);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setServices([]);
      }
    };

    fetchData();

    // Scroll animation
    const fadeElems = document.querySelectorAll(".fade-in");
    const appearOnScroll = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("appear");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
     fadeElems.forEach(elem => appearOnScroll.observe(elem));

  // 👇 Auto-hide navbar on scroll
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector("header");

  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      navbar.classList.add("navbar--hidden");
    } else {
      navbar.classList.remove("navbar--hidden");
    }
    lastScrollY = window.scrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // Redirect to booking page
  const handleBookClick = (serviceTitle) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      navigate(`/booking?service=${encodeURIComponent(serviceTitle)}`);
    }
  };

  return (
    <>
      {/* ---------- Header ---------- */}
      <header>
        <div className="container nav">
          <h1 className="logo">
            <video
              src="assets/software.mp4"
              id="iconx"
              autoPlay
              loop
              muted
              playsInline
            />
            CodeNest
            <span>
              <sub>Developers</sub>
            </span>
          </h1>

          <nav>
            <ul className="nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              {!user ? (
                <li className="dropdown">
                  <a href="#" className="dropbtn">Account ▾</a>
                  <ul className="dropdown-content">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                  </ul>
                </li>
              ) : (
                <li className="dropdown">
                  <a href="#" className="dropbtn">Profile ▾</a>
                  <ul className="dropdown-content">
                    <li><Link to="/profile">View Profile</Link></li>
                    <li><Link onClick={logout} className="dropbtn">Logout</Link></li>
                  </ul>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* ---------- Hero Section ---------- */}
      <section id="home" className="hero fade-in">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <br/>
          <h2>Building Digital Experiences that Inspire</h2>
          <p>
            We create responsive websites, smart digital solutions, and stunning portfolios for modern brands.
          </p>
          <Link to="/#services"><button className="btn">Explore Services</button></Link>
        </div>
      </section>

      {/* ---------- Services Section ---------- */}
      <section id="services" className="section fade-in">
        <h2 className="section-title">Our Services</h2>
        <div className="container grid">
          <div className="card">
            <img src="assets/code.jpg" alt="Web Development" className="service-img" />
            <h3><u>Web Development</u></h3>
            <p>Custom websites and full-stack solutions using modern frameworks for speed, security, and performance.</p>
            <button className="btn" onClick={() => handleBookClick("Web Development")}>
              Book Now
            </button>
          </div>
          <div className="card">
            <img src="assets/writing.jpg" alt="Academic Writing" className="service-img" />
            <h3><u>Academic Writing</u></h3>
            <p>Expert academic writing with proper citations, formatting, and plagiarism-free research work.</p>
            <button className="btn" onClick={() => handleBookClick("Academic Writing")}>
              Book Now
            </button>
          </div>
          <div className="card">
            <img src="assets/SEO.jpg" alt="Digital Marketing" className="service-img" />
            <h3><u>Digital Marketing</u></h3>
            <p>SEO optimization, social media strategy, and creative campaigns to grow your digital footprint.</p>
            <button className="btn" onClick={() => handleBookClick("Digital Marketing")}>
              Book Now
            </button>
          </div>
        </div>
      </section>

{/* ---------- Portfolio ---------- */}
<section id="portfolio" className="section white fade-in">
  <h2 className="section-title">Recent Projects</h2>
  <div className="container grid">
    <div className="portfolio-item">
      <img src="assets/web.jpg" alt="Project 1" />
      <div className="portfolio-text">
        <h3>E-Commerce Website</h3>
        <a
          href="https://netsoko-mall-1.onrender.com/"
          target="_blank"
          rel="noreferrer"
          className="view-btn"
        >
          <i className="fas fa-external-link-alt"></i> View Project
        </a>
      </div>
    </div>

    <div className="portfolio-item">
      <img src="assets/git.jpg" alt="Project 2" />
      <div className="portfolio-text">
        <h3>GitHub Profile</h3>
        <a
          href="https://github.com/Alfonce-Mulumba"
          target="_blank"
          rel="noreferrer"
          className="view-btn"
        >
          <i className="fas fa-external-link-alt"></i> View Profile
        </a>
      </div>
    </div>

    <div className="portfolio-item">
      <img src="assets/code2.png" alt="Project 3" />
      <div className="portfolio-text">
        <h3>UI/UX</h3>
        <a
          href="https://netsoko-mall-1.onrender.com/"
          target="_blank"
          rel="noreferrer"
          className="view-btn"
        >
          <i className="fas fa-external-link-alt"></i> View Project
        </a>
      </div>
    </div>
  </div>
</section>

{/* ---------- About ---------- */}
<section id="about" className="section fade-in">
  <h2 className="section-title">About Us</h2>
  <div className="container about">
    <img src="assets/team.jpg" alt="Team" />
    <hr />
    <img src="assets/team2.jpg" alt="Mission" />
    <div style={{ textAlign: "center" }}>
      <h3>Who We Are</h3>
      <p>
        At <strong>CodeNest Developers</strong>, we are a team of dedicated web
        and digital experts helping businesses thrive online. Our mission is to
        deliver creative, data-driven, and reliable solutions that inspire trust
        and growth.
      </p>
      <p>
        <strong>Mission:</strong> To empower innovation through technology,
        design, and excellence.
      </p>
    </div>
  </div>
</section>

{/* ---------- Contact ---------- */}
<section id="contact" className="section light fade-in">
  <h2 className="section-title">Contact Us</h2>
  <div className="container contact">
    <div className="socials">
      {/* Contact info in one line */}
      <div className="contact-info">
        <span>
          <strong>Email:</strong>
          <a href="mailto:codenest.devs@gmail.com" className="line">
            <i className="fas fa-envelope"></i>{" "}
            <u style={{ color: "blue" }}>info@codenest.dev</u>
          </a>
        </span>
        <span className="separator">|</span>
        <span>
          <strong>Phone:</strong>
          <a href="tel:+254701156348" className="line">
            <i className="fas fa-phone-alt"></i>{" "}
            <u style={{ color: "blue" }}>+254 701 156 348</u>
          </a>
        </span>
        <span className="separator">|</span>
        <span>
          <strong>Website:</strong>
          <a
            href="https://www.codenest.dev"
            target="_blank"
            rel="noreferrer"
            className="line"
          >
            <i className="fas fa-globe"></i>{" "}
            <u style={{ color: "blue" }}>www.codenest.dev</u>
          </a>
        </span>
      </div>

      {/* Social icons centered below */}
      <div className="social-links">
        <a
          href="https://facebook.com/YourPage"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://twitter.com/YourProfile"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://linkedin.com/in/alfonce-mulumba"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          href="https://www.instagram.com/a.mulumba_?igsh=NHl4aDM1eTl4amJs"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a href="tel:+254701156348" className="social-icon">
          <i className="fas fa-phone-alt"></i>
        </a>
        <a
          href="https://wa.me/254701156348?text=Hello%20CodeNest%20Developers!"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
                <a
          href="https://github.com/Alfonce-Mulumba"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  </div>
</section>


      {/* ---------- Footer ---------- */}
      <footer>
        <p>
          © 2025 CodeNest Developers | Designed with ❤️ by <strong>The CodeNest Team</strong>{" "}
        </p>
      </footer>
    </>
  );
};

export default Home;
