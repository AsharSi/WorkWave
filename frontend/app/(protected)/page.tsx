import SlimSidebar from "@/components/home/Sidebar";
import Competitions from "@/components/home/CompetitionComponent";
import { getAllCompetitionsByCompanyId } from "@/actions/competitionActions";

export default async function Home() {  
  
  const competitions = await getAllCompetitionsByCompanyId(
    "6700cd8ee286b761e1fdee25"
  );

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
