import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TBundle } from "@/types/TBundle";
import { useAuthStore } from "@/store/useAuthStore";
import { getBundleById } from "@/services/bundle/getById";
import { purchaseBundle } from "@/services/bundle/purcharse";

export default function BundleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [bundle, setBundle] = useState<TBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);

  const itemsTotal = useMemo(() => {
    if (!bundle) return 0;
    return bundle.cosmetics.reduce((sum, c) => sum + (c.price ?? 0), 0);
  }, [bundle]);

  const discount = useMemo(() => {
    if (!bundle) return 0;
    return itemsTotal - bundle.price;
  }, [bundle, itemsTotal]);

  const loadBundle = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await getBundleById(id);
      setBundle(data);
    } catch (error) {
      console.error("Erro ao carregar bundle:", error);
      toast.error("Não foi possível carregar o bundle.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBundle();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBuyBundle = async () => {
    if (!bundle || !id) return;

    if (!user) {
      toast.error("Você precisa estar logado para comprar um bundle.");
      navigate("/login");
      return;
    }

    try {
      setBuying(true);
      const res = await purchaseBundle(id);
      toast.success(res.message || "Bundle comprado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao comprar bundle:", error);
      const msg =
        error?.response?.data?.message ??
        "Não foi possível comprar o bundle.";
      toast.error(msg);
    } finally {
      setBuying(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-4 space-y-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[40vh] text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
            <span className="text-sm">Carregando bundle...</span>
          </div>
        ) : !bundle ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              Bundle não encontrado.
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-4">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-2xl mb-1">
                      {bundle.name}
                    </CardTitle>
                    {bundle.description && (
                      <p className="text-sm text-muted-foreground">
                        {bundle.description}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {bundle.cosmetics.length} itens
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">
                    Preço do bundle:
                  </span>{" "}
                  {bundle.price} V-Bucks
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Soma dos itens:
                  </span>{" "}
                  {itemsTotal} V-Bucks
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Desconto:
                  </span>{" "}
                  {discount} V-Bucks
                </p>

                <div className="pt-2">
                  <Button
                    className="gap-2"
                    onClick={handleBuyBundle}
                    disabled={buying}
                  >
                    {buying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Comprando...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Comprar bundle
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Cosméticos incluídos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bundle.cosmetics.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhum cosmético associado a este bundle.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bundle.cosmetics.map((c) => (
                      <div
                        key={c.id}
                        className="flex gap-3 items-center border rounded-md p-2 bg-white"
                      >
                        {c.imageUrl && (
                          <img
                            src={c.imageUrl}
                            alt={c.name}
                            className="w-14 h-14 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">
                            {c.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {c.type} · {c.rarity}
                          </p>
                          <p className="text-xs text-foreground mt-1">
                            {c.price} V-Bucks
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
