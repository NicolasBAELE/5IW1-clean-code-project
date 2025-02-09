import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getAllStocks} from "../services/api.ts";
import {Stock} from "@projet-clean/domain/entities/StockType.ts";
import {Maintenance} from "@projet-clean/domain/entities/MaintenanceType.ts";
import {toast} from "react-toastify";


export const CreateMaintenanceForm = ({setOpenCreateMaintenanceForm, handleCreateMaintenance, lastMaintenance}: {
    setOpenCreateMaintenanceForm: Dispatch<SetStateAction<boolean>>,
    handleCreateMaintenance: (
        year: string,
        type: "PREVENTIVE" | "CURATIVE",
        mileageFirstMaintenance: number,
        setMileageFirstMaintenance: Dispatch<SetStateAction<number>>,
        products: { id: string, quantity: number }[]
    ) => void,
    lastMaintenance: Maintenance | undefined
}) => {

    const [year, setYear] = useState<string>("");
    const [type, setType] = useState<"PREVENTIVE" | "CURATIVE">("PREVENTIVE");
    const [mileageFirstMaintenance, setMileageFirstMaintenance] = useState<number>(0);
    const [productId, setProductId] = useState<string>("");
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const [products, setProducts] = useState<{ id: string, quantity: number }[]>([]);
    const [stocks, setStocks] = useState<Stock[]>([])

    const handleAddProduct = () => {
        if (productId.trim() && productQuantity > 0) {
            setProducts([...products, {id: productId, quantity: productQuantity}]);
            setProductId("");
            setProductQuantity(1);
        }
    };

    const fetchStocks = async () => {
        try {
            const data = await getAllStocks();
            setStocks(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des motos:", error);
        }
    };

    const handleQuantity = (wantedQuantity: number) => {
        const wantedProduct = stocks.find(stock => stock.id === productId)
        if (!wantedProduct) {
            toast.error(`veuillez remplir tout les champs)`, {
                autoClose: 5000,
            });
            return
        }
        if (wantedQuantity > wantedProduct.quantity) {
            toast.error(`La quantité maximum pour ce produit est de ${wantedProduct.quantity})`, {
                autoClose: 5000,
            });
            return
        }
        setProductQuantity(wantedQuantity)
    }

    useEffect(() => {
        fetchStocks();
    }, []);

    function HandleCreationClick() {
        if (!year || !type) {
            toast.error(`veuillez remplir tout les champs)`, {
                autoClose: 5000,
            });
        } else {
            handleCreateMaintenance(
                year,
                type,
                mileageFirstMaintenance,
                setMileageFirstMaintenance,
                products
            );
            setOpenCreateMaintenanceForm(false);
        }
    }

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Date maintenance
            </label>
            <input
                type="date"
                onChange={(e) => setYear(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            {!lastMaintenance?.id && (
                <>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kilométrage à la dernière maintenance
                    </label>
                    <input
                        type="number"
                        onChange={(e) =>
                            setMileageFirstMaintenance(parseInt(e.target.value))
                        }
                        placeholder="Kilométrage"
                        className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                    />
                </>
            )}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Type d'entretien
            </label>
            <select
                onChange={(e) =>
                    setType(e.target.value as "PREVENTIVE" | "CURATIVE")
                }
                className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            >
                <option value="PREVENTIVE">Préventif</option>
                <option value="CURATIVE">Curatif</option>
            </select>

            {lastMaintenance?.id && <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Produit
                </label>
                <select
                    onChange={(e) => setProductId(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                    value={productId}
                >
                    <option value="" disabled>
                        Choisissez un produit
                    </option>
                    {stocks.map(stock => <option value={stock.id}>{stock.name}</option>)}
                </select>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité
                </label>
                <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => handleQuantity(parseInt(e.target.value))}
                    placeholder="Quantité"
                    className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                />
                <button
                    onClick={handleAddProduct}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-full mb-4"
                >
                    Ajouter un produit
                </button>
            </>
            }

            {products.length > 0 && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Produits ajoutés
                    </label>
                    <ul>
                        {products.map((product, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                {stocks.find(stock => stock.id === product.id)?.name} - Quantité: {product.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={() => HandleCreationClick()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full"
            >
                {lastMaintenance?.id
                    ? "Ajouter un entretien"
                    : "Renseigner le dernier entretien en date"}
            </button>
        </div>
    );
};