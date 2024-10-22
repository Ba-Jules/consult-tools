import React, { Suspense } from 'react';
import ToolInterface from './ToolInterface';

const ToolWrapper = ({ 
  toolId, 
  projectName,
  moderatorName,
  toolConfig 
}) => {
  console.log('ToolWrapper rendu avec:', { toolId, toolConfig });

  return (
    <ToolInterface
      toolId={toolId}
      toolConfig={toolConfig}
      projectName={projectName}
      moderatorName={moderatorName}
    />
  );
};

export default ToolWrapper;