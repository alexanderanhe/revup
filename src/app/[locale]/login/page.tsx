import AuthPanel from "@/app/ui/auth/AuthPanel";

const LogInPage = () => {
  return (
    <section className="mx-auto w-full bg-base-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
        <AuthPanel modal="signIn" />
      </div>
    </section>
  )
}

export default LogInPage