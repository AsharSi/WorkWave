import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" required />
                <Input placeholder="Last Name" required />
              </div>
              <Input type="email" placeholder="Email" required />
              <Input placeholder="Subject" required />
              <Textarea placeholder="Your message" required />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="text-primary" />
                <span>123 Job Street, IIT Kharagpur, Kharagpur, 721302</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-primary" />
                <span>+91 (322) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-primary" />
                <span>contact@wize.co.in</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Map placeholder</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}