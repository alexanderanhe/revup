import { format } from "date-fns";

export async function fetchEvents(date: Date) {
  const dateFormatted = format(date, 'yyyy-MM-dd');
  await wait(2000);

  return [
    {
      "id": "629924078f28b719d95f61af",
      "name": "Hand exercise",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
    {
      "id": "629924078f28b719d95f61ad",
      "name": "Arm day workout",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
    {
      "id": "629924078f28b719d95f61ah",
      "name": "Reyno Show",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
    {
      "id": "629924078f28b719d95f61al",
      "name": "Gym workout",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
  ];
}

export async function fetchMedia() {
  await wait(2000);

  return [
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
}

export async function wait (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}