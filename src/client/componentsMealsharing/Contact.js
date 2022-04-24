import "./Meal.css";
import React from "react";

function Contact() {
  return (
    <div className="contact-all">
      <div>
        <img src="https://d6scj24zvfbbo.cloudfront.net/768358dbaefc0cd27a210502c61ee7f9/200000453-8ac368bbcf/700/IMG_20130729_183130.jpg?ph=843dd46226"></img>
      </div>
      <div className="contact">
        <h1>Get In Touch</h1>
        <h3>Location</h3>
        <p>
          309 E 5th Street <br />
          btw 1st-2nd Av - 10003
          <br /> MANHATTAN - NEW YORK
        </p>

        <h3>Working Time</h3>
        <p>11 am - 10 pm</p>
      
        <h3>Phone No </h3>
        <p>(727) 202-6978</p>

        <h3>Services </h3>
        <p>Take-Out 3rd-party Delivery</p>
      </div>
    </div>
  );
}

export default Contact;
