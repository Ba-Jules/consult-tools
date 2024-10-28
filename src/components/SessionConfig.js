import React, { useState, useEffect } from 'react';
import { Clock, Users, FilePlus, Stopwatch, Download, LayoutGrid, Clock as ClockIcon } from 'lucide-react';
import toolsConfig from './toolsConfig';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

const SessionConfig = ({ onStartSession }) => {
  const [participants, setParticipants] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [participantsExpected, setParticipantsExpected] = useState(0);
  const [tables, setTables] = useState(1);
  const [participantsPerTable, setParticipantsPerTable] = useState(0);
  const [duration, setDuration] = useState({ hours: 1, minutes: 0 });
  const [remainingTime, setRemainingTime] = useState(duration.hours * 60 + duration.minutes);
  const [tdrFile, setTdrFile] = useState(null);
  const [charterFile, setCharterFile] = useState(null);
  const [selectedTools, setSelectedTools] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [participantLink, setParticipantLink] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 60000); // Mise à jour toutes les minutes

    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (type === 'tdr') {
        setTdrFile(file);
      } else if (type === 'charter') {
        setCharterFile(file);
      } else if (type === 'participants') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            const lines = content.split('\n');
            setParticipants(
              lines.slice(1).map((line) => {
                const [firstName, lastName, email, phone] = line.split(',').map((item) => item.trim());
                return { firstName, lastName, email, phone };
              })
            );
            setTotalParticipants(lines.length - 1); // Exclut l'en-tête
          } catch (error) {
            alert('Format de fichier invalide. Utilisez un fichier CSV avec le format: prénom,nom,email,téléphone');
          }
        };
        reader.readAsText(file);
      }
    }
  };

  const handleToolSelection = (toolId) => {
    setSelectedTools((prevSelected) => {
      if (prevSelected.includes(toolId)) {
        return prevSelected.filter((id) => id !== toolId);
      } else {
        return [...prevSelected, toolId];
      }
    });
  };

  const handleTotalParticipantsChange = (e) => {
    const newTotal = parseInt(e.target.value, 10);
    if (!isNaN(newTotal) && newTotal >= 0) {
      setParticipantsExpected(newTotal);
      setParticipantsPerTable(Math.ceil(newTotal / tables));
    }
  };

  const handleTablesChange = (e) => {
    const newTables = parseInt(e.target.value, 10);
    if (!isNaN(newTables) && newTables >= 1) {
      setTables(newTables);
      setParticipantsPerTable(Math.ceil(participantsExpected / newTables));
    }
  };

  const handleDurationChange = (e, type) => {
    if (type === 'hours') {
      setDuration({ ...duration, hours: parseInt(e.target.value, 10) });
      setRemainingTime((parseInt(e.target.value, 10) * 60) + duration.minutes);
    } else if (type === 'minutes') {
      setDuration({ ...duration, minutes: parseInt(e.target.value, 10) });
      setRemainingTime((duration.hours * 60) + parseInt(e.target.value, 10));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      alert("Veuillez entrer un nom de projet.");
      return;
    }

    if (selectedTools.length === 0) {
      alert("Veuillez sélectionner au moins un outil.");
      return;
    }

    onStartSession({
      projectName,
      totalParticipants,
      participantsExpected,
      participants,
      tables,
      participantsPerTable,
      duration: remainingTime,
      tdrFile,
      charterFile,
      selectedTools,
      participantLink
    });
  };

  useEffect(() => {
    setParticipantLink(`${window.location.origin}/join-session`);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6" />
            Configuration de la Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du projet
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez le nom du projet"
              required
            />
          </div>

          {/* Onglets pour Participants, Documents et Outils */}
          <Tabs defaultValue="participants">
            <TabsList>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="tools">Outils</TabsTrigger>
            </TabsList>
            <TabsContent value="participants">
              <div className="flex items-center space-x-4 mt-4">
                <label htmlFor="participants-file" className="flex items-center space-x-2 cursor-pointer">
                  <FilePlus className="w-6 h-6" />
                  <span>Télécharger la liste des participants</span>
                </label>
                <input
                  type="file"
                  id="participants-file"
                  onChange={(e) => handleFileUpload(e, 'participants')}
                  className="hidden"
                />
                <p>Lien pour s'inscrire : <a href={participantLink} target="_blank">{participantLink}</a></p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="total-participants" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre total de participants prévus
                  </label>
                  <input
                    type="number"
                    id="total-participants"
                    value={participantsExpected}
                    onChange={handleTotalParticipantsChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="tables" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de tables
                  </label>
                  <input
                    type="number"
                    id="tables"
                    value={tables}
                    onChange={handleTablesChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="duration-hours" className="block text-sm font-medium text-gray-700 mb-2">
                    Durée totale prévue
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      id="duration-hours"
                      value={duration.hours}
                      onChange={(e) => handleDurationChange(e, 'hours')}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                    <span>h</span>
                    <input
                      type="number"
                      id="duration-minutes"
                      value={duration.minutes}
                      onChange={(e) => handleDurationChange(e, 'minutes')}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      max="59"
                    />
                    <span>min</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documents">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Documents</h4>
                <div className="flex items-center space-x-4">
                  <label htmlFor="tdr-file" className="flex items-center space-x-2 cursor-pointer">
                    <FilePlus className="w-6 h-6" />
                    <span>Télécharger le TDR</span>
                  </label>
                  <input
                    type="file"
                    id="tdr-file"
                    onChange={(e) => handleFileUpload(e, 'tdr')}
                    className="hidden"
                  />
                  {tdrFile && <p>{tdrFile.name}</p>}
                </div>
                <div className="flex items-center space-x-4">
                  <label htmlFor="charter-file" className="flex items-center space-x-2 cursor-pointer">
                    <FilePlus className="w-6 h-6" />
                    <span>Télécharger le cahier des charges</span>
                  </label>
                  <input
                    type="file"
                    id="charter-file"
                    onChange={(e) => handleFileUpload(e, 'charter')}
                    className="hidden"
                  />
                  {charterFile && <p>{charterFile.name}</p>}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tools">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Sélectionnez les outils à inclure dans la session :</h4>
                {toolsConfig.map((tool) => (
                  <div key={tool.id} className="flex items items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`tool-${tool.id}`}
                      checked={selectedTools.includes(tool.id)}
                      onChange={() => handleToolSelection(tool.id)}
                      className="form-checkbox"
                    />
                    <label htmlFor={`tool-${tool.id}`} className="text-sm font-medium text-gray-700">
                      {tool.icon} {tool.name}
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Résumé de la configuration */}
<Card>
<CardHeader>
<CardTitle>Résumé de la configuration</CardTitle>
</CardHeader>
<CardContent>
<div className="grid grid-cols-2 gap-4">
<div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
<div>
<p className="text-2xl font-bold">{projectName || 'Non défini'}</p>
<p className="text-gray-500">Projet</p>
</div>
<LayoutGrid className="w-10 h-10 text-blue-500" />
</div>
<div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
<div>
<p className="text-2xl font-bold">{selectedTools.length}</p>
<p className="text-gray-500">Outils sélectionnés</p>
</div>
<Users className="w-10 h-10 text-blue-500" />
</div>
<div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
<div>
<p className="text-2xl font-bold">{totalParticipants}</p>
<p className="text-gray-500">Participants inscrits</p>
</div>
<Users className="w-10 h-10 text-blue-500" />
</div>
<div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
<div>
<p className="text-2xl font-bold">{participantsExpected}</p>
<p className="text-gray-500">Participants prévus</p>
</div>
<Users className="w-10 h-10 text-blue-500" />
</div>
<div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
<div>
<p className="text-2xl font-bold">{tables} tables de {participantsPerTable} personnes</p>
<p className="text-gray-500">Configuration des tables</p>
</div>
<LayoutGrid className="w-10 h-10 text-blue-500" />
</div>
<div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
<div>
<p className="text-2xl font-bold">{Math.floor(remainingTime / 60)}h {remainingTime % 60}min</p>
<p className="text-gray-500">Durée restante</p>
</div>
<ClockIcon className="w-10 h-10 text-blue-500" />
</div>
<div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
<div>
<p className="text-2xl font-bold">{tdrFile ? 'TDR téléchargé' : 'Aucun TDR'}</p>
<p className="text-gray-500">TDR</p>
</div>
<FilePlus className="w-10 h-10 text-blue-500" />
</div>
<div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
<div>
<p className="text-2xl font-bold">{charterFile ? 'Cahier des charges téléchargé' : 'Aucun cahier des charges'}</p>
<p className="text-gray-500">Cahier des charges</p>
</div>
<FilePlus className="w-10 h-10 text-blue-500" />
</div>
</div>
</CardContent>
</Card>
{/* Bouton de soumission */}
<button
  type="submit"
  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
>
  <Clock className="w-5 h-5" />
  Démarrer la session
</button>
</form>
);
};

export default SessionConfig;