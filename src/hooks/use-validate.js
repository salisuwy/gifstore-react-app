import { useState } from "react";

function validateLength(text, length){
    return text.trim().length >= length
}

function validateEmail(email){
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return pattern.test(email)
}

const useValidate = (entries) => {
  const [errors, setErrors] = useState({});

  function validate() {
    const newState = {};
    for (const { type, size, name, field } of entries) {
      if (type === "email" && validateEmail(field.current.value) === false) {
        newState[name] = true;
      }
      if (type === "length" && validateLength(field.current.value, size) === false) {
        newState[name] = true;
      }
    }
    setErrors({...newState});
    return (Object.keys(newState).length === 0)     // true or false
  }

  return { errors, validate };
};

export default useValidate;
