import { ChangeEvent, FormEvent, useState } from "react";
import { updateStock } from "../services/api";
import { toast } from "react-toastify";

interface EditStockFormProps {
  stock: any;
  onStockUpdated: () => void;
  onClose: () => void;
}

const EditStockForm = ({ stock, onStockUpdated, onClose }: EditStockFormProps) => {
  const [formData, setFormData] = useState({
    name: stock.name,
    cost: stock.cost,
    quantity: stock.quantity,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "quantity" || e.target.name === "cost"
        ? Number(e.target.value) // ✅ Convertir en nombre si c'est quantity ou cost
        : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateStock(stock.id, formData);
      toast.success("Stock modifié avec succès !");
      onStockUpdated();
      onClose();
    } catch (error) {
      toast.error("Erreur lors de la modification du stock.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Modifier le stock</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom du produit</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom du produit"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prix</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Prix"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantité</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantité"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Modifier
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStockForm;
