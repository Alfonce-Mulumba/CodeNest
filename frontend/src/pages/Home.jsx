import React, { useEffect, useState } from "react";
import axios from "../api/api.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

// Auto-hide navbar with smart reveal (only at top or on hover)
let lastScrollY = window.scrollY;
const navbar = document.querySelector("header");

const handleScroll = () => {
  if (!navbar) return;

  const currentScrollY = window.scrollY;

  // Always hide when scrolling down
  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    navbar.classList.add("navbar--hidden");
  }

  // Only show if scrolled back to top
  if (currentScrollY < 50) {
    navbar.classList.remove("navbar--hidden");
  }

  lastScrollY = currentScrollY;
};

// Show when hovering near the top of the screen
const handleMouseMove = (e) => {
  if (e.clientY < 80) {
    navbar.classList.remove("navbar--hidden");
  }
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("mousemove", handleMouseMove);

return () => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("mousemove", handleMouseMove);
};
  }, []);

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

    {/* --- Web Development --- */}
    <div className="card">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="service-swiper"
      >
        <SwiperSlide><img src="assets/code.jpg" alt="Web Development" /></SwiperSlide>
        <SwiperSlide><img src="assets/code7.jpg" alt="Frontend" /></SwiperSlide>
        <SwiperSlide><img src="assets/code2.png" alt="Backend" /></SwiperSlide>
        <SwiperSlide><img src="assets/code4.jpg" alt="Backend" /></SwiperSlide>
        <SwiperSlide><img src="assets/code6.jpg" alt="Backend" /></SwiperSlide>

      </Swiper>
      <h3><u>Web Development</u></h3>
      <p>Custom websites and full-stack solutions using modern frameworks for speed, security, and performance.</p>
      <button className="btn" onClick={() => handleBookClick("Web Development")}>
        Book Now
      </button>
    </div>

    {/* --- Academic Writing --- */}
    <div className="card">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="service-swiper"
      >
        <SwiperSlide><img src="assets/writing.jpg" alt="Academic Writing" /></SwiperSlide>
        <SwiperSlide><img src="assets/academic2.jpg" alt="Research Work" /></SwiperSlide>
        <SwiperSlide><img src="assets/academic3.jpg" alt="Research Work" /></SwiperSlide>

      </Swiper>
      <h3><u>Academic Writing</u></h3>
      <p>Expert academic writing with proper citations, formatting, and plagiarism-free research work.</p>
      <button className="btn" onClick={() => handleBookClick("Academic Writing")}>
        Book Now
      </button>
    </div>

    {/* --- Digital Marketing --- */}
    <div className="card">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="service-swiper"
      >
        <SwiperSlide><img src="assets/SEO.jpg" alt="Digital Marketing" /></SwiperSlide>
        <SwiperSlide><img src="assets/SEO2.jpg" alt="Campaign Strategy" /></SwiperSlide>
        <SwiperSlide><img src="assets/SEO3.jpg" alt="Campaign Strategy" /></SwiperSlide>

      </Swiper>
      <h3><u>Digital Marketing</u></h3>
      <p>SEO optimization, social media strategy, and creative campaigns to grow your digital footprint.</p>
      <button className="btn" onClick={() => handleBookClick("Digital Marketing")}>
        Book Now
      </button>
    </div>
  </div>
</section>

{/* ---------- Portfolio Section ---------- */}
<section id="portfolio" className="section white fade-in">
  <h2 className="section-title">Recent Projects</h2>
  <div className="container grid">

    {/* E-Commerce Project */}
    <div className="portfolio-item">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2700, disableOnInteraction: false }}
        loop
        className="portfolio-swiper"
      >
        <SwiperSlide><img src="assets/web.jpg" alt="E-commerce 1" /></SwiperSlide>
        <SwiperSlide><img src="assets/SEO4.jpg" alt="E-commerce 2" /></SwiperSlide>
        <SwiperSlide><img src="assets/SEO5.jpg" alt="E-commerce 2" /></SwiperSlide>

      </Swiper>
      <div className="portfolio-text">
        <h3>E-Commerce Website</h3>
        <a href="https://netsoko-mall-1.onrender.com/" target="_blank" rel="noreferrer" className="view-btn">
          <i className="fas fa-external-link-alt"></i> View Project
        </a>
      </div>
    </div>

    {/* GitHub Project */}
    <div className="portfolio-item">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        loop
        className="portfolio-swiper"
      >
        <SwiperSlide><img src="assets/git.jpg" alt="GitHub Project 1" /></SwiperSlide>
        <SwiperSlide><img src="assets/git1.jpg" alt="GitHub Project 2" /></SwiperSlide>
      </Swiper>
      <div className="portfolio-text">
        <h3>GitHub Profile</h3>
        <a href="https://github.com/Alfonce-Mulumba" target="_blank" rel="noreferrer" className="view-btn">
          <i className="fas fa-external-link-alt"></i> View Profile
        </a>
      </div>
    </div>

    {/* UI/UX */}
    <div className="portfolio-item">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        className="portfolio-swiper"
      >
        <SwiperSlide><img src="assets/code9.jpg" alt="UI/UX 1" /></SwiperSlide>
        <SwiperSlide><img src="assets/SEO6.jpg" alt="UI/UX 2" /></SwiperSlide>
      </Swiper>
      <div className="portfolio-text">
        <h3>UI/UX Design</h3>
        <a href="https://netsoko-mall-1.onrender.com/" target="_blank" rel="noreferrer" className="view-btn">
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
      <h3><u>Who We Are</u></h3>
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
          href="https://x.com/codenest_devs"
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
          href="https://www.instagram.com/a.mulumba_"
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


      <footer>
        <p>
          © 2025 CodeNest Developers | Designed with ❤️ by <strong>The CodeNest Team</strong>{" "}
        </p>
      </footer>
    </>
  );
};

export default Home;
