import React, { useState } from 'react';
import {
  Clock, Lightbulb, Settings, // Planificador
  Shield, Smile, Leaf, // Resiliente
  Users, Heart, Utensils, // Protector
  Star, Eye, Hourglass, // Reflexivo
  Sparkles, Map, BookOpen, // Por defecto
  ChevronLeft, ChevronRight // Navegación del carrusel
} from 'lucide-react'; // Importando íconos de lucide-react

// Mapeo de íconos basado en el perfil y el índice de la frase
const iconMap = {
  planner: [Clock, Lightbulb, Settings],
  resilient: [Shield, Smile, Leaf],
  protector: [Users, Heart, Utensils],
  reflective: [Star, Eye, Hourglass],
  default: [Sparkles, Map, BookOpen],
};

// Componente principal de la aplicación
const App = () => {
  const [screen, setScreen] = useState('welcome');
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userProfile, setUserProfile] = useState('');
  const [lessonContent, setLessonContent] = useState([]); // Array de lecciones
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0); // Estado para el carrusel

  // Definición de las preguntas para el perfilado
  const questions = [
    {
      id: 'q1',
      question: '¿Qué describe mejor tu enfoque ante la vida?',
      choices: [
        { id: 'A', label: 'Soy una persona de planes y me gusta tener el control.' },
        { id: 'B', label: 'Me adapto a las circunstancias y busco aprender de ellas.' },
        { id: 'C', label: 'Mi familia y seres queridos son mi principal motor y preocupación.' },
        { id: 'D', label: 'Busco el significado y la profundidad en cada experiencia.' },
      ],
    },
    {
      id: 'q2',
      question: 'Cuando te enfrentas a una situación difícil, ¿cuál es tu primera reacción?',
      choices: [
        { id: 'A', label: 'Analizo el problema para encontrar la solución más eficiente.' },
        { id: 'B', label: 'Investigo y busco nuevas perspectivas para entenderla.' },
        { id: 'C', label: 'Me aseguro de que mi gente esté bien y les ofrezco apoyo.' },
        { id: 'D', label: 'Me permito sentir las emociones y reflexionar sobre su impacto.' },
      ],
    },
    {
      id: 'q3',
      question: '¿Qué consideras el verdadero "éxito" en la vida?',
      choices: [
        { id: 'A', label: 'Alcanzar mis metas y objetivos profesionales.' },
        { id: 'B', label: 'Superar obstáculos y crecer como persona.' },
        { id: 'C', label: 'Ver a mi familia feliz y segura.' },
        { id: 'D', label: 'Vivir cada momento con plenitud y propósito.' },
      ],
    },
  ];

  // Definición de lecciones basadas en tipos de perfil - ahora con 3 citas cada uno
  const allLessons = {
    planner: [
      {
        quote: "La vida ocurre ahora, no en el plan quinquenal que tracé meticulosamente en mi hoja de cálculo.",
        context: "Prólogo",
        description: "Para el planificador, el libro revela la importancia de vivir el presente, más allá de cualquier estrategia."
      },
      {
        quote: "Las decisiones más importantes suelen aparecer disfrazadas como las páginas más aburridas del libro, aquellas que pasamos rápidamente o, peor aún, que decidimos no leer en absoluto.",
        context: "Prólogo",
        description: "El libro te invita a prestar atención a los momentos aparentemente insignificantes que pueden cambiarlo todo."
      },
      {
        quote: "Mi cuerpo se había convertido en un proyecto científico, un problema a resolver, un caso a gestionar.",
        context: "Capítulo 8",
        description: "Una reflexión sobre la pérdida de control y la necesidad de soltar las riendas, incluso sobre uno mismo."
      },
    ],
    resilient: [
      {
        quote: "No es control lo que buscamos, sino resiliencia.",
        context: "Epílogo",
        description: "El libro te ofrece una nueva perspectiva sobre cómo afrontar lo impredecible, construyendo resiliencia en lugar de control."
      },
      {
        quote: "La risa, descubrí, era tan efectiva como cualquier medicamento para calmar el alma, incluso cuando provenía de las situaciones más absurdas e incómodas.",
        context: "Capítulo 11",
        description: "Encuentra la fuerza y el consuelo en los momentos más inesperados, incluso en medio del caos."
      },
      {
        quote: "Fracasar sería no intentarlo, Mateo. Todo lo demás es aprendizaje.",
        context: "Capítulo 16",
        description: "El libro te anima a ver los desafíos no como fracasos, sino como oportunidades de aprendizaje y crecimiento."
      },
    ],
    protector: [
      {
        quote: "El cáncer nunca es una enfermedad individual. Es una experiencia familiar.",
        context: "Capítulo 14",
        description: "El libro subraya que las batallas se libran mejor en compañía, y que la vulnerabilidad compartida fortalece los lazos."
      },
      {
        quote: "Compartir tus miedos, incluso los irracionales, especialmente los irracionales, no es arruinar nada. Es ser humano. Es ser pareja.",
        context: "Capítulo 10",
        description: "Aprende el valor de la honestidad emocional y cómo al compartir tus miedos, fortaleces tus relaciones."
      },
      {
        quote: "Cada plato que te he traído durante estos meses llevaba el mismo mensaje que los mapas de Sofía o los proyectos de Mateo: una forma de decir “estamos aquí, seguimos luchando juntos, no estás solo”.",
        context: "Capítulo 13",
        description: "Descubre cómo los pequeños actos de amor y apoyo de tus seres queridos son los pilares más fuertes en la adversidad."
      },
    ],
    reflective: [
      {
        quote: "Decido medir mi éxito por la calidad de nuestros días, no por la magnitud de nuestros logros.",
        context: "Capítulo 15",
        description: "El libro te invita a redefinir el éxito, encontrando el verdadero valor en la autenticidad y la plenitud de cada momento."
      },
      {
        quote: "Las mejores cosas no pueden ser fotografiadas. No realmente. Se pueden capturar las formas, los colores, pero no la esencia. No cómo se sentía estar allí, en ese momento preciso.",
        context: "Capítulo 7",
        description: "Aprende a vivir el presente con todos tus sentidos, valorando la experiencia por encima de la documentación."
      },
      {
        quote: "El tiempo es el único lujo verdadero. Úselo bien.",
        context: "Capítulo 12",
        description: "Una profunda reflexión sobre el tiempo como el recurso más valioso, y la importancia de cómo lo inviertes."
      },
    ],
    default: [ // Fallback para respuestas mixtas o si no se determina un perfil claro
      {
        quote: "Somos los afortunados, no a pesar de nuestros miedos e imperfecciones, sino con ellos. Afortunados porque estamos aquí hoy, con la capacidad de sentir -lo bueno y lo malo-, de amar -aunque sea torpemente a veces-, de ayudar a otros cuando podemos y de tener el único lujo verdadero: este momento, ahora.",
        context: "Epílogo",
        description: "El libro te invita a abrazar la vida con todas sus facetas, encontrando la plenitud en el presente y el propósito en la conexión humana."
      },
      {
        quote: "A veces, descubrí, las células malas nos obligan a encontrar nuevos mapas para navegar en la vida. Y a veces, esos mapas los dibujan manos pequeñas con crayolas de colores brillantes, mostrando rutas que nunca habríamos encontrado por nuestra cuenta.",
        context: "Capítulo 6",
        description: "Descubre cómo la creatividad y la inocencia pueden ofrecer nuevas perspectivas y soluciones inesperadas ante los desafíos."
      },
      {
        quote: "La vida sigue siendo un libro donde no podemos leer todas las páginas por adelantado. Pero ahora, al menos, sé cuáles merecen mi completa atención. Y no son las que antes pensaba.",
        context: "Capítulo 16",
        description: "El libro te guía a priorizar lo que verdaderamente importa, enfocándote en las lecciones y momentos que enriquecen tu existencia."
      },
    ]
  };

  // Función para determinar el perfil del usuario basado en las respuestas
  const determineProfile = () => {
    const scores = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach(answer => {
      if (answer) {
        scores[answer]++;
      }
    });

    let maxScore = -1;
    let profileKey = 'default';

    // Determina el perfil basado en la puntuación más alta.
    // Si hay un empate, el orden de estas sentencias if actúa como desempate.
    if (scores.A > maxScore) { maxScore = scores.A; profileKey = 'planner'; }
    if (scores.B > maxScore) { maxScore = scores.B; profileKey = 'resilient'; }
    if (scores.C > maxScore) { maxScore = scores.C; profileKey = 'protector'; }
    if (scores.D > maxScore) { maxScore = scores.D; profileKey = 'reflective'; }

    return profileKey;
  };

  // Maneja la selección de respuestas para las preguntas de perfil
  const handleAnswer = (questionId, choiceId) => {
    const newAnswers = { ...answers, [questionId]: choiceId };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const determinedProfile = determineProfile();
      setUserProfile(determinedProfile);
      setLessonContent(allLessons[determinedProfile] || allLessons.default);
      setScreen('lesson');
    }
  };

  // Funciones de navegación del carrusel
  const nextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % lessonContent.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + lessonContent.length) % lessonContent.length);
  };

  // Función para reiniciar la experiencia
  const restartExperience = () => {
    setScreen('welcome');
    setAnswers({ q1: '', q2: '', q3: '' });
    setCurrentQuestionIndex(0);
    setUserProfile('');
    setLessonContent([]);
    setCurrentQuoteIndex(0); // Reiniciar índice del carrusel
  };

  // Renderiza diferentes pantallas según el estado
  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">El Año en que Aprendí a Vivir</h1>
            <p className="text-xl text-gray-600 mb-8">Una Experiencia Interactiva</p>
            <button
              onClick={() => setScreen('profile_questions')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Comenzar
            </button>
          </div>
        );
      case 'profile_questions':
        const currentQuestion = questions[currentQuestionIndex];
        return (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pregunta {currentQuestionIndex + 1} de {questions.length}</h2>
            <p className="text-xl text-gray-700 mb-8">{currentQuestion.question}</p>
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleAnswer(currentQuestion.id, choice.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 'lesson':
        const currentLesson = lessonContent[currentQuoteIndex];
        const CurrentIcon = iconMap[userProfile][currentQuoteIndex] || iconMap.default[currentQuoteIndex];

        return (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Tus lecciones personales:</h2>
            <div className="relative flex items-center justify-center w-full">
              <button
                onClick={prevQuote}
                className="absolute left-0 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition duration-300 ease-in-out z-10"
                aria-label="Cita anterior"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-md border border-gray-200 text-left w-full mx-10">
                <div className="flex items-center justify-center mb-4">
                  {CurrentIcon && <CurrentIcon size={48} className="text-blue-600" />}
                </div>
                <p className="text-xl italic text-gray-800 mb-2 leading-relaxed">"{currentLesson.quote}"</p>
                <p className="text-sm text-gray-500 mb-3">(Contexto: {currentLesson.context})</p>
                <p className="text-md text-gray-700">{currentLesson.description}</p>
              </div>

              <button
                onClick={nextQuote}
                className="absolute right-0 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition duration-300 ease-in-out z-10"
                aria-label="Siguiente cita"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="mt-6 text-gray-600">
              {currentQuoteIndex + 1} / {lessonContent.length}
            </div>

            <div className="flex flex-col space-y-4 mt-8">
              <a
                href="https://www.miguelfuentes.org" // URL de marcador de posición para el libro
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Descubre más en el libro
              </a>
              <button
                onClick={restartExperience}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Volver a empezar
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 font-inter">
      {/* Script CDN de Tailwind CSS */}
      {/* Este script y el enlace a Google Fonts se han movido a public/index.html */}
      {/* <script src="https://cdn.tailwindcss.com"></script> */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" /> */}

      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
