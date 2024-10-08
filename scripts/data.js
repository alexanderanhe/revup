const tags = [
  // -- Insert tags muscles
  ['muscle', 'chest', 'pecho', '1'],
  ['muscle', 'back', 'espalda', '1', [
    ['muscle', 'latissimus dorsi', 'dorsal ancho' ],
    ['muscle', 'trapezius', 'trapecio' ],
    ['muscle', 'rhomboids', 'romboides' ],
    ['muscle', 'lower back', 'parte baja de la espalda' ],
    ['muscle', 'lumbar', 'lumbar' ],
    ['muscle', 'erector spinae', 'erector de la columna' ],
    ['muscle', 'teres major', 'redondo mayor' ],
    ['muscle', 'teres minor', 'redondo menor' ],
    ['muscle', 'neck', 'cuello'],
  ]],
  ['muscle', 'legs', 'piernas', '1', [
    ['muscle', 'quadriceps', 'cuádriceps' ],
    ['muscle', 'hamstrings', 'isquiotibiales' ],
    ['muscle', 'calves', 'gemelos' ],
    ['muscle', 'anterior thigh muscles', 'músculos anteriores del muslo' ],
    ['muscle', 'posterior thigh muscles', 'músculos posteriores del muslo' ],
    ['muscle', 'inner thigh muscles', 'músculos internos del muslo' ],
    ['muscle', 'outer thigh muscles', 'músculos externos del muslo' ],
    ['muscle', 'hip abductors', 'abductores de cadera' ],
    ['muscle', 'glutes', 'glúteo', '1'],
  ]],
  ['muscle', 'deltoids', 'deltoides', '1', [
    ['muscle', 'front deltoids', 'deltoides frontales' ],
    ['muscle', 'middle deltoids', 'deltoides medios' ],
    ['muscle', 'rear deltoids', 'deltoides posteriores' ],
  ]],
  ['muscle', 'biceps', 'bíceps', '1'],
  ['muscle', 'triceps', 'tríceps', '1'],
  ['muscle', 'forearm', 'antebrazo', '1'],
  ['muscle', 'abs', 'abdominales', '1', [
    ['muscle', 'obliques', 'oblicuos' ],
    ['muscle', 'transverse abdominis', 'transverso del abdomen' ],
    ['muscle', 'rectus abdominis', 'recto del abdomen' ],
    ['muscle', 'lower abs', 'abdominales inferiores' ],
    ['muscle', 'upper abs', 'abdominales superiores' ],
    ['muscle', 'core', 'core' ],
    ['muscle', 'six pack', 'six pack' ],
    ['muscle', 'v line', 'v line' ],
  ]],
  ['muscle', 'pelvic floor', 'suelo pélvico' ],
  ['muscle', 'functional workout', 'entrenamiento funcional', '1'],
  ['muscle', 'cardio', 'cardio', '1'],
  ['muscle', 'stretching', 'estiramiento', '1'],
  // -- Insert tags equipment
  ['equipment', 'with equipment', 'con equipo', '1', [
    ['equipment', 'barbell', 'barra'],
    ['equipment', 'dumbbells', 'mancuernas'],
    ['equipment', 'kettlebells', 'pesa rusa'],
    ['equipment', 'medicine ball', 'balón medicinal'],
    ['equipment', 'resistance band', 'banda de resistencia'],
    ['equipment', 'ab wheel', 'rueda abdominal'],
    ['equipment', 'trx', 'trx'],
    ['equipment', 'pull-up bar', 'barra de dominadas'],
    ['equipment', 'parallel bars', 'paralelas'],
    ['equipment', 'cardio machine', 'maquina de cardio'],
    ['equipment', 'treadmill', 'cinta de correr'],
    ['equipment', 'elliptical', 'elíptica'],
    ['equipment', 'stationary bike', 'bicicleta estática'],
    ['equipment', 'rowing machine', 'máquina de remo'],
    ['equipment', 'stair climber', 'escaladora'],
    ['equipment', 'punching bag', 'saco de boxeo'],
    ['equipment', 'jumping rope', 'cuerda para saltar'],
    ['equipment', 'dip bar', 'barra de dips'],
    ['equipment', 'bench', 'banco'],
    ['equipment', 'multifunctional bench', 'banco multifuncional'],
    ['equipment', 'cable machine', 'máquina de poleas'],
    ['equipment', 'squat rack', 'soporte para sentadillas'],
    ['equipment', 'smith machine', 'máquina smith'],
    ['equipment', 'leg press machine', 'máquina de prensa de piernas'],
    ['equipment', 'leg curl machine', 'máquina de curl de piernas'],
    ['equipment', 'leg extension machine', 'máquina de extensión de piernas'],
    ['equipment', 'leg abduction machine', 'máquina de abducción de piernas'],
    ['equipment', 'stability ball', 'pelota de estabilidad'],
    ['equipment', 'bosu ball', 'bosu'],
    ['equipment', 'foam roller', 'rodillo de espuma'],
    ['equipment', 'yoga mat', 'colchoneta de yoga'],
    ['equipment', 'pilates ball', 'pelota de pilates'],
    ['equipment', 'plyobox/platform', 'plyobox/plataforma'],
    ['equipment', 'hack machine', 'máquina hack'],
    ['equipment', 'gravitron', 'gravitron'],
    ['equipment', 'crossover', 'transversal'],
    ['equipment', 'upper block', 'bloque superior'],
    ['equipment', 'lower block', 'bloque inferior'],
    ['equipment', 'calf machine', 'máquina de gemelos'],
    ['equipment', 'ankle (wrist) weights', 'pesas de tobillo (muñeca)'],
  ]],
  ['equipment', 'without equipment', 'sin equipo', '1', [
    ['equipment', 'bodyweight', 'peso corporal'],
  ]],
  // -- Insert tags place
  ['place', 'home', 'casa'],
  ['place', 'gym', 'gimnasio'],
  ['place', 'outdoor', 'aire libre'],
  // -- Insert tags goal
  ['goal', 'general muscle building', 'ganar masa muscular' ,'1'],
  ['goal', 'weight loss', 'perder peso', '1'],
  ['goal', 'keeping fit', 'mantenerse en forma', '1'],
  // -- Insert tags gender
  ['gender', 'men', 'hombre'],
  ['gender', 'woman', 'mujer'],
  // -- Insert tags difficulty
  ['difficulty', 'no experience', 'sin experiencia', '0'],
  ['difficulty', 'beginner', 'principiante', '1'],
  ['difficulty', 'advanced', 'avanzado', '2'],
  ['difficulty', 'expert', 'experto', '3'],
  ['difficulty', 'professional', 'profesional', '4'],
  // -- Insert tags others
  ['other', 'upper body', 'parte superior'],
  ['other', 'legs+shoulders', 'piernas+hombros'],
  ['other', 'full body', 'cuerpo completo'],
];

module.exports = { tags };