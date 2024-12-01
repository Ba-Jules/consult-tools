import React from 'react';

const ToolHeader = ({ sessionInfo }) => {
  return (
    <div className="bg-blue-600 text-white px-4 py-3">
      <div className="text-lg">{sessionInfo?.projectName || 'Projet'}</div>
    </div>
  );
};

export default ToolHeader;