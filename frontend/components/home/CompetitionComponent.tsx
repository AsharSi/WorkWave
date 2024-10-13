import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area"

interface Competition {
  _id: string;
  title: string;
  description: string;
}
  
export default async function Competitions({
  competitions,
}: {
  competitions: Competition[];
}) {
  
  return (
    <ScrollArea className="h-custom p-6 w-full ">
      {competitions.map((competition, index) => (
          <Link href={`/profiles/${competition._id}`} key={index} className="block text-black mb-4">
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>{competition.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{competition.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
      </ScrollArea>
    );
}