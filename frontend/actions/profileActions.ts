"use server";
import Competition from "@/models/Competition";
import CompetitionStage from "@/models/CompetitionStage";

type FormData = {
  recruiterId: string;
  userId: string;
  title: string;
  role: string;
  description: string;
  companyName: string;
  startDate: Date;
  endDate?: Date;
  registrationDeadline: Date;
  maxParticipants: number;
  infoSections: {
    title: string;
    content: string;
  }[];
  location: string;
  contacts: {
    name: string;
    email: string;
    phoneNumber?: string;
  }[];
};

type Round = {
  title: string;
  content: string;
  maxScore?: number;
  qualifiedCandidates?: string[];
};

export async function createProfile(formData: FormData, rounds: Round[]) {
  try {
    const competition = new Competition(formData);
    const savedCompetition = await competition.save();

    const newRounds = rounds.map((round) => {
      return {
        ...round,
        stageNumber: rounds.indexOf(round) + 1,
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
