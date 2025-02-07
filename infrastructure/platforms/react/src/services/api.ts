export interface Moto {
    model: string;
    kilometrage: number;
}

const API_URL = "http://localhost:4000";

export const fetchMotos = async () => {
    return "fetchMotos function used"
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

export const register = async (formData: { name: string, email: string, password: string }) => {
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
                name: name,
                email: email,
                password: password,
            }
        })
    });
    return response.json()
};

export const loginUser = async (formData: { login: string, password: string }) => {
    const {login: email, password} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query:
                `mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                    token,
                    user {name},
                    }
                }`
            ,
            variables: {
                email: email,
                password: password,
            }
        })
    });
    return response.json()
};

export const createMoto = async (formData: {
    model: string,
    registrationNumber: string,
    mileage: number,
    ownerId: string
}) => {
    const {model, registrationNumber, mileage, ownerId} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query:
                `mutation CreateMoto($model: String!, $registrationNumber: String!, $mileage: Int!, $ownerId: String) {
                  createMoto(model: $model, registrationNumber: $registrationNumber, mileage: $mileage, ownerId: $ownerId) {
                    model,
                    registrationNumber,
                    mileage, 
                    ownerId
                  }
                }`
            ,
            variables: {
                model: model,
                registrationNumber: registrationNumber,
                mileage: Number(mileage),
                ownerId: ownerId,
            }
        })
    });
    return response.json()
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
                            email
                        }
                        createdAt,
                        updatedAt,
                        maintenances {
                          id,
                          scheduledDate,
                          completedDate,
                          mileageAtService,
                          type,
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

export const createMaintenance = async (
    {
        year,
        type,
        motoId,
        mileage,
    }: {
        year: string;
        type: "PREVENTIVE" | "CURATIVE";
        motoId: string;
        mileage: number
    }) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
                    mutation CreateMaintenance($motoId: String!, $year: String!, $type: MaintenanceType!, $mileage: Int!) {
                      createMaintenance(motoId: $motoId, year: $year, type: $type, mileage: $mileage) {
                        id,
                        motoId,
                        mileageAtService,
                        scheduledDate,
                        completedDate,
                        type
                      }
                    }
                    `
                ,
                variables: {
                    motoId: motoId,
                    year: year,
                    type: type,
                    mileage: mileage,
                },
            })
        })

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result
    } catch
        (error) {
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
                    `
                ,
                variables: {
                    maintenanceId: maintenanceId,
                    mileage: mileage
                },
            })
        })

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result.data.getAllMotos;
    } catch
        (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de récupérer les motos");
    }
};

export const createStock = async (
    {
        name,
        cost,
        quantity,
    }: {
        name: string;
        cost: string;
        quantity: string;
    }) => {
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
                    `
                ,
                variables: {
                    name: name,
                    cost: parseFloat(cost),
                    quantity: parseInt(quantity),
                },
            })
        })

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result
    } catch
        (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de créer le produit");
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
                    `
                ,
                variables: {},
            })
        })

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result.data.getAllStocks
    } catch
        (error) {
        console.error("❌ Erreur API:", error);
        throw new Error("Impossible de créer le produit");
    }
};

