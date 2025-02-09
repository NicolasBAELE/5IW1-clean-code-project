import CreateStockForm from "../components/CreateStockForm";
import { useEffect, useState, useRef } from "react";
import { getAllStocks } from "../services/api";
import { toast } from "react-toastify";

export const Stocks = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const displayedToasts = useRef(new Set()); 

  const fetchStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data);

      const criticalStockItems = data.filter((stock: any) => stock.quantity <= 1);
      criticalStockItems.forEach((item: any) => {
        if (!displayedToasts.current.has(item.id)) {
          displayedToasts.current.add(item.id);
          toast.error(`Stock critique : ${item.name} (Quantité : ${item.quantity})`, {
            autoClose: 5000,
          });
        }
      });

      const lowStockItems = data.filter(
        (stock: any) => stock.quantity > 1 && stock.quantity < 5 && !displayedToasts.current.has(stock.id)
      );

      lowStockItems.forEach((item: any) => {
        if (!displayedToasts.current.has(item.id)) {
          displayedToasts.current.add(item.id); 
          toast.warning(`Stock faible : ${item.name} (Quantité : ${item.quantity})`);
        }
      });
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
    toast.success("Stock ajouté avec succès !");
  };

  return (
    <>
      <CreateStockForm onStockCreated={onStockCreated} />
      {stocks.length > 0 ? (
        stocks.map((stock) => (
          <div
            key={stock.id}
            className={`p-4 border rounded-lg mb-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              stock.quantity <= 1
                ? "bg-red-100 border-red-500"
                : stock.quantity < 5
                ? "bg-yellow-100 border-yellow-500"
                : "border-gray-200"
            }`}
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
  );
};
