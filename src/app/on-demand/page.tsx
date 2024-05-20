'use client'

import { Fragment, useState } from "react"
import LayoutContent from "@/components/templates/LayoutContent"

const tabs = [
  {
    id: 'all',
    title: 'Todos',
    content: [
      {
        id: 1,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 2,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/fS3tGOkp0xY-unsplash.webp'
      },
      {
        id: 3,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 4,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/fS3tGOkp0xY-unsplash.webp'
      },
      {
        id: 5,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 6,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/fS3tGOkp0xY-unsplash.webp'
      },
    ]
  },
  {
    id: 'resources',
    title: 'Recursos',
    content: [
      {
        id: 1,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 2,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/fS3tGOkp0xY-unsplash.webp'
      }
    ]
  },
  {
    id: 'workout',
    title: 'Ejecicios',
    content: []
  },
  {
    id: 'programs',
    title: 'Programas',
    content: []
  }
]
const OnDemandPage = () => {
  const [ activeTab, setActiveTab ] = useState('all');

  const handleChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) setActiveTab(id);
  }
  return (
    <LayoutContent title="On-demand" className="grid-rows-[auto_1fr] place-items-start">
      <section className="grid place-items-start p-0">
        <div role="tablist" className="tabs tabs-bordered w-full overflow-auto">
          {tabs.map(({id, title, content}) => (
            <Fragment key={id}>
              <input type="radio" name="tab-ondemand" role="tab" className="tab" aria-label={title} checked={activeTab === id} onChange={handleChange(id)} />
              <div role="tabpanel" className="tab-content py-4">
                <div className="grid grid-cols-autofit gap-4 w-full">
                  { content.map(({id, title, description, image}) => (
                    <div key={`card${id}`} className="card w-full shadow-xl image-full">
                      <figure className="aspect-square"><img className="w-full" src={image} alt={title} /></figure>
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">{ title }</h2>
                        <p>{ description }</p>
                        <div className="card-actions justify-end">
                          <button className="btn btn-primary">Ver</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </LayoutContent>
  )
}

export default OnDemandPage