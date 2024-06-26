import AuthPanel from "@/app/ui/auth/AuthPanel";

const LogInPage = () => {
  return (
    <section className="mx-auto w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full h-svh p-10 space-y-4 md:space-y-6">
        <AuthPanel modal="signIn" />
      </div>
    </section>
  )
}

export default LogInPage