"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import InputBox from "../InputBox";
import { useUserStore } from "@/utils/userStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const { setUserData } = useUserStore();
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isOTPVerifing, setIsOTPVerifing] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    password: "",
    role: "user",
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value.trim(),
    }));
  };

  const sendOTP = async () => {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.companyName ||
      !user.password
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!validateEmail(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsOTPVerifing(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (res.ok) {
        setOtpSent(true);
        toast.success("OTP sent!");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
      console.error("Error sending OTP:", error);
    }
    setIsOTPVerifing(false);
  };

  const verifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }

    setIsOTPVerifing(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, otp }),
      });

      if (res.ok) {
        toast.success("OTP verified!");
        setOtpVerified(true);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying OTP");
    }
    setIsOTPVerifing(false);
  };

  const handleSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.companyName ||
      !user.password
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!validateEmail(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!otpVerified) {
      toast.error("Please verify OTP first.");
      return;
    }
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          companyName: user.companyName,
          password: user.password,
        }),
      });

      if (res.ok) {
        const userData = await res.json();
        toast.success("Registration successful!");
        setUserData(userData.user, userData.token);
        router.push("/");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <>
      <div className="text-popover-foreground  flex flex-col mt-5">
        <div className="text-[#666] font-medium text-sm mb-1">Hey Champ!</div>
        <div className="font-semibold text-[#444] text-2xl mb-4 ">
          Create your wiZe Account
          <div className="h-[2px] my-2 bg-gradient-to-r from-white to-gray-400 max-w-[300px] rounded-full mt-3 "></div>
        </div>
      </div>

      <form onSubmit={handleSubmitSignUp} className="flex flex-col gap-y-2">
        <div className="flex flex-col md:flex-row gap-2 ">
          <InputBox
            name="firstName"
            placeholder="First Name"
            type="text"
            value={user.firstName}
            onChange={handleChange}
          />
          <InputBox
            name="lastName"
            placeholder="Last Name"
            type="text"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>

        <InputBox
          name="email"
          placeholder="Email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />

        <InputBox
          name="companyName"
          placeholder="Company Name"
          type="text"
          value={user.companyName}
          onChange={handleChange}
        />

        <div className="flex flex-col md:flex-row md:space-x-2 items-center">
          <InputBox
            name="password"
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <div className="relative w-full md:mt-0">
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="px-4 py-3 text-base h-auto placeholder:text-gray-400 placeholder:font-semibold "
            />
            <button
              type="button"
              onClick={otpSent ? verifyOTP : sendOTP}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-default text-white py-1 px-3 rounded-md text-sm font-medium transition-all duration-200"
            >
              {otpSent
                ? isOTPVerifing
                  ? "Verifing"
                  : "Verify OTP"
                : isOTPVerifing
                ? "Sending"
                : "Send OTP"}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-3">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="form-checkbox h-8 w-8 accent-default transition duration-150 ease-in-out "
          />
          <span className="text-gray-800 text-xs font-medium">
            All your information is collected, stored, and processed as per our
            data processing guidelines. By signing up on wiZe, you agree to our{" "}
            <Link
              href="/privacypolicy"
              className="text-purple-500 hover:text-purple-700 transition-colors duration-300"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/termsandconditions"
              className="text-purple-500 hover:text-purple-700 transition-colors duration-300"
            >
              Terms of Use
            </Link>
            .
          </span>
        </div>

        <div className="flex justify-between items-center mt-16 ">
          <div className="text-gray-500 font-semibold">
            <span className="text-sm">Already have an account? </span>{" "}
            <Link href={"/login"} className="text-default font-semibold">
              Sign In
            </Link>
          </div>
          <Button
            type="submit"
            className="bg-default text-white pl-4 pr-2 py-6 rounded-full flex items-center gap-3 hover:scale-105 hover:bg-default transition-all duration-200  "
          >
            <span className="font-bold md:text-xl">Sign Up</span>
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

export default RegisterPage;
