import React from "react";
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => (
  <motion.section 
    className="home-container"
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
  >
    <h2 className="home-title">Welcome to Move Smart</h2>
    <p className="home-description">
      <span className="text-muted">Move Smart is</span> an <strong className="highlight">AI-powered traffic management system</strong> designed to improve urban mobility. Using real-time video analysis, it reduces congestion, prioritizes emergency vehicles, and provides live analytics.
    </p>

    <div className="feature-grid">
      <div className="feature-card border-green">
        <h3 className="feature-title text-green">🚦 Adaptive Signal Control</h3>
        <p className="feature-description">Automatically optimizes traffic flow by adjusting signal timings in real-time based on vehicle density.</p>
      </div>

      <div className="feature-card border-yellow">
        <h3 className="feature-title text-yellow">🚑 Emergency Vehicle Detection</h3>
        <p className="feature-description">Prioritizes ambulances, police cars, and fire engines using computer vision and object detection.</p>
      </div>

      <div className="feature-card border-blue">
        <h3 className="feature-title text-blue">📊 Insightful Analytics</h3>
        <p className="feature-description">Real-time charts and graphs offer insights into traffic trends, enabling smarter decisions by authorities.</p>
      </div>

      <div className="feature-card border-purple">
        <h3 className="feature-title text-purple">🛠️ Tech Stack</h3>
        <p className="feature-description">Built with <span className="bold">React</span>, <span className="bold">FastAPI</span>, <span className="bold">OpenCV</span>, and <span className="bold">YOLOv8</span> for a seamless and intelligent experience.</p>
      </div>
    </div>

    <div className="quote">Empowering cities with smarter traffic management — one intersection at a time.</div>

    {/* Call to Action Section */}
    <div className="cta">
      <h3 className="cta-title">🚀 Ready to See It in Action?</h3>
      <p className="cta-description">Explore the live traffic feed or dive into analytics to experience the future of intelligent traffic control.</p>
      <div className="cta-buttons">
        <a href="/live" className="btn btn-dark">Live Feed</a>
        <a href="/analytics" className="btn btn-light">Analytics</a>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="faq-section">
      <h3 className="faq-title">📚 Frequently Asked Questions</h3>
      <div className="faq-item">
        <h4 className="faq-question">🔍 How does Move Smart detect vehicles?</h4>
        <p className="faq-answer">We use YOLOv8 and OpenCV for real-time object detection through video feeds from installed cameras.</p>
      </div>
      <div className="faq-item">
        <h4 className="faq-question">📡 What data is used to analyze traffic?</h4>
        <p className="faq-answer">We process live camera footage to estimate vehicle counts and congestion levels, then visualize this data for city planners.</p>
      </div>
      <div className="faq-item">
        <h4 className="faq-question">🚑 How are emergency vehicles prioritized?</h4>
        <p className="faq-answer">Emergency vehicles are detected using object recognition and their presence is communicated to the signal controller to provide green passage.</p>
      </div>
      <div className="faq-item">
        <h4 className="faq-question">🌐 Can this be deployed in real cities?</h4>
        <p className="faq-answer">Yes, our modular API and flexible frontend allow for city-wide or zone-specific deployments.</p>
      </div>
    </div>

  </motion.section>
);

export default Home;
