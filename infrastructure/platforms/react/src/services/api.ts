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
                name: name,
                email: email,
                password: password,
            }
        })
    });
    return response.json()
};

export const loginUser = async (formData) => {
    const {email, password} = formData;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token,
    user{name},
  }
}`,
            variables: {
                email: email,
                password: password,
            }
        })
    });
    return response.json()
};