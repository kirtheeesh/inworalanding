import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 text-foreground">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">404</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="mt-8 rounded-lg">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
