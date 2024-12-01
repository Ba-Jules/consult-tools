import React from 'react';

const ParticipantsView = ({ totalParticipants, numberOfTables, participantsPerTable }) => {
    const tables = Array.from({ length: numberOfTables }, (_, tableIndex) => {
        const tableNumber = tableIndex + 1;
        const tableParticipants = Math.min(
            participantsPerTable,
            totalParticipants - (tableIndex * participantsPerTable)
        );

        return (
            <div key={tableIndex} className="bg-white p-3 rounded-lg shadow-sm mb-4">
                <h3 className="text-sm font-medium mb-2">Table {tableNumber}</h3>
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: tableParticipants }, (_, participantIndex) => (
                        <div
                            key={participantIndex}
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm"
                        >
                            {participantIndex + 1}
                        </div>
                    ))}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="mb-4 pb-2 border-b">
                <h2 className="font-semibold">Disposition</h2>
                <div className="text-sm text-gray-600">
                    <div>Total : {totalParticipants} participants</div>
                    <div>{numberOfTables} table(s)</div>
                    <div>{participantsPerTable} par table</div>
                </div>
            </div>
            <div className="space-y-4">{tables}</div>
        </div>
    );
};

export default ParticipantsView;