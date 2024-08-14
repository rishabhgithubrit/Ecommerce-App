import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
    return (
        <Layout title={"About us - Ecommer app"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/about.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <p className="text-justify mt-2">

                        Our E-commerce app is your ultimate online shopping destination, designed to provide you with a seamless and delightful shopping experience. We offer a vast selection of products across various categories, ensuring you can find everything you need in one place. With user-friendly navigation, secure payment options, and swift delivery services, we are committed to making your shopping journey hassle-free. Explore exclusive deals and discounts, stay updated with the latest trends, and shop with confidence knowing that customer satisfaction is our top priority. Join our vibrant community of shoppers today and experience the future of convenient online shopping.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;