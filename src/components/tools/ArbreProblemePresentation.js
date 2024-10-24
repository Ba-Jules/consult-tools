import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const videoUrl = '/videos/arbre-probleme-presentation.mp4';

const ArbreProblemePresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const slides = [
    {
      title: "Introduction à l'Arbre à Problèmes",
      content: (
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-blue-800 text-center mb-8">
            Un outil d'analyse causale et stratégique
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Structure Verticale</h4>
              <p className="text-gray-700 leading-relaxed">
                L'arbre à problèmes organise l'analyse selon une logique verticale : 
                les causes à la base, le problème central au milieu, et les conséquences au sommet.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Double Perspective</h4>
              <p className="text-gray-700 leading-relaxed">
                Chaque arbre à problèmes peut être converti en arbre à solutions, 
                transformant les situations négatives en objectifs positifs à atteindre.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Structure de l'Arbre",
      content: (
        <div className="relative h-[600px] p-4 bg-gradient-to-b from-blue-50/30 to-white">
          {/* En-têtes des sections */}
          <div className="absolute top-0 w-full text-center font-bold text-blue-800 bg-green-100/80 py-2 rounded-t-lg">
            Conséquences
          </div>
          
          {/* Arbre à problèmes */}
          <div className="flex flex-col items-center space-y-6 pt-12 pb-4 px-8">
            {/* Conséquences */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {[1,2,3].map(i => (
                <div key={`cons-${i}`} className="p-3 bg-green-100 rounded-lg border-2 border-green-200 shadow-md text-center min-h-[60px] flex items-center justify-center">
                  <p className="text-sm text-gray-600">Conséquence {i}</p>
                </div>
              ))}
            </div>
            
            {/* Flèches de liaison */}
            <div className="w-full flex justify-center">
              <div className="border-l-2 border-gray-400 h-8"></div>
            </div>

            {/* Problème central */}
            <div className="w-2/3 p-4 bg-orange-100 rounded-lg border-2 border-orange-200 shadow-lg text-center">
              <h4 className="font-bold text-orange-800">Problème Central</h4>
              <p className="text-sm text-gray-600 mt-2">Situation négative principale à résoudre</p>
            </div>

            {/* Flèches de liaison */}
            <div className="w-full flex justify-center">
              <div className="border-l-2 border-gray-400 h-8"></div>
            </div>

            {/* Causes */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {[1,2,3].map(i => (
                <div key={`cause-${i}`} className="p-3 bg-yellow-100 rounded-lg border-2 border-yellow-200 shadow-md text-center min-h-[60px] flex items-center justify-center">
                  <p className="text-sm text-gray-600">Cause {i}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Label inférieur */}
          <div className="absolute bottom-0 w-full text-center font-bold text-blue-800 bg-yellow-100/80 py-2 rounded-b-lg">
            Causes
          </div>
        </div>
      )
    },
    {
      title: "Méthodologie d'Analyse",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-12">
            <div className="p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-blue-800 mb-6">Analyse Descendante</h4>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <h5 className="font-bold text-green-800 mb-2">1. Identifier les Conséquences</h5>
                  <p className="text-gray-700">Repérer les effets directs et indirects du problème central</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <h5 className="font-bold text-orange-800 mb-2">2. Formuler le Problème Central</h5>
                  <p className="text-gray-700">Définir clairement la situation négative principale</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <h5 className="font-bold text-yellow-800 mb-2">3. Analyser les Causes</h5>
                  <p className="text-gray-700">Explorer les racines du problème de manière systématique</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-blue-800 mb-6">Transformation en Solutions</h4>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <h5 className="font-bold text-green-800 mb-2">1. Objectifs Supérieurs</h5>
                  <p className="text-gray-700">Transformer les conséquences en impacts positifs visés</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <h5 className="font-bold text-orange-800 mb-2">2. Objectif Central</h5>
                  <p className="text-gray-700">Convertir le problème en situation désirée</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <h5 className="font-bold text-yellow-800 mb-2">3. Actions Stratégiques</h5>
                  <p className="text-gray-700">Définir les interventions pour traiter chaque cause</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Exemple Pratique",
      content: (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h4 className="text-2xl font-bold text-blue-800 mb-6 text-center">Cas d'étude : Arboriculture</h4>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-bold text-green-800 mb-2">Impacts Visés</h5>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>Augmentation des revenus</li>
                    <li>Amélioration de la qualité</li>
                    <li>Développement durable</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h5 className="font-bold text-orange-800 mb-2">Solution Centrale</h5>
                  <p className="text-gray-700">Pratique arboricole améliorée</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-bold text-yellow-800 mb-2">Actions Clés</h5>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>Formation technique</li>
                    <li>Partenariats stratégiques</li>
                    <li>Innovation des pratiques</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/api/placeholder/400/400"
                  alt="Exemple d'arbre à problèmes/solutions"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
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
                  <source src={videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                Présentation détaillée de l'Arbre à Problèmes
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArbreProblemePresentation;