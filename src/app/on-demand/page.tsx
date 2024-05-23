'use client'

import { Fragment, useState } from "react"
import Image from "next/image"
import LayoutContent from "@/components/templates/LayoutContent"
import Card from "@/components/utils/Card"

const tabs = [
  {
    id: 'all',
    title: 'Todos',
    contentType: '2',
    content: [
      {
        id: 1,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 2,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/fS3tGOkp0xY-unsplash.webp'
      },
      {
        id: 3,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 4,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/fS3tGOkp0xY-unsplash.webp'
      },
      {
        id: 5,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 6,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/fS3tGOkp0xY-unsplash.webp'
      },
    ]
  },
  {
    id: 'resources',
    title: 'Recursos',
    contentType: '2',
    content: [
      {
        id: 1,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 2,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/fS3tGOkp0xY-unsplash.webp'
      }
    ]
  },
  {
    id: 'workout',
    title: 'Ejecicios',
    contentType: 'autofit',
    content: [
      {
        id: 1,
        title: 'Yoga',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/coiWR0gT8Cw-unsplash.webp'
      },
      {
        id: 2,
        title: 'Peso',
        description: 'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',
        image: '/images/fS3tGOkp0xY-unsplash.webp'
      }
    ]
  },
  {
    id: 'programs',
    title: 'Programas',
    contentType: 'autofit',
    content: []
  }
]
const OnDemandPage = () => {
  const [ activeTab, setActiveTab ] = useState('all');

  const handleChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) setActiveTab(id);
  }
  return (
    <LayoutContent title="On-demand" className="grid-rows-[auto_1fr] place-items-start" footer>
      <section className="grid place-items-start p-0">
        <div role="tablist" className="tabs tabs-bordered w-full overflow-auto">
          {tabs.map(({id, title, content, contentType}) => (
            <Fragment key={id}>
              <input type="radio" name="tab-ondemand" role="tab" className="tab" aria-label={title} checked={activeTab === id} onChange={handleChange(id)} />
              <div role="tabpanel" className="tab-content py-4">
                <div className={`grid grid-cols-${contentType} gap-4 w-full`}>
                  { content.map((item) => (
                    <Card key={`card${title}${id}`} contentType={contentType} {...item} />
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