import SlimSidebar from "@/components/home/Sidebar";
import Competitions from "@/components/home/CompetitionComponent";
import "./home.css";
import { getCompetitionsByRecruiter } from "../actions/competitionActions";


export default async function Home() {
  const response = await getCompetitionsByRecruiter("1");
  const competitions = await response?.json();

  return (
    <>
      <div className="h-custom flex">
        <SlimSidebar />
        {competitions.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-muted-foreground">
              No competitions found
            </p>
          </div>
        ) : (
          <Competitions competitions={competitions} />
        )}
      </div>
    </>
  );
}
