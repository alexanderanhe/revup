import { signIn } from "@/auth";
import { authProviders } from "@/lib/data";
import { Providers } from "@/lib/definitions";
import Image from "next/image";

export function SignIn({ provider, ...props }: { provider: Providers, className?: string }) {
  const { id, image } = authProviders[provider];
  return (
    <form
      action={async () => {
        "use server";
        await signIn(id);
      }}
    >
      <button type="submit" {...props}>
        <Image width={18} height={18}
          src={ image } alt={ provider }
          className="h-[18px] w-[18px]"
        />
        Sign Up with { provider }
      </button>
    </form>
  );
}

const LogInPage = () => {
  return (
    <section className="mx-auto w-full bg-base-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
          Sign in
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            {/* <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label> */}
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Enter your email" required />
          </div>
          {/* <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required />
          </div> */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800" required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="">Remember me</label>
              </div>
            </div>
            <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
          </div> */}
          <button type="submit" className="btn btn-primary btn-wide rounded w-full">Continue</button>
          <div className="mt-4 text-sm text-center">
            <p>or</p>
          </div>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <SignIn
              provider="Google"
              className="w-full flex justify-center items-center gap-2 bg-white text-sm p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
            />
            <SignIn
              provider="GitHub"
              className="w-full flex justify-center items-center gap-2 bg-white text-sm p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
            />
          </div>
          <p className="text-sm font-light ">
            Don’t have an account yet? <a href="#" className="font-medium text-primary hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default LogInPage