import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust path based on your components folder
import { FileQuestion } from "lucide-react"; // Optional: lucide-react icons usually come with shadcn

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center">
            {/* Icon or Illustration */}
            <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full mb-6">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>

            {/* Text Content */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">404</h1>
            <h2 className="mt-2 text-2xl font-semibold">Page not found</h2>
            <p className="mt-4 text-muted-foreground max-w-112.5">
                Sorry, we couldn’t find the page you’re looking for. It might have been moved,
                deleted, or perhaps the URL is just a bit misspelled.
            </p>

            {/* Actions */}
            <div className="mt-10 flex gap-4">
                <Button asChild variant="default">
                    <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/contact">Support</Link>
                </Button>
            </div>
        </div>
    );
}
