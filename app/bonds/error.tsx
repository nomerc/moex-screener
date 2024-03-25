"use client";

import { useEffect } from "react";
import Search from "../shared/ui/search";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
  }, [error]);

  return (
    <main className="dark:bg-gray-900">
      <Search placeholder="Search bonds..." />;
      <h2 className="text-center text-gray-500 dark:text-gray-400">
        Something went wrong!
      </h2>
      <div className="flex h-full flex-col items-center justify-center ">
        <button
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </main>
  );
}
