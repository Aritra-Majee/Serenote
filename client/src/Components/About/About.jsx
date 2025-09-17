import "./About.css";
import { useAuth } from "../../Contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };


  return (
    <section className="about-section py-5">
      <div className="container text-center">
        {/* About Us */}
        <div className="mb-5">
          <h2 className="fw-bold mb-3">About Us</h2>
          <p className="lead text-muted">
            Welcome to <strong>Serenote!</strong> We are dedicated to providing a calming and
            user-friendly mood tracking experience to help you on your emotional journey.
          </p>
        </div>

        {/* Loved By Many */}
        <div className="loved-section p-5 rounded">
          <h3 className="fw-bold text-white mb-3">Loved By Many</h3>
          <p className="text-light mb-4">
            Serenote is trusted by users worldwide for its simple and effective mood tracking solutions.
          </p>

          {/* Star Ratings */}
          <div className="d-flex justify-content-center gap-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-star-fill star-icon"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            ))}
          </div>
        </div>
        
        <div className="container my-5">
          <div className="row align-items-stretch">
            {/* Left Section */}
            <div className="col-md-6 d-flex flex-column justify-content-center  ps-md-5 about-section">
              <div>
                <h4 className="fw-bold mb-3">Who We Are</h4>
                <p className="lead text-muted">
                  We’re a passionate team dedicated to helping individuals understand and track their emotional well-being. Our platform combines simplicity with insightful analytics, empowering you to notice patterns, improve self-awareness, and take small steps toward a happier life.
                </p>
              </div>
            </div>

            {/* Separator Line (only visible on medium and up) */}
            <div className="col-md-1 d-none d-md-flex justify-content-center">
              <div className="vertical-line"></div>
            </div>

            {/* Right Section */}
            <div className="col-md-5 d-flex flex-column justify-content-center ps-md-5 about-section">
              <div>
                <h4 className="fw-bold mb-3">Why We Built This</h4>
                <p className="lead text-muted">
                  Mental health is often overlooked in our busy lives. We wanted to build a tool that doesn’t just track moods, but also guides you toward healthier emotional habits with visual analytics, calendars, and timelines.
                </p>
              </div>
            </div>
          </div>
        </div>



      </div>

      <section className="cta-section">
        <div className="container cta-container">
          <div className="cta-text">
            <h2>Start Tracking Your Mood From Today</h2>
          </div>
          <button className="cta-button" onClick={handleClick}>JOIN US NOW</button>
        </div>
      </section>
    </section>
  );
}
