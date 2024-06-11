import { auth, signIn, signOut } from "@/auth";
import LayoutContent from "@/components/templates/LayoutContent";
import { Providers } from "@/lib/definitions";
import Link from "next/link";

function SignIn() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const providerId = formData.get('providerId') as Providers;

        await signIn(providerId);
      }}
    >
      <p>You are not logged in</p>
      <input type="hidden" name="providerId" value="github" />
      <button type="submit" className="btn">Sign in with GitHub</button>
    </form>
  );
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function IndexPage() {
  let session = await auth();
  let user = session?.user?.email;

  return (
    <LayoutContent>
      <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
      <div className="full-width bg-[url('/images/pFyKRmDiWEA-unsplash.webp')] bg-content bg-center w-full p-8">
        <h1 className="text-5xl font-bold text-white">bray.fit</h1>
        <p className="text-lg text-white">Stay motivated and reach your fitness goals with our all-in-one gym companion app. Track your progress, create custom routines, and connect with a community of like-minded individuals.</p>
        <div className="flex gap-4">
          <Link href="/home" className="btn btn-lg btn-primary">Get Started</Link>
          <button type="button" className="btn btn-lg btn-primary btn-outline">Learn more</button>
        </div>
      </div>
    </LayoutContent>
  );
}
