import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // console.log(inputRefs);
  const handleChange = (index, e) => {
    const value = e.target.value;
    // console.log("value : ", value, "value.length :", value.length);
    if (isNaN(value)) return;
    // console.log("otp", otp);
    const newOtp = [...otp];
    //allow only one input ; here we are makring substrings of value and taking the last substring;
    newOtp[index] = value.substring(value.length - 1);
    // console.log("newOtp", newOtp);
    setOtp(newOtp);

    //after all 4 inputs filled we trigger setOtp
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    //move to next input if current field is filled.
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      if (newOtp[index + 1] === "") {
        inputRefs.current[index + 1].focus();
      } else {
        if (value && index < length - 1 && inputRefs.current[index + 2]) {
          inputRefs.current[index + 2].focus();
        }
      }
    }
  };
  const handleClick = (index) => {
    //setSelectionRange is used to select the string; now here we are using it to move the inputRefs to 1,1;
    inputRefs.current[index].setSelectionRange(1, 1);

    //other optional validation.
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
