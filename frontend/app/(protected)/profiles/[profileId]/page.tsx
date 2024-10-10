import Image from "next/image";
import Link from "next/link";
import {
  GeoAltFill,
  PersonWorkspace,
  BrowserEdge,
  Linkedin,
} from "react-bootstrap-icons";
import { getCompetitionsByCompetitionId } from "@/actions/competitionActions";
import { getRoundsById } from "@/actions/roundActions";
type Section = {
  title: string;
  content: string;
};

type Round = {
  title: string;
  content: string;
};

type Contact = {
  name: string;
  email: string;
  phoneNumber?: string;
};

export default async function CompetitionPage({
  params,
}: {
  params: { profileId: string };
}) {
  const competition = await getCompetitionsByCompetitionId(
    params.profileId
  );

  if (!competition) {
    return <div>Competition not found</div>;
  }

  const rounds = await getRoundsById(competition.rounds);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={"/competitions/companylogo.jpg"}
            alt="company_logo"
            width={100}
            height={100}
            className="rounded-full mix-blend-multiply"
          />
          <div>
            <div className="text-xl font-bold text-primary">
              {competition.companyName}
            </div>
            <div className="text-lg text-primary">{competition.title}</div>
            <div className="flex space-x-4 mt-2">
              <span className="flex items-center space-x-1 text-primary">
                <GeoAltFill />
                <span>{competition.location}</span>
              </span>
              <span className="flex items-center space-x-1 text-primary">
                <PersonWorkspace />
                <span>{competition.role}</span>
              </span>
            </div>
          </div>
          <div className="flex space-x-2 ml-auto">
            <Link href="https://wize.co.in" target="_blank">
              <BrowserEdge className="text-primary hover:text-primary-dark" />
            </Link>
            <Link href="https://wize.co.in" target="_blank">
              <Linkedin className="text-primary hover:text-primary-dark" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex w-full">
          <div className="w-full max-w-[300px]">
            {competition.infoSections.map((section: Section, index: number) => (
              <h3
                key={index}
                className="text-xl font-semibold mb-4 text-primary"
              >
                {section.title}
              </h3>
            ))}
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Recruitment Process
            </h2>
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Contacts
            </h2>
          </div>
          <div className="space-y-8">
            {competition.infoSections.map((section: Section, index: number) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {section.title}
                </h3>
                <div
                  className="text-primary"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
            {rounds.map((round: Round, index: number) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {round.title}
                </h3>
                <div
                  className="text-primary"
                  dangerouslySetInnerHTML={{ __html: round.content }}
                ></div>
              </div>
            ))}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Contacts
              </h3>
              {competition.contacts.map((contact: Contact, index: number) => (
                <div key={index} className="mb-4">
                  <h4 className="text-primary">
                    {contact.name}
                  </h4>
                  <p className="text-primary">{contact.email}</p>
                  <p className="text-primary">{contact?.phoneNumber}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
