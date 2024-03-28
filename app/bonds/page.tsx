import Container from "../shared/ui/container";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // If loading a variable font, you don't need to specify the font weight

  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  return (
    <div className={`h-screen ${inter.className}`}>
      <Container currentPage={currentPage} query={query} />
    </div>
  ); //it's better to use swr in client components
}
