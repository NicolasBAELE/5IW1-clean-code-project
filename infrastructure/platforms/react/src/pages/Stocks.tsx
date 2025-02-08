import CreateStockForm from "../components/CreateStockForm.tsx";
import {useEffect, useState} from "react";
import {getAllStocks} from "../services/api.ts";
import { toast } from "react-toastify";

export const Stocks = () => {
    const [stocks, setStocks] = useState<any[]>([])

    const fetchStocks = async () => {
        try {
            const data = await getAllStocks();
            setStocks(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des Stocks:", error);
            toast.error("Erreur lors de la récupération des stocks.");  
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const onStockCreated = () => {
        fetchStocks();
        toast.success("Stock ajoutée avec succès !");
    };

    return <>
        <CreateStockForm onStockCreated={onStockCreated}/>
        {stocks.length > 0 ? (
            stocks.map((stock) => (
                <div
                    key={stock.id}
                    className="p-4 border border-gray-200 rounded-lg mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <p>
                        <span className="font-semibold">Nom du produit: </span> {stock.name}
                    </p>
                    <p>
                        <span className="font-semibold">Prix :</span> {stock.cost}
                    </p>
                    <p>
                        <span className="font-semibold">Quantité disponible :</span> {stock.quantity}
                    </p>
                </div>
            ))
        ) : (
            <p className="text-gray-600">Aucun produit.</p>
        )}
    </>
}