import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const videoUrl = '/videos/Arbre-Problemes-presentation.mp4';
const arbreProblemeImage = '/videos/arbre_probleme.JPG'; // Remplacez avec le chemin correct
const exempleArboricultureImage = '/videos/arbre_objectifs_exemple.JPG'; // Remplacez avec le chemin correct

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
              <h4 className="text-xl font-bold text-blue-800 mb-4">Structure Arborescente</h4>
              <p className="text-gray-700 leading-relaxed">
                L'arbre à problèmes est organisé de manière hiérarchique : le problème central constitue le tronc,
                les causes sont représentées par les racines en bas, et les conséquences par les branches en haut.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Analyse descendante et transformation</h4>
              <p className="text-gray-700 leading-relaxed">
                On part du problème central pour identifier les causes et les conséquences. Ensuite, l'arbre à
                problèmes peut être transformé en arbre à objectifs, où chaque problème est converti en solution.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Structure de l'Arbre à Problèmes",
      content: (
        <div className="space-y-8">
          <div className="flex justify-center mb-8">
            <img
              src={arbreProblemeImage}
              alt="Structure de l'Arbre à Problèmes"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="text-lg leading-relaxed text-gray-700 space-y-4">
            <p className="text-center font-semibold text-blue-800">
              Comprendre la structure arborescente
            </p>
            <p>
              Dans cet exemple, le <span className="font-bold text-orange-700">problème central</span> est représenté
              par le tronc de l'arbre, soutenu par les <span className="font-bold text-yellow-700">causes</span> (racines)
              en bas, et menant à des <span className="font-bold text-green-700">conséquences</span> (branches) en haut.
              Cette structure permet une visualisation claire des relations de cause à effet.
            </p>
            <p>
              Chaque cause et chaque conséquence peut être explorée pour des sous-niveaux, permettant une analyse
              approfondie et structurée des facteurs qui alimentent le problème central.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Méthodologie d'Analyse",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-12">
            <div className="p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-blue-800 mb-6">Analyse des Causes et Conséquences</h4>
              <p className="text-gray-700 leading-relaxed">
                En partant du bas, explorez les causes du problème. Remontez ensuite pour identifier les conséquences.
                Ce processus systématique permet de définir clairement les causes racines et d’envisager des solutions
                pour chaque aspect identifié.
              </p>
            </div>
            <div className="p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-blue-800 mb-6">Transformation en Arbre à Objectifs</h4>
              <p className="text-gray-700 leading-relaxed">
                Lors de la transformation en arbre à objectifs, chaque problème est remplacé par une solution réalisable
                et logique. L'arbre à objectifs n’a pas besoin d’être une copie parfaite de l’arbre à problèmes.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Exemple Pratique: Arboriculture",
      content: (
        <div className="space-y-8">
          <h4 className="text-2xl font-bold text-blue-800 text-center">Étude de Cas: Arboriculture</h4>
          <div className="flex justify-center mb-8">
            <img
              src={exempleArboricultureImage}
              alt="Exemple d'arbre à problèmes et solutions pour l'arboriculture"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="text-lg leading-relaxed text-gray-700 space-y-4">
            <p>
              Cet exemple montre comment un arbre à problèmes spécifique (l'arboriculture) est structuré, avec des
              <span className="font-bold text-yellow-700">causes</span> identifiées en bas et des
              <span className="font-bold text-green-700">conséquences</span> en haut. En passant à l’arbre à objectifs,
              chaque problème est remplacé par une action concrète visant à améliorer la pratique arboricole.
            </p>
            <p>
              <span className="font-semibold text-blue-800">Astuce :</span> Pour passer efficacement d'un arbre à
              problèmes à un arbre à objectifs, veillez à formuler chaque cause sous forme d'objectif souhaitable,
              réalisable et logique.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">{slides[currentSlide].title}</h2>
            <button
              className="inline-flex items-center px-6 py-3 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-200"
              onClick={() => setShowVideo(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Voir la vidéo explicative
            </button>
          </div>

          <div className="min-h-[600px] relative">
            <div className="transform transition-all duration-500 ease-in-out">
              {slides[currentSlide].content}
            </div>
          </div>

          <div className="flex justify-between items-center mt-12">
            <button
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium bg-white disabled:text-gray-400 disabled:cursor-not-allowed enabled:text-gray-700 enabled:hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setCurrentSlide(current => current - 1)}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Précédent
            </button>

            <span className="text-sm font-medium text-gray-500">{currentSlide + 1} / {slides.length}</span>

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
                <video className="w-full h-full" controls autoPlay>
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