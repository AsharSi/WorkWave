"use server";
import Competition from "@/models/Competition";

const getAllCompetitionsByUserId = async (userId: string) => {
  try {
    const competitions = await Competition.find({ userId });
    return competitions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCompetitionsByCompetitionId = async (competitionId: string) => {
  try {
    const competition = await Competition.findById(competitionId);
    return competition;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getAllCompetitionsByUserId, getCompetitionsByCompetitionId };
