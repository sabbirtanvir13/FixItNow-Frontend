import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <SearchX className="mb-6 h-20 w-20 text-primary" />

      <h1 className="text-6xl font-bold tracking-tight">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        Sorry, the page you are looking for doesn't exist or may have been
        moved.
      </p>

      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/service">Browse Services</Link>
        </Button>
      </div>
    </div>
  );
}