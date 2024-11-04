import React, { useState, useEffect } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import { ClientInfo } from '../types/client';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientInfo | null;
  onUpdate: (client: ClientInfo) => void;
}

export function ClientModal({ isOpen, onClose, client, onUpdate }: ClientModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ClientInfo | null>(null);

  useEffect(() => {
    setFormData(client);
    setIsEditing(false);
  }, [client]);

  if (!isOpen || !formData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleClinicianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        clinician: {
          ...prev.clinician,
          [name]: value
        }
      };
    });
  };

  const handleBehaviorChange = (index: number, value: string) => {
    setFormData(prev => {
      if (!prev) return prev;
      const newBehaviors = [...prev.targetedBehaviors];
      newBehaviors[index] = value;
      return {
        ...prev,
        targetedBehaviors: newBehaviors
      };
    });
  };

  const handleInterventionChange = (index: number, value: string) => {
    setFormData(prev => {
      if (!prev) return prev;
      const newInterventions = [...prev.interventions];
      newInterventions[index] = value;
      return {
        ...prev,
        interventions: newInterventions
      };
    });
  };

  const addBehavior = () => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        targetedBehaviors: [...prev.targetedBehaviors, '']
      };
    });
  };

  const removeBehavior = (index: number) => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        targetedBehaviors: prev.targetedBehaviors.filter((_, i) => i !== index)
      };
    });
  };

  const addIntervention = () => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        interventions: [...prev.interventions, '']
      };
    });
  };

  const removeIntervention = (index: number) => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        interventions: prev.interventions.filter((_, i) => i !== index)
      };
    });
  };

  const handleSave = () => {
    if (formData) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-xl font-semibold text-gray-900 w-full px-2 py-1 border border-gray-300 rounded-md"
                />
              ) : (
                <h3 className="text-xl font-semibold text-gray-900">{formData.name}</h3>
              )}
            </div>
            <div className="flex gap-4">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Edit
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{formData.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{formData.dob}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">School</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{formData.school}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Grade</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{formData.grade}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Teacher's Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="teacherName"
                      value={formData.teacherName}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{formData.teacherName}</p>
                  )}
                </div>
              </div>

              {/* Targeted Behaviors */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Targeted Behaviors</h3>
                  {isEditing && (
                    <button
                      onClick={addBehavior}
                      className="text-sm flex items-center gap-1 text-gray-600 hover:text-gray-900"
                    >
                      <Plus size={16} /> Add Behavior
                    </button>
                  )}
                </div>
                <ul className="space-y-2">
                  {formData.targetedBehaviors.map((behavior, index) => (
                    <li key={index} className="flex gap-2">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={behavior}
                            onChange={(e) => handleBehaviorChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <button
                            onClick={() => removeBehavior(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-800">{behavior}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ABA Interventions */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Most Effective ABA Interventions</h3>
                  {isEditing && (
                    <button
                      onClick={addIntervention}
                      className="text-sm flex items-center gap-1 text-gray-600 hover:text-gray-900"
                    >
                      <Plus size={16} /> Add Intervention
                    </button>
                  )}
                </div>
                <ul className="space-y-2">
                  {formData.interventions.map((intervention, index) => (
                    <li key={index} className="flex gap-2">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={intervention}
                            onChange={(e) => handleInterventionChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <button
                            onClick={() => removeIntervention(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-800">{intervention}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lead Clinician Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Lead Clinician</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.clinician.name}
                        onChange={handleClinicianChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <p className="text-gray-900">{formData.clinician.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.clinician.email}
                        onChange={handleClinicianChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <p className="text-gray-600">{formData.clinician.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.clinician.phone}
                        onChange={handleClinicianChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <p className="text-gray-600">{formData.clinician.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}