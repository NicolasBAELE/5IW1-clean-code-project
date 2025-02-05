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
    console.log("📌 Appel API avec motoId:", motoId);

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
                        createdAt,
                        updatedAt
                      }
                    }
                `,
                variables: motoId ? { motoId } : {},
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

