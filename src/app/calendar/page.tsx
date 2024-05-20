import LayoutContent from "@/components/templates/LayoutContent"

const Calendar = () => {
  return (
    <LayoutContent title="Calendar" className="bg-black/95 [&>h1]:text-white">
      <section className="grid grid-cols-1 grid-rows-[auto-1fr] [&>h3]:text-white [&>h3>span]:text-gray-500">
        <h3>Mayo <span>2024</span></h3>
        <div className="grid grid-cols-7 grid-rows-3 gap-1 w-full [&>div]:text-center [&>div.header]:text-sm [&>div.day]:row-span-3 bg-base-100 rounded-lg">
          <div className="header">Dom</div>
          <div className="header">Lun</div>
          <div className="header">Mar</div>
          <div className="header">Mié</div>
          <div className="header">Jue</div>
          <div className="header">Vie</div>
          <div className="header">Sáb</div>
          { Array.from({length: 35}).map((_, i) => (
            <div key={`day${i}`} className="day">{i + 1}</div>
          )) }
        </div>
      </section>
    </LayoutContent>
  )
}

export default Calendar