import {UserType} from "@projet-clean/domain/entities/UserType.ts";
import {useState} from "react";
import {Moto} from "./Moto.tsx";


interface CustomerProps {
    user: UserType;
    onClose: () => void;
}

export const Customer = ({user, onClose}: CustomerProps) => {
    const [motoId, setMotoId] = useState<string>("")

    return (
        <>
            {motoId && (
                <div className="mt-6">
                    <Moto motoId={motoId} onClose={() => setMotoId("")}/>
                </div>
            )}

            {!motoId && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-full max-w-fit p-6 rounded-lg shadow-lg relative">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        aria-label="Fermer la modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <p>
                        <span className="font-semibold">Nom :</span> {user.name}
                    </p>
                    <p>
                        <span className="font-semibold">Email :</span> {user.email}
                    </p>
                    <p>
                        <span className="font-semibold">Motos :</span>
                        {user.motos.map((moto) => (
                            <div
                                key={moto.id}
                                className="p-4 border border-gray-200 rounded-lg mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setMotoId(moto.id)}
                            >
                                <p>
                                    <span className="font-semibold">Modèle :</span> {moto.model}
                                </p>
                                <p>
                                        <span
                                            className="font-semibold">Immatriculation :</span> {moto.registrationNumber}
                                </p>
                                <p>
                                    <span className="font-semibold">KM :</span> {moto.mileage}
                                </p>
                                <p>
                                <span
                                    className="font-semibold">Nombre de maintenances: </span> {moto.maintenances.length}
                                </p>
                            </div>
                        ))}
                    </p>
                </div>
            </div>}
        </>
    )
}