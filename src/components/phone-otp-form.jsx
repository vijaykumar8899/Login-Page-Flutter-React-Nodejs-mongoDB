import React, { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setshowOtpInput] = useState(false);
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleSubmitButton = (event) => {
    event.preventDefault();

    //phoneNumber validation here
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    //if eveything is good then we call api and that sends otp to phoneNumber
    //and then show Otp field to user
    setshowOtpInput(true);
  };
  const onOtpSubmit = (otp) => {
    console.log("Login successfull", otp);
  };
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handleSubmitButton}>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumber}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter Otp send to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
