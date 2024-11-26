import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">Oops! The page you&apos;re looking for seems to have vanished. It might have been filled or removed.</p>
      </div>
      
      <div className="w-full max-w-md mb-8">
        <form className="flex space-x-2">
          <Input 
            type="text" 
            placeholder="Search for jobs..." 
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>
      
      <div className="space-y-4 text-center">
        <p className="text-lg text-gray-700">Try one of these instead:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
      
      <p className="mt-12 text-gray-500">
        If you believe this is a mistake, please <Link href="/contact" className="text-primary hover:underline">contact our support team</Link>.
      </p>
    </div>
  )
}