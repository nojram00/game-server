import LoginForm from "@main/components/loginform";
import { url } from "inspector";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <LoginForm />
      </div>
    </main>
  );
}
