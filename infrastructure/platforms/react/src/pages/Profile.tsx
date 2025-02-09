import {getAllUsers} from "../services/api.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {UserType} from "@projet-clean/domain/entities/UserType.ts";
import {Moto} from "../components/Moto.tsx";

export const Profile = () => {
    const {user, isAuthenticated, isAdmin} = useAuth()
    const [profile, setProfile] = useState<UserType | null>(null)
    const [motoId, setMotoId] = useState<string>("")
    const userId = user?.id

    const fetchProfile = async () => {
        try {
            const data = await getAllUsers(userId);
            setProfile(data[0]);
        } catch (error) {
            console.error("Erreur lors de la récupération des users:", error);
        }
    };

    useEffect(() => {
        fetchProfile()
    }, [user]);

    if (!isAuthenticated) return null

    return <>

        {motoId && (
            <div className="mt-6">
                <Moto motoId={motoId} onClose={() => setMotoId("")}/>
            </div>
        )}
        <div
            className="p-4 border border-gray-200 rounded-lg mb-4 transition-colors"
        >
            <p>
                <span className="font-semibold">Nom :</span> {profile?.name}
            </p>
            <p>
                <span className="font-semibold">Email :</span> {profile?.email}
            </p>
            <p>
                <span className="font-semibold">Phone :</span> {profile?.phone}
            </p>
            <p>
                <span className="font-semibold">Role :</span> {profile?.role}
            </p>
            {!isAdmin && <p>
                <span className="font-semibold">Motos :</span>
                {profile?.motos.map((moto) => (
                    <div
                        key={moto.id}
                        className="p-4 border border-gray-200 rounded-lg mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setMotoId(moto.id)}
                    >
                        <p>
                            <span className="font-semibold">Modèle :</span> {moto.model}
                        </p>
                        <p>
                            <span className="font-semibold">Immatriculation :</span> {moto.registrationNumber}
                        </p>
                        <p>
                            <span className="font-semibold">KM :</span> {moto.mileage}
                        </p>
                        <p>
                            <span className="font-semibold">Nombre de maintenances: </span> {moto.maintenances.length}
                        </p>
                    </div>
                ))}
            </p>}
        </div>
    </>
}