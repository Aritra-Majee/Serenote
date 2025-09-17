import "./Home.css";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import tree  from "../../assets/tree.jpeg"

function Home() {
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
        <>
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-left">
                        <h1>Track Your Mood<br />Effectively</h1>
                    </div>
                    <div className="hero-righ">
                        <p>
                            Introducing Sereneote, a smart and intuitive Mood Tracker designed to help
                            you stay in tune with your feelings, understand emotional patterns, and take
                            charge of your mental health.
                        </p>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={tree} alt="Mood Tree" />
                </div>
            </section>
            <section className="offerings-section">
                <div className="container">
                    <h2 className="section-title">Explore Our Offerings</h2>
                    <br />

                    <div className="offerings-grid">
                        <div className="offering-card">
                            <span className="offering-number">01.</span>
                            <h3>Easy Mood Logging</h3>
                            <p>Log your moods effortlessly with Serenote, making it simple to track your emotional well-being.</p>
                        </div>

                        <div className="offering-card">
                            <span className="offering-number">02.</span>
                            <h3>Visualize Emotions</h3>
                            <p>Easily visualize your emotions through interactive charts, helping you understand your mood patterns.</p>
                        </div>

                        <div className="offering-card">
                            <span className="offering-number">03.</span>
                            <h3>Track Daily Habits</h3>
                            <p>Effortlessly track your daily habits to improve your overall well-being and mental health.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cta-section">
                <div className="container cta-container">
                    <div className="cta-text">
                        <h2>Start Tracking Now</h2>
                    </div>
                    <button className="cta-button" onClick={handleClick}>JOIN US NOW</button>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <div className="features-header">
                        <div>
                            <h2>Why Choose Us for Mood Tracking?</h2>
                        </div>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="icon">⭐</div>
                            <h3>User-Friendly Interface</h3>
                            <p>Track your mood with ease using our clean and simple layout.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">👤</div>
                            <h3>Visualize Your Emotions</h3>
                            <p>See how your feelings change over time with smart charts.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">🏅</div>
                            <h3>Promote Emotional Well-Being</h3>
                            <p>Build healthy emotional habits with daily reflections.</p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}

export default Home;


// https://images.pexels.com/photos/32981343/pexels-photo-32981343.jpeg?w=1280