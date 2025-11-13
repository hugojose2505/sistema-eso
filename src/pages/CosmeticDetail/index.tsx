import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { ArrowLeft, Loader2, ShoppingBag, CheckCircle2 } from "lucide-react";

import { getCosmeticById } from "@/services/cosmetics/getById";
import type { TCosmetic } from "@/types/TCosmetics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CosmeticDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cosmetic, setCosmetic] = useState<TCosmetic | null>(null);
  const [loading, setLoading] = useState(false);
  async function fetchCosmetic() {
    try {
      setLoading(true);
      const data = await getCosmeticById(id || "");
      console.log(data);
      setCosmetic(data);
    } catch (error) {
      console.error("Erro ao buscar cosmético:", error);
      toast.error("Não foi possível carregar o cosmético.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;

    fetchCosmetic();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const formatPrice = (price: number) => {
    if (!price || price <= 0) return "Não informado";
    return `${price} V-Bucks`;
  };

  const formatDate = (date?: string | Date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("pt-BR");
  };

  const rarityColor: Record<string, string> = {
    common: "bg-slate-200 text-slate-800",
    uncommon: "bg-green-200 text-green-800",
    rare: "bg-sky-200 text-sky-800",
    epic: "bg-purple-200 text-purple-800",
    legendary: "bg-amber-200 text-amber-800",
  };

  const rarityClass =
    rarityColor[cosmetic?.rarity ?? ""] || "bg-slate-200 text-slate-800";

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 max-w-full mx-auto space-y-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
            <span className="text-sm">Carregando cosmético...</span>
          </div>
        ) : !cosmetic ? (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            Cosmético não encontrado.
          </div>
        ) : (
          <Card className="overflow-hidden max-w-full ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 flex items-center justify-center p-4 ml-4">
                {cosmetic.imageUrl ? (
                  <img
                    src={cosmetic.imageUrl}
                    alt={cosmetic.name}
                    className="max-h-80 object-contain rounded-lg"
                  />
                ) : (
                  <div className="h-48 w-full flex items-center justify-center text-slate-400">
                    Sem imagem
                  </div>
                )}
              </div>

              <div>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge className={rarityClass}>{cosmetic.rarity}</Badge>
                    <Badge variant="outline">{cosmetic.type}</Badge>

                    {cosmetic.isNew && <Badge variant="default">Novo</Badge>}
                    {cosmetic.isOnSale && (
                      <Badge variant="default">Em promoção</Badge>
                    )}
                    {cosmetic.isPromo && (
                      <Badge variant="outline">Destaque</Badge>
                    )}
                  </div>

                  <CardTitle className="text-2xl">{cosmetic.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    ID externo:{" "}
                    <span className="font-mono">{cosmetic.externalId}</span>
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {cosmetic.description && (
                    <p className="text-sm text-muted-foreground">
                      {cosmetic.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Preço atual</p>
                      <p className="font-semibold">
                        {formatPrice(cosmetic.price)}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        Data de lançamento
                      </p>
                      <p className="font-semibold">
                        {formatDate(cosmetic.releaseDate)}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-muted-foreground">Último sync</p>
                      <p className="font-semibold">
                        {formatDate(cosmetic.lastSyncAt as any)}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        Você possui este item?
                      </p>
                      <p className="font-semibold flex items-center gap-1">
                        {cosmetic.isOwned ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Sim
                          </>
                        ) : (
                          <>Não</>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3">
                    {cosmetic.isOwned ? (
                      <Button disabled className="gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Já adquirido
                      </Button>
                    ) : (
                      <Button className="gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Adquirir
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
