import {getAllUsers} from "../services/api.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {UserType} from "@projet-clean/domain/entities/UserType.ts";
import CreateUserForm from "../components/CreateUserForm.tsx";

export const Admins = () => {
    const {isAuthenticated} = useAuth()
    const [users, setUsers] = useState<UserType[]>([])
    const [openCreateUser, setOpenCreateUser] = useState<boolean>(false)
    const [user, setUser] = useState<UserType | null>(null)

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des users:", error);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, []);

    const onCustomerCreated = () => {
        fetchUsers()
        setOpenCreateUser(false)
    }

    return <>
        {isAuthenticated && openCreateUser && <CreateUserForm onUserCreated={onCustomerCreated} isAdmin={true}/>}
        {isAuthenticated && !openCreateUser &&
            <button
                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"}
                onClick={() => setOpenCreateUser(true)}
            >
                Ajouter un administrateur
            </button>
        }

        {/*{!openCreateUser && user && (*/}
        {/*    <div className="mt-6">*/}
        {/*        <Customer user={user} onClose={() => setUser(null)}/>*/}
        {/*    </div>*/}
        {/*)}*/}

        {!openCreateUser && <>
            <h2 className="text-xl font-bold mt-6 mb-4 border-b pb-2 text-gray-800">
                Administrateurs :
            </h2>
            {users.length > 0 ? (
                    users.filter(user => user.role === "ADMIN").map((user) => (
                        <div
                            key={user.id}
                            className="p-4 border border-gray-200 rounded-lg mb-4 transition-colors"
                            onClick={() => setUser(user)}
                        >
                            <p>
                                <span className="font-semibold">Nom :</span> {user.name}
                            </p>
                            <p>
                                <span className="font-semibold">Email :</span> {user.email}
                            </p>
                        </div>
                    ))
                ) :
                (
                    <p className="text-gray-600">Aucun administrateur disponible.</p>
                )
            }
        </>}
    </>
}