import LayoutContent from "@/app/ui/utils/templates/LayoutContent"

const TipsPage = () => {
  return (
    <LayoutContent title="Tips" bg="bg-[url('/images/wXBK9JrM0iU-unsplash.webp')]" head footer>
      <section className="grid grid-cols-autofit place-items-center">
        <div className="card max-w-96 glass">
          <div className="card-body">
            <h2 className="card-title">Life hack</h2>
            <p>How to park your car at your garage?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Learn now!</button>
            </div>
          </div>
        </div>
      </section>
    </LayoutContent>
  )
}

export default TipsPage