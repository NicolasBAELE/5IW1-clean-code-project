import CreateStockForm from "../components/CreateStockForm";
import EditStockForm from "../components/EditStockForm";
import { useEffect, useState, useRef } from "react";
import { getAllStocks, deleteStock } from "../services/api";
import { toast } from "react-toastify";

export const Stocks = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [editStock, setEditStock] = useState<any | null>(null);
  const displayedToasts = useRef(new Set()); 

  const fetchStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data);

      data.forEach((stock: any) => {
        if (stock.quantity < 3 && !displayedToasts.current.has(stock.id + "_low")) {
          toast.error(`⚠️ Rupture imminente pour "${stock.name}" (${stock.quantity} restant)`, { autoClose: 5000 });
          displayedToasts.current.add(stock.id + "_low");
        } else if (stock.quantity >= 3 && stock.quantity < 5 && !displayedToasts.current.has(stock.id + "_medium")) {
          toast.warn(`⚠️ Stock faible pour "${stock.name}" (${stock.quantity} restant)`, { autoClose: 5000 });
          displayedToasts.current.add(stock.id + "_medium");
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

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce stock ?")) {
      try {
        await deleteStock(id);
        fetchStocks();
        toast.success("Stock supprimé avec succès !");
      } catch (error) {
        toast.error("Erreur lors de la suppression du stock.");
      }
    }
  };

  return (
    <>
      {editStock && (
        <EditStockForm
          stock={editStock}
          onStockUpdated={fetchStocks}
          onClose={() => setEditStock(null)}
        />
      )}
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
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => setEditStock(stock)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(stock.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Aucun produit.</p>
      )}
    </>
  );
};
