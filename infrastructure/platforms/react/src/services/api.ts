export interface Moto {
    model: string;
    kilometrage: number;
}

const API_URL = "http://localhost:4000";

export const getAllUsers = async (userId?: string) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query GetUsers($userId: String) {
                       getUsers(userId: $userId) {
                        id,
                        name,
                        email,
                        role,
                        phone,
                        motos {
                            id, 
                            model,
                            registrationNumber,
                            mileage,
                            ownerId,
                            owner {
                                id,
                                email,
                                name,
                                role
                            }
                            maintenances {
                              id,
                              scheduledDate,
                              completedDate,
                              mileageAtService,
                              type,
                              cost,
                              notes
                            },
                        }
                      }
                    }`,
                variables: userId ? {userId} : {},
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result.data.getUsers;
    } catch (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de récupérer les utilisateurs");
    }
};

export const register = async (formData: { name: string; email: string; password: string; role?: string }) => {
    const {name, email, password, role} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation ($name: String!, $email: String!, $password: String!, $role: String) {
                      createUser(name: $name, email: $email, password: $password, role: $role) {
                        token,
                        message,
                        status,
                      }
                    }`,
            variables: {
                name: name,
                email: email,
                password: password,
                role: role,
            },
        }),
    });

    const result = await response.json();
    return result.data.createUser;
};

export const registerDriver = async (formData: { licenseNumber: string; experienceYears: string; userId: string }) => {
    const {licenseNumber, experienceYears, userId} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation CreateDriver($userId: String!, $licenseNumber: String!, $experienceYears: Int!) {
  createDriver(userId: $userId, licenseNumber: $licenseNumber, experienceYears: $experienceYears) {
    driver {
      licenseNumber
      experienceYears
      user {
        email
      }
      motoTests {
        moto 
      }
    }
    message
    status
  }
}`,
            variables: {
                licenseNumber: licenseNumber,
                experienceYears: parseInt(experienceYears),
                userId: userId,
            },
        }),
    });
    const result = await response.json();
    return result;
};

export const getAllDrivers = async () => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query GetAllDrivers {
  getAllDrivers {
    experienceYears
    id
    createdAt
    licenseNumber
    updatedAt
    userId
    motoTests {
      moto,
      startDate,
      endDate
    }
    incidentHistory {
      description
      date
      createdAt
      id
      updatedAt
    }
    user {
      email
      name
      phone
      role
    }
  }
}`,
        }),
    });
    const result = await response.json();
    return result;
};

export const resetPassword = async (formData: { email: string; password: string }) => {
    const {email, password} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation ($email: String!, $password: String!) {
                      resetPassword(email: $email, password: $password) {
                        token,
                        message,
                      }
                    }`,
            variables: {
                email: email,
                password: password,
            },
        }),
    });

    const result = await response.json();
    return result.data.resetPassword;
};

export const loginUser = async (formData: { login: string; password: string }) => {
    const {login: email, password} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                    token,
                    user {name},
                    message,
                    status,
                    }
                }`,
            variables: {
                email: email,
                password: password,
            },
        }),
    });
    return response.json();
};

export const createMoto = async (formData: {
    model: string;
    registrationNumber: string;
    mileage: number;
    ownerId: string;
}) => {
    const {model, registrationNumber, mileage, ownerId} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation CreateMoto($model: String!, $registrationNumber: String!, $mileage: Int!, $ownerId: String) {
                  createMoto(model: $model, registrationNumber: $registrationNumber, mileage: $mileage, ownerId: $ownerId) {
                    moto {
                        model,
                        registrationNumber,
                        mileage, 
                        ownerId,
                    },
                    status,
                    message,
                  }
                }`,
            variables: {
                model: model,
                registrationNumber: registrationNumber,
                mileage: Number(mileage),
                ownerId: ownerId,
            },
        }),
    });
    return response.json();
};

export const getAllMotos = async (motoId?: string) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    query GetAllMotos($motoId: String) {
                      getAllMotos(motoId: $motoId) {
                        id, 
                        model,
                        registrationNumber,
                        mileage,
                        ownerId,
                        owner {
                            id,
                            email,
                            name,
                            role
                        }
                        maintenances {
                          id,
                          scheduledDate,
                          completedDate,
                          mileageAtService,
                          type,
                          cost,
                          notes
                        },
                      }
                    }
                `,
                variables: motoId ? {motoId} : {},
            }),
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();
        return result.data.getAllMotos;
    } catch (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de récupérer les motos");
    }
};

export const createMaintenance = async ({
                                            year,
                                            type,
                                            motoId,
                                            mileage,
                                            products,
                                        }: {
    year: string;
    type: "PREVENTIVE" | "CURATIVE";
    motoId: string;
    mileage: number;
    products: { id: string; quantity: number }[];
}) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
                    mutation CreateMaintenance($motoId: String!, $year: String!, $type: MaintenanceType!, $mileage: Int!, $products: [ProductInput!]!) {
                      createMaintenance(motoId: $motoId, year: $year, type: $type, mileage: $mileage, products: $products) {
                        id,
                        motoId,
                        mileageAtService,
                        scheduledDate,
                        completedDate,
                        type
                      }
                    }
                    `,
                variables: {
                    motoId: motoId,
                    year: year,
                    type: type,
                    mileage: mileage,
                    products: products,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de récupérer les motos");
    }
};

export const validateMaintenance = async (maintenanceId: string, mileage: number) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
                    mutation ValidateMaintenance($maintenanceId: String!, $mileage: Int!) {
                      validateMaintenance(maintenanceId: $maintenanceId, mileage: $mileage) {
                        id,
                        motoId,
                        mileageAtService,
                        scheduledDate,
                        completedDate,
                        type
                      }
                    }
                    `,
                variables: {
                    maintenanceId: maintenanceId,
                    mileage: mileage,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result.data.getAllMotos;
    } catch (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de récupérer les motos");
    }
};

export const createStock = async ({name, cost, quantity}: { name: string; cost: string; quantity: string }) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
                    mutation CreateStock($name: String!, $cost: Float!, $quantity: Int!) {
                      createStock(name: $name, cost: $cost, quantity: $quantity) {
                        id,
                        name,
                        cost,
                        quantity
                      }
                    }
                    `,
                variables: {
                    name: name,
                    cost: parseFloat(cost),
                    quantity: parseInt(quantity),
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de créer le produit");
    }
};

export const createTest = async ({moto, startDate, endDate, driverId}: { moto: string; startDate: string; endDate: string, driverId: string }) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
                    mutation CreateMotoTest($moto: String!, $startDate: String!, $endDate: String!, $driverId: String!) {
                      createMotoTest(moto: $moto, startDate: $startDate, endDate: $endDate, driverId: $driverId) {
                        moto,
                        startDate,
                        endDate
                      }
                    }
                    `,
                variables: {
                    moto: moto,
                    startDate: startDate,
                    endDate: endDate,
                    driverId: driverId
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de créer l'essai");
    }
};

export const getAllStocks = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
                    query GetAllStocks {
                      getAllStocks {
                        id,
                        name,
                        cost,
                        quantity
                      }
                    }
                    `,
                variables: {},
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result.data.getAllStocks;
    } catch (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de créer le produit");
    }
};
export const updateStock = async (id: string, updatedData: { name: string; cost: number; quantity: number }) => {
    try {
        const response = await fetch(`${API_URL}/stock`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    mutation UpdateStock($id: String!, $name: String!, $cost: Float!, $quantity: Int!) {
                        updateStock(id: $id, name: $name, cost: $cost, quantity: $quantity) {
                            id,
                            name,
                            cost,
                            quantity
                        }
                    }
                `,
                variables: { id, ...updatedData },
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result.data.updateStock;
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour du stock :", error);
        throw new Error("Impossible de modifier le stock");
    }
};

export const deleteStock = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/stock`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    mutation DeleteStock($id: String!) {
                        deleteStock(id: $id) {
                            id,
                            message
                        }
                    }
                `,
                variables: { id },
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result.data.deleteStock;
    } catch (error) {
        console.error("❌ Erreur lors de la suppression du stock :", error);
        throw new Error("Impossible de supprimer le stock");
    }
};

