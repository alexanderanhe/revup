import { PAGES } from "@/lib/routes";
import { Link } from "@/navigation";

type AssessmentBannerProps = {
  title: string;
  description: string;
  buttonText: string;
}

export default function AssessmentBanner({ title, description, buttonText }: AssessmentBannerProps ) {
  return (
    <div className="card w-full max-w-96 bg-base-300 mx-auto">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{ title }</h2>
        <p>{ description }</p>
        <div className="card-actions justify-end">
          <Link href={PAGES.ASSESSMENT} className="btn btn-primary">{ buttonText }</Link>
        </div>
      </div>
    </div>
  )
}