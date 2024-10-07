"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "../InputBox";
import { Button } from "@/components/ui/button";
// import CountryCode from "../misc/CountryFlag";
import { useUserStore } from "@/utils/userStore";

const AuthForm: React.FC = () => {
  const router = useRouter();
  const { userData, setUserData, clearUser } = useUserStore();

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isOtpLogin, setIsOtpLogin] = useState(false);

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("LoginviaPassword");
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!validateEmail(credentials.email)) {
      toast.error("Please enter a valid Gmail address.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();

        toast.success("Login successful!");

        setUserData(data.user, data.token);

        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  useEffect(() => {
    if (userData) {
      router.push("/");
    } else {
      clearUser();
    }
  }, [userData]);

  const sendOTPforlogin = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      });

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } else {
      }
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error("Error sending OTP:", error);
    }
  }, [credentials.email]);

  const verifyOTPforlogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/loginWithOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful OTP verification (e.g., log the user in, redirect, etc.)
        console.log("OTP verified successfully:", data);
        console.log(data.user);
        toast.success("Login successful!");

        setUserData(data.user, data.token);
        router.push("/");
      } else {
        // Handle error (e.g., show an error message to the user)
        console.error("Error verifying OTP:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("/api/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      });

      if (response.ok) {
        toast.success("Email sent successfully!");
      } else {
        toast.error("Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send password reset request");
      console.error("Error sending password reset request:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={isOtpLogin ? verifyOTPforlogin : handleSubmitLogin}
        className="flex flex-col justify-between gap-4 lg:h-[60%] xl:h-1/2"
      >
        <div className="flex flex-col gap-1">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleCredentialsChange}
          />

          <div
            onClick={() => setIsOtpLogin(!isOtpLogin)}
            className="text-default text-left font-semibold px-4"
          >
            {isOtpLogin ? "Login with Password" : "Login via OTP"}
          </div>
        </div>

        {isOtpLogin ? (
          <div className="relative w-full flex flex-col">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              autoComplete="off"
              className="w-full px-2 py-3 border-1 bg-white outline-none rounded-md text-black placeholder:text-gray-400 placeholder:font-semibold placeholder:text-l focus:border-default-foreground focus:font-semibold  hover:border-default-foreground transition-all duration-300"
            />
            <button className="font-semibold text-left text-default px-4 absolute bottom-0 translate-y-full ">
              Didn&apos;t Receive OTP yet?
            </button>
            <button
              type="button"
              onClick={sendOTPforlogin}
              className="absolute font-semibold right-2 top-[30%] transform -translate-y-1/2 bg-purple-500 text-white p-2 rounded-sm text-xs transition-all duration-300 hover:shadow-lg hover:bg-purple-600"
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleCredentialsChange}
            />
            <div
              onClick={handleForgotPassword}
              className="font-semibold text-default text-left px-4 "
            >
              Forgot Password
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-12 mb-4">
          <div className="text-gray-500 font-semibold">
            <span className="text-sm">Don&apos;t have an account? &nbsp;</span>{" "}
            <Link href="/register" className="text-default font-semibold">
              Register
            </Link>
          </div>
          <Button
            type="submit"
            className="bg-default text-white pl-4 pr-2 py-6 rounded-full flex items-center gap-3 hover:scale-105 hover:bg-default transition-all duration-200  "
          >
            <span className="font-bold md:text-xl">Sign In</span>
            <Image
              src={"/auth/arrow.svg"}
              alt="arrow"
              className="w-8 h-8 -rotate-90"
              width={100}
              height={100}
            />
          </Button>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
