import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AFOMPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Analyse AFOM",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            L'analyse AFOM est un outil stratégique qui permet d'identifier et d'analyser les :
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700">Atouts</h3>
              <p className="text-green-600">Forces internes de l'organisation</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-bold text-red-700">Faiblesses</h3>
              <p className="text-red-600">Points d'amélioration internes</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-700">Opportunités</h3>
              <p className="text-blue-600">Possibilités externes favorables</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-yellow-700">Menaces</h3>
              <p className="text-yellow-600">Risques externes à considérer</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Comment utiliser l'AFOM ?",
      content: (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-4">Les étapes clés</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mr-3">1</span>
                <p>Identifiez les forces et faiblesses internes de votre organisation</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mr-3">2</span>
                <p>Analysez les opportunités et menaces de l'environnement externe</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mr-3">3</span>
                <p>Établissez des liens entre les facteurs internes et externes</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mr-3">4</span>
                <p>Définissez des stratégies basées sur votre analyse</p>
              </li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      title: "Bonnes pratiques",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3">
            <li className="bg-green-50 p-4 rounded-lg flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">✓</div>
              <p>Soyez spécifique et concret dans vos descriptions</p>
            </li>
            <li className="bg-green-50 p-4 rounded-lg flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">✓</div>
              <p>Basez-vous sur des faits et des données vérifiables</p>
            </li>
            <li className="bg-green-50 p-4 rounded-lg flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">✓</div>
              <p>Impliquez les parties prenantes clés dans l'analyse</p>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">{slides[currentSlide].title}</h2>
          {slides[currentSlide].content}
        </div>
      </div>
      
      <div className="flex justify-between items-center p-4 bg-white border-t">
        <button
          className="px-4 py-2 flex items-center text-gray-700 hover:text-gray-900 disabled:opacity-50"
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="mr-2" />
          Précédent
        </button>
        
        <span className="text-sm text-gray-500">
          {currentSlide + 1} / {slides.length}
        </span>
        
        <button
          className="px-4 py-2 flex items-center text-gray-700 hover:text-gray-900 disabled:opacity-50"
          onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
          disabled={currentSlide === slides.length - 1}
        >
          Suivant
          <ChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AFOMPresentation;