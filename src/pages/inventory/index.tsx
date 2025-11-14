import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Loader2, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getInventory, type InventoryItem } from "@/services/inventory";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await getInventory();
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar inventário:", error);
      toast.error("Não foi possível carregar seu inventário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const formatDateTime = (dateString: string) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString("pt-BR");
  };

  console.log("INVENTORY ITEMS:", items);
  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-slate-700" />
            <h2 className="text-xl font-semibold text-slate-800">
              Meu inventário
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchInventory}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Atualizando...
              </>
            ) : (
              "Atualizar"
            )}
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[40vh] text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
            <span className="text-sm">Carregando inventário...</span>
          </div>
        ) : items.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-muted-foreground">
              <p>Você ainda não possui nenhum cosmético adquirido.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => {
              const c = item.cosmetic;
              return (
                <Card key={item.id} className="bg-white hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex items-center justify-center shrink-0">
                      {c.imageUrl ? (
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Sem imagem
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base line-clamp-2">
                          {c.name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] uppercase tracking-wide"
                        >
                          Já adquirido
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Tipo:{" "}
                        <span className="font-medium text-foreground">
                          {c.type}
                        </span>{" "}
                        · Raridade:{" "}
                        <span className="font-medium text-foreground">
                          {c.rarity}
                        </span>
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-semibold text-foreground">
                        Preço na compra:
                      </span>{" "}
                      {c.price > 0 ? `${c.price} V-Bucks` : "Grátis"}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        Adquirido em:
                      </span>{" "}
                      {formatDateTime(item.acquiredAt)}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        Tipo de aquisição:
                      </span>{" "}
                      {item.source === "SINGLE"
                        ? "Compra unitária"
                        : item.source === "BUNDLE"
                        ? "Pacote"
                        : item.source}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
