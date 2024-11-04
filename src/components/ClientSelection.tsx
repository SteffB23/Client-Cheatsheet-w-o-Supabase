import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { ClientButton } from './ClientButton';
import { ClientModal } from './ClientModal';
import { ClientInfo } from '../types/client';

interface ClientSelectionProps {
  onLogout: () => void;
}

export function ClientSelection({ onLogout }: ClientSelectionProps) {
  const [clients, setClients] = useState<ClientInfo[]>(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Client ${i + 1}`,
      fullName: `John/Jane Doe ${i + 1}`,
      dob: '01/01/2015',
      school: `Elementary School ${i + 1}`,
      grade: `${Math.floor(Math.random() * 5) + 1}th Grade`,
      teacherName: `Ms. Smith ${i + 1}`,
      targetedBehaviors: [
        'Aggressive behavior during transitions',
        'Non-compliance with instructions',
        'Difficulty with peer interactions'
      ],
      interventions: [
        'Positive reinforcement schedule',
        'Visual schedule implementation',
        'Token economy system',
        'Social skills training'
      ],
      clinician: {
        name: `Dr. Sarah Johnson ${i + 1}`,
        email: `sarah.johnson${i + 1}@rbtclinic.com`,
        phone: '(555) 123-4567'
      }
    }))
  );
  
  const [selectedClient, setSelectedClient] = useState<ClientInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClientSelect = (client: ClientInfo) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const handleUpdateClient = (updatedClient: ClientInfo) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Choose your Client
          </h1>
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-900 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {clients.map((client) => (
            <ClientButton
              key={client.id}
              name={client.name}
              onClick={() => handleClientSelect(client)}
            />
          ))}
        </div>
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        client={selectedClient}
        onUpdate={handleUpdateClient}
      />
    </>
  );
}