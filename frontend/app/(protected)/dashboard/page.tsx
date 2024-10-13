import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, User } from "lucide-react"
import { auth } from "@/lib/auth";

function stringToColor(string: string = '') {
  string = string.toLowerCase();
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

function getInitials(name: string = '') {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default async function Component() {
  const session = await auth();

  const initials = getInitials(session?.user.name as string);
  const backgroundColor = stringToColor(session?.user.name as string);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16">
              <AvatarImage
                src={session?.user.image as string}
                alt={"User avatar"}
                className="w-16 h-16"
              />
              <AvatarFallback
                style={{ backgroundColor }}
                className="flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-white">{initials}</span>
              </AvatarFallback>
            
          </Avatar>
          <div>
            <CardTitle className="text-2xl">User Dashboard</CardTitle>
            <p className="text-muted-foreground">Welcome back, {session?.user.name}!</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">{session?.user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{session?.user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}