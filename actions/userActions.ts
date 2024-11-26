"use server";
import { auth } from "@/lib/auth";
import User from "@/models/User";
import Recruiter from "@/models/Recruiter";

type FormData = {
  companyName: string;
  description: string;
  companyEmail: string;
  phoneNumber: string;
  phoneCode: string;
  password: string;
  websiteLink: string;
  linkedInLink: string;
  location: string;
};

export async function setUpCompanyProfile(formData: FormData) {
  try {
    const session = await auth();

    const user = await User.findOne({ email: session?.user?.email });
    
    const data = {
      ...formData,
      userIds: [user._id],
    };

    const recruiter = new Recruiter(data);
    
    await recruiter.save();
    
    if (user.emailVerified === null || user.emailVerified === false || user.emailVerified === undefined) {
        user.emailVerified = Date.now();
        await user.save();
    }

    return "success";
  } catch (error) {
    console.error(error);
    return "failed";
  }
}

export async function verifyUsersCompanyProfile() {
  try {
    const session = await auth();

    const user = await User.findOne({ email: session?.user?.email });

    
    const recruiter = await Recruiter.findOne({ userIds: user._id });
    
    if (recruiter) {
        return "verified";
    }
    
    return "notverified";
  } catch (error) {
    console.error(error);
    return "failed";
  }
}
