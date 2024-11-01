import React from 'react';

const ParticipantTable = ({ tableNumber, participants, maxParticipants }) => {
  // Génération des places avec meilleure distribution
  const seats = Array(maxParticipants).fill(null).map((_, index) => ({
    id: index,
    status: index < participants ? 'occupied' : 'empty'
  }));

  // Calcul optimisé des positions des participants autour de la table
  const getPosition = (index, total) => {
    const angle = (index * (360 / total)) * (Math.PI / 180);
    const radius = 32; // Rayon réduit pour éviter les chevauchements
    return {
      left: `${50 + radius * Math.cos(angle - Math.PI / 2)}%`,
      top: `${50 + radius * Math.sin(angle - Math.PI / 2)}%`
    };
  };

  return (
    <div className="mb-8 last:mb-0">
      <h4 className="text-sm font-semibold mb-2 text-center text-gray-700">
        Table {tableNumber}
      </h4>
      <div className="relative w-full pt-[100%]"> {/* Aspect ratio 1:1 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Table circulaire */}
          <div className="absolute w-2/3 h-2/3 rounded-full border-2 border-gray-300 bg-white shadow-md" />

          {/* Participants */}
          {seats.map((seat, index) => {
            const position = getPosition(index, maxParticipants);
            return (
              <div
                key={seat.id}
                className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 
                  ${seat.status === 'occupied' ? 'bg-blue-500' : 'bg-gray-200'}
                  transition-all duration-300 ease-in-out
                  hover:scale-110 hover:z-10`}
                style={{
                  left: position.left,
                  top: position.top
                }}
                title={`Place ${index + 1} - ${seat.status === 'occupied' ? 'Occupée' : 'Libre'}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ParticipantsView = ({ totalParticipants, numberOfTables, participantsPerTable }) => {
  // Calcul de la répartition des participants
  const tables = Array.from({ length: numberOfTables }, (_, index) => {
    const baseParticipants = Math.floor(totalParticipants / numberOfTables);
    const extraParticipants = index < (totalParticipants % numberOfTables) ? 1 : 0;
    return {
      id: index + 1,
      participants: Math.min(
        baseParticipants + extraParticipants,
        participantsPerTable
      )
    };
  });

  return (
    <div className="h-full flex flex-col">
      {/* En-tête avec les statistiques */}
      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Configuration</h3>
        <div className="text-sm space-y-1 text-gray-600">
          <p>Total participants: {totalParticipants}</p>
          <p>Nombre de tables: {numberOfTables}</p>
          <p>Participants par table: {participantsPerTable}</p>
        </div>
      </div>

      {/* Conteneur des tables avec défilement */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="grid gap-4">
          {tables.map(table => (
            <ParticipantTable
              key={table.id}
              tableNumber={table.id}
              participants={table.participants}
              maxParticipants={participantsPerTable}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsView;