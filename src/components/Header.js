import React from 'react';

const Header = ({ projectName }) => {
  return (
    <div className="bg-white shadow p-4">
      <h1 className="text-2xl font-bold text-blue-600">{projectName}</h1> {/* Affiche le nom du projet */}
    </div>
  );
};

export default Header;