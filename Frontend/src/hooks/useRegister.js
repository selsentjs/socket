import { useState } from "react";
import toast from "react-hot-toast";

const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true)
    try {
      // localhost:3000 added in vite.config.js
      const res = await fetch("/api/auth/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      console.log(data);
      if(data.error){
        throw new Error(data.error)
      }

      // store data to local storage
      // context
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, register}
};

export default useRegister;

// handleInputErrors

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("password don't match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
