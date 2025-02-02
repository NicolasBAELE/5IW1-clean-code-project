export interface Moto {
    model: string;
    kilometrage: number;
}

const API_URL = "http://localhost:4000";

// Mock de la donnée
export const mockMotos = {
    data: [
        {
            model: 'Street Triple',
            kilometrage: 10230,
            lastMaintenance: '2024-09-15',
            nextMaintenance: '2025-03-15',
            maintenanceInterval: '10000',
            maintenanceHistory: [
                {
                    date: '2023-03-10',
                    description: 'Changement de filtre à huile et révision',
                    cost: 150.0,
                    partsReplaced: ['Filtre à huile', 'Bougies'],
                },
                {
                    date: '2022-09-20',
                    description: 'Changement des plaquettes de frein',
                    cost: 100.0,
                    partsReplaced: ['Plaquettes de frein avant', 'Plaquettes de frein arrière'],
                },
            ],
            driver: {
                name: 'John Doe',
                licenseNumber: 'AB123456',
                experienceYears: 5,
                incidentHistory: [
                    {
                        date: '2023-12-01',
                        type: 'Accident mineur',
                        description: 'Collision avec un véhicule',
                        severity: 'Moyenne'
                    },
                ],
            },
        },
        {
            model: 'Tiger Sport 660',
            kilometrage: 15300,
            lastMaintenance: '2024-01-10',
            nextMaintenance: '2025-01-10',
            maintenanceInterval: '16000',
            maintenanceHistory: [
                {
                    date: '2023-01-10',
                    description: 'Révision complète et vidange',
                    cost: 180.0,
                    partsReplaced: ['Filtre à huile', 'Huile moteur', 'Plaquettes de frein'],
                },
                {
                    date: '2022-10-05',
                    description: 'Changement des pneus',
                    cost: 300.0,
                    partsReplaced: ['Pneus avant', 'Pneus arrière'],
                },
            ],
            driver: {
                name: 'Jane Smith',
                licenseNumber: 'CD789012',
                experienceYears: 8,
                incidentHistory: [
                    {date: '2022-05-15', type: 'Infraction', description: 'Excès de vitesse', severity: 'Mineure'},
                ],
            },
        },
        {
            model: 'Bonneville T120',
            kilometrage: 20450,
            lastMaintenance: '2023-10-05',
            nextMaintenance: '2024-10-05',
            maintenanceInterval: '12000',
            maintenanceHistory: [
                {
                    date: '2023-10-05',
                    description: 'Révision de la suspension et du moteur',
                    cost: 200.0,
                    partsReplaced: ['Suspension avant', 'Suspension arrière'],
                },
            ],
            driver: {
                name: 'Robert Brown',
                licenseNumber: 'EF345678',
                experienceYears: 10,
                incidentHistory: [],
            },
        },
    ]
};


export const fetchMotos = async () => {
    return "implement"
};

export const fetchUsers = async () => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query ($where: UserFilterInput) {
                  getUsers(payloadUser: $where) {
                    id
                    name
                    email
                  }
                }`,
            variables: {
                where: {"name": "pierre"}
            }
        })
    });
    return response.json()
};

export const register = async (formData) => {
    const {name, email, password} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation ($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, email: $email, password: $password) {
    user {
      email
    },
    token,
    message,
    status,
  }
}`,
            variables: {
                name:name,
                email:email,
                password:password,
            }
        })
    });
    return response.json()
};
