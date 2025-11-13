import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CosmeticCard } from "@/components/Card";
import type { TCosmetic } from "@/types/TCosmetics";
import { getAllCosmetics } from "@/services/cosmetics/getAll";
const cosmeticTypes = ["wrap", "outfit", "pickaxe", "backpack", "emote"];
const cosmeticRarities = ["common", "uncommon", "rare", "epic", "legendary"];

type FiltersState = {
  search: string;
  type: string;
  rarity: string;
  startDate: string;
  endDate: string;
  onlyNew: boolean;
  onlyOnSale: boolean;
  onlyPromo: boolean;
};

export default function ListCosmeticsPage() {
  const [cosmetics, setCosmetics] = useState<TCosmetic[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    type: "",
    rarity: "",
    startDate: "",
    endDate: "",
    onlyNew: false,
    onlyOnSale: false,
    onlyPromo: false,
  });

  async function fetchCosmetics(p = page) {
    try {
      setLoading(true);

      const response = await getAllCosmetics({
        search: filters.search || undefined,
        type: filters.type || undefined,
        rarity: filters.rarity || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        onlyNew: filters.onlyNew ? true : undefined,
        onlyOnSale: filters.onlyOnSale ? true : undefined,
        onlyPromo: filters.onlyPromo ? true : undefined,
        page: p,
        limit: 20,
      });

      setCosmetics(response.data);
      setPage(response.page);
      setIsLastPage(response.page >= response.totalPages);
    } catch (error) {
      console.error("Erro ao buscar cosméticos:", error);
      toast.error("Falha ao buscar cosméticos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCosmetics(page);

  }, [filters, page]);

  function handleFilterChange<K extends keyof FiltersState>(
    field: K,
    value: FiltersState[K]
  ) {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters({
      search: "",
      type: "",
      rarity: "",
      startDate: "",
      endDate: "",
      onlyNew: false,
      onlyOnSale: false,
      onlyPromo: false,
    });
    setPage(1);
  }

  const isFirstPage = page <= 1;



  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <Input
            placeholder="Buscar por nome ou descrição..."
            value={filters.search}
            className="bg-white"
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />

          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              {cosmeticTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.rarity}
            onValueChange={(value) => handleFilterChange("rarity", value)}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Raridade" />
            </SelectTrigger>
            <SelectContent>
              {cosmeticRarities.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            className="bg-white"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />

          <Input
            type="date"
            className="bg-white"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />

          <Button variant="outline" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            type="button"
            variant={filters.onlyNew ? "default" : "outline"}
            onClick={() => handleFilterChange("onlyNew", !filters.onlyNew)}
          >
            {filters.onlyNew ? "Apenas novos ✓" : "Apenas novos"}
          </Button>

          <Button
            type="button"
            variant={filters.onlyOnSale ? "default" : "outline"}
            onClick={() =>
              handleFilterChange("onlyOnSale", !filters.onlyOnSale)
            }
          >
            {filters.onlyOnSale ? "Em promoção ✓" : "Em promoção"}
          </Button>

          <Button
            type="button"
            variant={filters.onlyPromo ? "default" : "outline"}
            onClick={() => handleFilterChange("onlyPromo", !filters.onlyPromo)}
          >
            {filters.onlyPromo ? "Itens promocionais ✓" : "Itens promocionais"}
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
            <span className="text-sm">Carregando cosméticos...</span>
          </div>
        ) : cosmetics?.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            Nenhum cosmético encontrado.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cosmetics?.map((cosmetic) => (
                <CosmeticCard key={cosmetic.id} cosmetics={cosmetic} />
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      aria-disabled={isFirstPage}
                      className={
                        isFirstPage ? "pointer-events-none opacity-50" : ""
                      }
                      tabIndex={isFirstPage ? -1 : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isFirstPage) setPage((p) => p - 1);
                      }}


                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      aria-disabled={isLastPage}
                      className={
                        isLastPage ? "pointer-events-none opacity-50" : ""
                      }
                        tabIndex={isLastPage ? -1 : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isLastPage) setPage((p) => p + 1);
                        }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </>
  );
}
