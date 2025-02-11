import {DriverType} from "@projet-clean/domain/entities/DriverType";
import {useAuth} from "../context/AuthContext.tsx";
import {useState} from "react";
import {CreateTestForm} from "./CreateTestForm.tsx";
import {useNavigate} from "react-router";
import {formatDate} from "./Moto.tsx";

interface DriverProps {
    driver: DriverType;
    onClose: () => void;
}

export const Driver = ({driver, onClose}: DriverProps) => {
    const {isAuthenticated} = useAuth();
    const [openCreateTest, setOpenCreateTest] = useState<boolean>(false)
    const navigate = useNavigate();
    console.log(driver)

    const handleMotoTestCreated = () => {
        setOpenCreateTest(false)
        navigate(0)
    }

    if (!driver) return <div className="p-4 text-center">Pas de données à afficher.</div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-5xl p-8 rounded-lg shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
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

                {isAuthenticated && !openCreateTest && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setOpenCreateTest(true)}
                    >
                        Ajouter un essai
                    </button>
                )}

                {openCreateTest && (
                    <CreateTestForm handleMotoTestCreated={handleMotoTestCreated} driverId={driver.id}/>
                )}

                {!openCreateTest && driver && (
                    <div>
                        <div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Détails de la moto</h3>
                                <p>
                                    <span className="font-semibold">Nom :</span> {driver.user.name}
                                </p>
                                <p>
                                    <span className="font-semibold">Email :</span> {driver.user.email}
                                </p>
                                <p>
                                    <span className="font-semibold">Numéro de permis :</span> {driver.licenseNumber}
                                </p>
                                <p>
                                    <span className="font-semibold">Expérience :</span> {driver.experienceYears} ans
                                </p>
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                    Historique des essais
                                </h4>
                                <div className="max-h-[500px] overflow-y-auto pr-2">
                                    {driver.motoTests
                                        .map((motoTest, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-md p-4 mb-2 shadow-sm"
                                            >
                                                <p className="text-gray-700">
                                                    <strong>Date de début :</strong> {formatDate(motoTest.startDate)}
                                                </p>
                                                <p className="text-gray-700">
                                                    <strong>Date de fin :</strong> {formatDate(motoTest.endDate)}
                                                </p>
                                                <p className="text-gray-700">
                                                    <strong>Moto :</strong> {motoTest.moto}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
