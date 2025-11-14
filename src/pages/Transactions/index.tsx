import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { getTransactions, type TransactionItem } from "@/services/transactions";

function formatDate(date: string) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString("pt-BR");
}

function formatAmount(amount: number) {
  return `${amount} V-Bucks`;
}

export default function TransactionHistoryPage() {
  const [items, setItems] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      console.log("TRANSACTIONS ITEMS:", data);
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar histórico de transações:", error);
      toast.error("Não foi possível carregar o histórico de transações.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 space-y-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Histórico de transações</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
            <span className="text-sm">Carregando histórico...</span>
          </div>
        ) : items.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-muted-foreground">
              Nenhuma transação registrada ainda.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {items.map((tx) => (
              <Card key={tx.id} className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-sm flex items-center gap-2">
                      {tx.type === "PURCHASE" ? "Compra de cosmético" : tx.type}
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                        {tx.itemType}
                      </Badge>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(tx.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {tx.amount > 0 ? `-${formatAmount(tx.amount)}` : formatAmount(tx.amount)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Saldo: {tx.balanceBefore} → {tx.balanceAfter} V-Bucks
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="text-sm text-muted-foreground flex flex-col gap-1">
                  {tx.cosmetic && (
                    <p>
                      <span className="font-semibold text-foreground">
                        Cosmético:
                      </span>{" "}
                      {tx.cosmetic.name}{" "}
                      {typeof tx.cosmetic.price === "number" && (
                        <span className="text-xs">
                          ({formatAmount(tx.cosmetic.price)})
                        </span>
                      )}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    ID da transação: <span className="font-mono">{tx.id}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
