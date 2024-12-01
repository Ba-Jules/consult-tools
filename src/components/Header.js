import React from 'react';
import { ChevronLeft, Home } from 'lucide-react';

const Header = ({ 
  projectName, 
  moderatorName = "Modérateur", 
  date = new Date().toLocaleDateString('fr-FR'), 
  onBack, 
  onHome 
}) => {
  return (
    <div className="bg-white border-b">
      <div className="bg-blue-600 text-white px-4 py-4"> {/* Épaisseur du bandeau augmentée */}
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-sm">
            <span className="font-semibold">Date :</span> {date}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Modérateur :</span> {moderatorName}
          </div>
        </div>
      </div>
      
      <div className="px-4 py-4"> {/* Épaisseur de la barre de navigation augmentée */}
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button 
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft size={20} className="mr-1" />
                Retour
              </button>
            )}
            {onHome && (
              <button 
                onClick={onHome}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Home size={20} className="mr-1" />
                Retour à la session
              </button>
            )}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Header;