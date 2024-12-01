import React from 'react';
import ToolHeader from '../common/ToolHeader';

const ArbreInterface = ({ sessionInfo }) => {
  return (
    <div>
      <ToolHeader sessionInfo={sessionInfo} />
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-medium mb-4">Arbre à problèmes</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <p>Interface en cours de développement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbreInterface;