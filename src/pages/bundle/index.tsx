import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Plus, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import type { TBundle } from "@/types/TBundle";
import type { TCosmetic } from "@/types/TCosmetics";
import { useNavigate } from "react-router-dom";
import { getAllBundles } from "@/services/bundle/getAll";
import { getAllCosmetics } from "@/services/cosmetics/getAll";
import { createBundle } from "@/services/bundle/create";

export default function BundlesPage() {
  const [bundles, setBundles] = useState<TBundle[]>([]);
  const [loadingBundles, setLoadingBundles] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [cosmeticsOptions, setCosmeticsOptions] = useState<TCosmetic[]>([]);
  const [loadingCosmetics, setLoadingCosmetics] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [selectedCosmeticsIds, setSelectedCosmeticsIds] = useState<string[]>([]);

  const navigate = useNavigate();

  const totalSelectedPrice = useMemo(() => {
    return selectedCosmeticsIds.reduce((sum, id) => {
      const c = cosmeticsOptions.find((cos) => cos.id === id);
      return sum + (c?.price ?? 0);
    }, 0);
  }, [selectedCosmeticsIds, cosmeticsOptions]);

  const loadBundles = async () => {
    try {
      setLoadingBundles(true);
      const data = await getAllBundles();
      setBundles(data);
    } catch (error) {
      console.error("Erro ao carregar bundles:", error);
      toast.error("Não foi possível carregar os bundles.");
    } finally {
      setLoadingBundles(false);
    }
  };

  const loadCosmetics = async () => {
    try {
      setLoadingCosmetics(true);
      const data = await getAllCosmetics({ limit: 1000 });
      setCosmeticsOptions(data.data);
    } catch (error) {
      console.error("Erro ao carregar cosméticos:", error);
      toast.error("Não foi possível carregar os cosméticos.");
    } finally {
      setLoadingCosmetics(false);
    }
  };

  useEffect(() => {
    loadBundles();
  }, []);

  const handleOpenCreate = (open: boolean) => {
    setCreateOpen(open);
    if (open) {
      setName("");
      setDescription("");
      setPrice("");
      setSelectedCosmeticsIds([]);
      if (cosmeticsOptions.length === 0) {
        loadCosmetics();
      }
    }
  };

  const toggleCosmeticSelection = (id: string, checked: boolean) => {
    setSelectedCosmeticsIds((prev) =>
      checked ? [...prev, id] : prev.filter((cId) => cId !== id)
    );
  };

  const handleCreateBundle = async () => {
    if (!name.trim()) {
      toast.error("Informe o nome do bundle.");
      return;
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      toast.error("Preço inválido.");
      return;
    }

    if (selectedCosmeticsIds.length === 0) {
      toast.error("Selecione ao menos um cosmético.");
      return;
    }

    try {
      setSaving(true);
      const bundle = await createBundle({
        name: name.trim(),
        description: description.trim() || undefined,
        price: numericPrice,
        cosmeticIds: selectedCosmeticsIds,
      });

      toast.success("Bundle criado com sucesso!");
      setBundles((prev) => [bundle, ...prev]);
      setCreateOpen(false);
    } catch (error) {
      console.error("Erro ao criar bundle:", error);
      toast.error("Não foi possível criar o bundle.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="space-y-4">
        <div className="flex items-center justify-end">

          <Dialog open={createOpen} onOpenChange={handleOpenCreate}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Criar bundle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar novo bundle</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bundle-name">Nome</Label>
                  <Input
                    id="bundle-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Pacotão de skins raras"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bundle-description">Descrição</Label>
                  <Input
                    id="bundle-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Uma breve descrição do bundle"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="bundle-price">Preço do bundle (V-Bucks)</Label>
                  <Input
                    id="bundle-price"
                    type="number"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: 2000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Total dos itens selecionados:{" "}
                    <span className="font-semibold">
                      {totalSelectedPrice} V-Bucks
                    </span>
                  </p>
                  {price && !isNaN(Number(price)) && (
                    <p className="text-xs text-muted-foreground">
                      Desconto do bundle:{" "}
                      <span className="font-semibold">
                        {totalSelectedPrice - Number(price)} V-Bucks
                      </span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Cosméticos do bundle</Label>
                  {loadingCosmetics ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Carregando cosméticos...
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-auto border rounded-md p-2 space-y-2 bg-slate-50">
                      {cosmeticsOptions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Nenhum cosmético disponível.
                        </p>
                      ) : (
                        cosmeticsOptions.map((c) => (
                          <label
                            key={c.id}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedCosmeticsIds.includes(c.id)}
                              onCheckedChange={(checked) =>
                                toggleCosmeticSelection(c.id, !!checked)
                              }
                            />
                            {c.imageUrl && (
                              <img
                                src={c.imageUrl}
                                alt={c.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {c.type} · {c.rarity} · {c.price} V-Bucks
                            </span>
                          </label>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => handleOpenCreate(false)}
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateBundle} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Salvando...
                    </>
                  ) : (
                    "Criar bundle"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loadingBundles ? (
          <div className="flex flex-col items-center justify-center h-[40vh] text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
            <span className="text-sm">Carregando bundles...</span>
          </div>
        ) : bundles.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-muted-foreground">
              <p>Nenhum bundle cadastrado ainda.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bundles.map((bundle) => {
              const itemsTotal = bundle.cosmetics.reduce(
                (sum, c) => sum + (c.price ?? 0),
                0
              );
              const discount = itemsTotal - bundle.price;

              return (
                <Card key={bundle.id} className="bg-white hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base line-clamp-2">
                        {bundle.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {bundle.cosmetics.length} itens
                      </Badge>
                    </div>
                    {bundle.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {bundle.description}
                      </p>
                    )}
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
                  </CardContent>

                  <CardFooter className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#33cc99] text-black"
                      onClick={() => navigate(`/bundles/${bundle.id}`)}
                    >
                      Visualizar
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
