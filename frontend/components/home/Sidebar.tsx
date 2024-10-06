import { Plus, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SlimSidebar() {
  return (
    <div className="flex flex-col items-center w-16 h-custom py-8 bg-background border-r">
      <Button variant="ghost" size="icon" className="mb-8" aria-label="Add new">
        <Plus className="h-6 w-6" />
      </Button>
      
      <div className="flex-grow flex items-center">
        <p className="vertical-text text-sm font-medium text-muted-foreground">All listing</p>
      </div>
      
      <Button variant="ghost" size="icon" className="mt-8" aria-label="Customer support">
        <HeadphonesIcon className="h-6 w-6" />
      </Button>

    </div>
  )
}