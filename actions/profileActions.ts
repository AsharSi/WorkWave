"use server";
import Competition from "@/models/Competition";
import Recruiter from "@/models/Recruiter";
import mongoose from "mongoose";
import CompetitionStage from "@/models/CompetitionStage";

type Round = {
  title: string;
  content: string;
  maxScore?: number;
  qualifiedCandidates?: string[];
};

type FormData = {
  userId: string | undefined;
  title: string;
  role: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  registrationDeadline: Date;
  maxParticipants: string;
  infoSections: {
    title: string;
    content: string;
  }[];
  location: string;
  contacts: {
    name: string;
    email: string;
    phoneNumber?: string;
    phoneCode?: string;
  }[];
  rounds: Round[];
};


export async function createProfile(formData: FormData) {
  try {
    const userId = new mongoose.Types.ObjectId(formData.userId);
    const recruiter = await Recruiter.findOne({userIds: userId})
    
    const {rounds, ...restFormData} = formData;
    
    const data = {
      ...restFormData,
      recruiterId: recruiter._id,
      companyName: recruiter.companyName
    }
    
    const competition = new Competition(data);
    const savedCompetition = await competition.save();

    const newRounds = rounds.map((round, index) => {
      return {
        ...round,
        stageNumber: index + 1,
        competitionId: savedCompetition._id,
      };
    });

    const savedRounds = await CompetitionStage.insertMany(newRounds);

    await Competition.findByIdAndUpdate(savedCompetition._id, {
      rounds: savedRounds.map((round) => round._id),
    });

    return "success";
  } catch (error) {
    console.error(error);
  }

  return "failed";
}