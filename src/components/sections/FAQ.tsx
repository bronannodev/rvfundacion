import React, { useState } from 'react';
import { AccordionItem } from '../ui/Accordion';
import { HelpCircle } from 'lucide-react';
import { FAQItem } from '../../types';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: '¿Qué pasa si no termino una vuelta dentro de los 60 minutos?',
      answer: 'Si elegiste el Circuito Largo (7,5 km) y completás la vuelta después de los 60 minutos, la vuelta queda registrada y podés continuar participando en la siguiente ventana horaria realizando el Circuito Corto (5,14 km) bajo la subcategoría "Cambio de Modalidad". Si estás en el Circuito Corto y no completás la vuelta en 60 minutos, finaliza tu participación y se asientan las vueltas completadas.',
    },
    {
      id: 'faq-2',
      question: '¿Cómo funciona la clasificación y registro oficial?',
      answer: 'El sistema registra las salidas, llegadas y tiempos netos individuales de cada vuelta. La clasificación se ordena por: 1) Mayor cantidad de vueltas completadas dentro del tiempo. 2) Menor tiempo acumulado neto.',
    },
    {
      id: 'faq-3',
      question: '¿Cuál es el requisito de colaboración solidaria?',
      answer: 'Para completar tu participación se solicita la entrega de 1 alimento no perecedero al momento de la acreditación previa a la largada. Todos los alimentos recolectados serán destinados a la acción social comunitaria organizada por la Fundación RV.',
    },
    {
      id: 'faq-4',
      question: '¿Tengo que completar las 6 vueltas obligatoriamente?',
      answer: 'No. Cada participante decide libremente su objetivo personal. Podés realizar 1, 2, 3 o hasta 6 vueltas. En cualquier momento podés finalizar tu participación simplemente decidiendo no tomar la siguiente salida.',
    },
    {
      id: 'faq-5',
      question: '¿El tiempo de descanso se suma al tiempo total?',
      answer: 'No. La clasificación se determina primero por cantidad de vueltas completadas y luego por el menor tiempo neto acumulado en las vueltas. Los minutos que descanses en la zona de concentración entre una salida y otra no suman tiempo.',
    },
    {
      id: 'faq-6',
      question: '¿Cómo verifico mi registro?',
      answer: 'Podés consultar tu estado en cualquier momento desde el botón "Ver mi registro" ingresando tu número de documento. La confirmación es inmediata y automática.',
    },
    {
      id: 'faq-7',
      question: '¿Qué equipamiento debo llevar?',
      answer: 'Calzado e indumentaria apropiada para trail running en montaña, sistema individual de hidratación (mochila de hidratación, cinturón o botellas de mano), tu alimentación favorita para los descansos y el alimento no perecedero para la acreditación.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0B0C0F] border-t border-[#1C1F26]">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="up">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-[#D97736]" />
              <span className="text-xs font-mono tracking-widest text-[#D97736] uppercase">
                RESOLUCIÓN DE CONSULTAS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              PREGUNTAS FRECUENTES
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={100}>
          <div className="divide-y divide-[#23272F]/60">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={faq.id}
                index={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === idx}
                onToggle={() => handleToggle(idx)}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
