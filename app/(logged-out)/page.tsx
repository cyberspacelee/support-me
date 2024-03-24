import { PersonStandingIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function LandingPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        <PersonStandingIcon size={50} className="text-pink-500" /> SupportMe
      </h1>
      <div className="flex items-center justify-end gap-4">
        <Button className="font-semibold" size={"sm"} asChild><Link href={"/login"}>Log In</Link></Button>
        <small>or</small>
        <Button className="font-semibold" size={"sm"} variant={"secondary"} asChild><Link href={"/sign-up"}>Sign Up</Link></Button>
      </div>
    </>
  );
}
