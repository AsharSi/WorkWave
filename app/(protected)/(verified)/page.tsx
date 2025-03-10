import SlimSidebar from "@/components/home/Sidebar";
import Competitions from "@/components/home/CompetitionComponent";
import { auth } from "@/lib/auth";
import { getAllCompetitionsByUserId } from "@/actions/competitionActions";

export default async function Home() {  
  const session = await auth();
  
  const competitions = await getAllCompetitionsByUserId(session?.user?.id);

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
