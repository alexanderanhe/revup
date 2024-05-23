import LayoutContent from "@/components/templates/LayoutContent"

const Logs = () => {
  return (
    <LayoutContent title="Logs" head footer>
      <section className="grid grid-cols-autofit place-items-center">
        <div className="card max-w-96 glass">
          <div className="card-body">
            <h2 className="card-title">Logs</h2>
            <p>Check your logs here.</p>
          </div>
        </div>
      </section>
    </LayoutContent>
  )
}

export default Logs