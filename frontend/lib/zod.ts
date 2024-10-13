import { array, object, string, date } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .email("Invalid email")
    .min(2, "Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters"),
});

export const setupProfileSchema = object({
  companyName: string({ required_error: "Company Name is required" })
    .min(2, "Company Name must be at least 2 characters")
    .max(32, "Company Name must be at most 32 characters"),
  description: string({ required_error: "Description is required" })
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be at most 500 characters"),
  companyEmail: string({ required_error: "Email is required" })
    .email("Invalid email")
    .min(2, "Invalid email"),
  websiteLink: string({ required_error: "Website Link is required" })
    .url("Invalid URL")
    .min(2, "Invalid URL"),
  linkedInLink: string({ required_error: "LinkedIn Link is required" })
    .url("Invalid URL")
    .min(2, "Invalid URL"),
  location: string({ required_error: "Location is required" })
    .min(3, "Location must be at least 3 characters")
    .max(32, "Location must be at most 32 characters"),
  password: string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters"),
  confirmPassword: string({ required_error: "Confirm Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters"),
  phoneNumber: string({ required_error: "Phone Number is required" })
    .min(10, "Phone Number must be at least 10 characters")
    .max(10, "Phone Number must be at most 10 characters"),
  phoneCode: string({ required_error: "Phone Code is required" })
    .min(2, "Phone Code must be at least 2 characters")
    .max(5, "Phone Code must be at most 5 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const infoSectionSchema = object({
  title: string({ required_error: "Title is required" })
    .min(2, "Title must be at least 2 characters")
    .max(32, "Title must be at most 32 characters"),
  content: string({ required_error: "Content is required" })
    .min(20, "Content must be at least 20 characters")
    .max(1000, "Content must be at most 1000 characters"),
})

const roundSchema = object({
  title: string({ required_error: "Title is required" })
    .min(2, "Title must be at least 2 characters")
    .max(32, "Title must be at most 32 characters"),
  content: string({ required_error: "Content is required" })
    .min(20, "Content must be at least 20 characters")
    .max(500, "Content must be at most 500 characters"),
})

const contactSchema = object({
  name: string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be at most 32 characters"),
  email: string({ required_error: "Email is required" })
    .email("Invalid email")
    .min(2, "Invalid email"),
  phoneNumber: string()
    .min(10, "Phone Number must be at least 10 characters")
    .max(10, "Phone Number must be at most 10 characters")
    .optional(),
  phoneCode: string()
    .min(2, "Phone Code must be at least 2 characters")
    .max(5, "Phone Code must be at most 5 characters")
    .optional(),
})

export const setupCompetitionSchema = object({
  title: string({ required_error: "Title is required" })
    .min(2, "Title must be at least 2 characters")
    .max(32, "Title must be at most 32 characters"),
  role: string({ required_error: "Role is required" })
    .min(2, "Role must be at least 2 characters")
    .max(32, "Role must be at most 32 characters"),
  description: string({ required_error: "Description is required" })
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be at most 500 characters"),
  startDate: date({ required_error: "Start Date is required" }),
  endDate: date().optional(),
  registrationDeadline: date({
    required_error: "Registration Deadline is required",
  }),
  rounds: array(roundSchema).min(1, "Rounds must have at least 1 round"),
  maxParticipants: string({ required_error: "Max Participants is required" }),
  infoSections: array(infoSectionSchema).min(1, "Info Sections must have at least 1 section"),
  location: string({ required_error: "Location is required" })
    .min(3, "Location must be at least 3 characters")
    .max(32, "Location must be at most 32 characters"),
  contacts: array(contactSchema).min(1, "Contacts must have at least 1 contact"),
});