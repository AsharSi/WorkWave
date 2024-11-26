"use server"
import Round from "@/models/CompetitionStage";

const getRoundsById = async (roundsId: string[]) => {
    try {
        const rounds = await Round.find({ _id: { $in: roundsId } });
        return rounds;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export { getRoundsById };