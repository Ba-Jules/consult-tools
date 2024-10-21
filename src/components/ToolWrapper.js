import React, { Suspense, lazy } from 'react';
import { loadTool } from '../utils/toolRegistry';

const ToolWrapper = ({ toolId }) => {
  const ToolComponent = lazy(() => loadTool(toolId));

  return (
    <Suspense fallback={<div>Chargement de l'outil...</div>}>
      <ToolComponent />
    </Suspense>
  );
};

export default ToolWrapper;