import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Share, CheckCircle } from 'lucide-react';

const ParticipantAccess = ({ sessionId, selectedTools }) => {
  const [copiedTool, setCopiedTool] = useState(null);

  const getToolUrl = (toolId) => {
    return `${window.location.origin}/participant/${sessionId}/${toolId}`;
  };

  const handleCopyLink = async (toolId) => {
    const url = getToolUrl(toolId);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedTool(toolId);
      setTimeout(() => setCopiedTool(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const toolNames = {
    'afom': 'AFOM',
    'arbre-problemes': 'Arbre à problèmes',
    'cadre-logique': 'Cadre logique'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Accès participants</h2>
      <div className="space-y-6">
        {selectedTools.map(toolId => (
          <div key={toolId} className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">{toolNames[toolId]}</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-2 rounded-lg shadow">
                <QRCodeSVG 
                  value={getToolUrl(toolId)}
                  size={128}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <div className="flex-1 space-y-2 overflow-hidden">
                <div className="text-sm text-gray-600 break-words truncate">
                  {getToolUrl(toolId)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyLink(toolId)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                  >
                    {copiedTool === toolId ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copier le lien
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>• Scanner le QR code ou utiliser le lien pour accéder à l'interface</p>
              <p>• Chaque participant peut contribuer depuis son appareil</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantAccess;