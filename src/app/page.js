import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen font-[family-name:var(--font-geist-sans)]">
    <h1 className="text-5xl font-bold">Master Any Subject with Smarter Flashcards</h1>
    <p className="my-10 text-center px-10">Revizio helps you learn faster and retain knowledge longer with adaptive spaced repetition. Create, organize, and review flashcards tailored to your pace, so you can focus on what matters most.</p>
    <Button asChild>
<Link href="/signup">Try Now</Link>
</Button>
  </div>
  );
}
