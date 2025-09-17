import Swal from 'sweetalert2'
import { useState } from "react";

function ContactUs() {

    const [stateData, setStateData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setStateData({ ...stateData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        const formData = new FormData(event.target);

        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        setLoading(false);

        if (res.success) {
            Swal.fire({
                title: "Success",
                text: "Message sent successfully !",
                icon: "success"
            });
            setStateData({ name: "", email: "", message: "" });
        }

        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form
                className="p-4"
                style={{ minWidth: "500px" }}
                onSubmit={onSubmit}
            >
                <h3 className="text-center mb-4">Contact Us</h3>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label"></label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                        value={stateData.name}
                        onChange={handleChange}
                        placeholder="Enter Your Name"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label"></label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                        value={stateData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"

                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="note" className="form-label"></label>
                    <textarea
                        className="form-control"
                        id="note"
                        name="message"
                        required
                        rows="5"
                        placeholder="Enter Your Message..."
                        value={stateData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                        </>
                    ) : (
                        "Submit"
                    )}
                </button>

            </form>
        </div>
    );
}

export default ContactUs;