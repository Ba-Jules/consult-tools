import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const afomVideoUrl = '/videos/afom-presentation.mp4';

const AFOMPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const slides = [
    {
      title: "Introduction à l'AFOM",
      content: (
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-blue-800 text-center mb-8">
            Un outil de diagnostic rapide et stratégique
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Direction Temporelle</h4>
              <p className="text-gray-700 leading-relaxed">
                L'analyse AFOM s'articule sur un axe temporel, distinguant clairement le passé (Acquis et Faiblesses) 
                du futur (Opportunités et Menaces).
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Dimension Stratégique</h4>
              <p className="text-gray-700 leading-relaxed">
                Une distinction nette entre les éléments internes (sous notre contrôle) et externes 
                (dans l'environnement du projet).
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Structure de l'AFOM",
      content: (
        <div className="flex flex-col h-[600px]">
          {/* Container avec padding pour les étiquettes latérales */}
          <div className="relative flex-1 flex flex-col mx-16"> {/* Ajout de mx-16 pour l'espace des étiquettes latérales */}
            {/* Bandeau supérieur */}
            <div className="text-center font-bold text-blue-800 bg-blue-50 py-2 w-full">
              Souhaité (positif)
            </div>

            {/* Labels latéraux */}
            <div className="absolute left-0 top-1/2 transform -translate-x-16 -translate-y-1/2 -rotate-90 font-bold text-blue-800 bg-blue-50 px-4 py-2 origin-center w-32 text-center">
              Interne
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-16 -translate-y-1/2 rotate-90 font-bold text-blue-800 bg-blue-50 px-4 py-2 origin-center w-32 text-center">
              Externe
            </div>

            {/* Grille AFOM */}
            <div className="flex-1 grid grid-cols-2 gap-6 p-6">
              {/* Acquis */}
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200 shadow-md">
                <h4 className="font-bold text-green-800 mb-4">A - Acquis</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Succès et réussites passées</li>
                  <li>• Aspects positifs maîtrisés</li>
                  <li>• Réalisations validées</li>
                  <li>• Points forts internes</li>
                  <li>• Ce qu'on a aimé</li>
                </ul>
              </div>

              {/* Opportunités */}
              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 shadow-md">
                <h4 className="font-bold text-blue-800 mb-4">O - Opportunités</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Potentiels à exploiter</li>
                  <li>• Ressources disponibles</li>
                  <li>• Atouts à valoriser</li>
                  <li>• Évolutions positives</li>
                  <li>• Perspectives favorables</li>
                </ul>
              </div>

              {/* Faiblesses */}
              <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200 shadow-md">
                <h4 className="font-bold text-orange-800 mb-4">F - Faiblesses</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Difficultés rencontrées</li>
                  <li>• Échecs à analyser</li>
                  <li>• Points à améliorer</li>
                  <li>• Problèmes identifiés</li>
                  <li>• Ce qu'on n'a pas aimé</li>
                </ul>
              </div>

              {/* Menaces */}
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200 shadow-md">
                <h4 className="font-bold text-red-800 mb-4">M - Menaces</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Risques à anticiper</li>
                  <li>• Obstacles potentiels</li>
                  <li>• Contraintes externes</li>
                  <li>• Impacts négatifs possibles</li>
                  <li>• Facteurs défavorables</li>
                </ul>
              </div>
            </div>

            {/* Bandeau inférieur */}
            <div className="text-center font-bold text-blue-800 bg-blue-50 py-2 w-full">
              Non souhaité (négatif)
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Dimension Temporelle",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-12">
            <div className="p-8 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">Passé</h4>
              <div className="space-y-6">
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <h5 className="font-bold text-green-800 mb-2">Acquis</h5>
                  <p className="text-gray-700">Réalisations internes positives et succès démontrés</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <h5 className="font-bold text-orange-800 mb-2">Faiblesses</h5>
                  <p className="text-gray-700">Difficultés rencontrées et aspects à améliorer</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">Futur</h4>
              <div className="space-y-6">
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <h5 className="font-bold text-blue-800 mb-2">Opportunités</h5>
                  <p className="text-gray-700">Potentialités et ressources à exploiter</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <h5 className="font-bold text-red-800 mb-2">Menaces</h5>
                  <p className="text-gray-700">Risques et obstacles à anticiper</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Responsabilité et Contrôle",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-12">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-blue-800 mb-6">Interne</h4>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Les éléments internes relèvent de la responsabilité directe des gestionnaires du projet.
                  Ils représentent les aspects sur lesquels nous avons un contrôle direct.
                </p>
                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Gestion des acquis</li>
                    <li>• Traitement des faiblesses</li>
                    <li>• Actions correctives</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-blue-800 mb-6">Externe</h4>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Les éléments externes sont présents dans l'environnement du projet mais échappent 
                  à notre contrôle direct. Ils nécessitent une approche adaptative.
                </p>
                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Saisie des opportunités</li>
                    <li>• Gestion des menaces</li>
                    <li>• Stratégies d'adaptation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          {/* En-tête avec titre et bouton vidéo */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              {slides[currentSlide].title}
            </h2>
            <button
              className="inline-flex items-center px-6 py-3 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-200"
              onClick={() => setShowVideo(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Voir la vidéo explicative
            </button>
          </div>

          {/* Contenu du slide avec animation */}
          <div className="min-h-[600px] relative">
            <div className="transform transition-all duration-500 ease-in-out">
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium bg-white disabled:text-gray-400 disabled:cursor-not-allowed enabled:text-gray-700 enabled:hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setCurrentSlide(current => current - 1)}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Précédent
            </button>

            <span className="text-sm font-medium text-gray-500">
              {currentSlide + 1} / {slides.length}
            </span>

            <button
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium bg-white disabled:text-gray-400 disabled:cursor-not-allowed enabled:text-gray-700 enabled:hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setCurrentSlide(current => current + 1)}
              disabled={currentSlide === slides.length - 1}
            >
              Suivant
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Vidéo */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-4xl relative">
            <button
              className="absolute top-4 right-4 z-[60] p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              onClick={() => setShowVideo(false)}
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                >
                  <source src={afomVideoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                Présentation détaillée de l'outil AFOM
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AFOMPresentation;