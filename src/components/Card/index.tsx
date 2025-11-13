import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TCosmetic } from "@/types/TCosmetics";
import { useNavigate } from "react-router-dom";

type CosmeticCardProps = {
  cosmetics: TCosmetic;
};

export function CosmeticCard({ cosmetics }: CosmeticCardProps) {
    const navigate = useNavigate();
  return (
    <Card className="hover:shadow-lg transition-shadow bg-white">
      <CardHeader className="flex flex-row gap-4">
        <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex items-center justify-center shrink-0">
          <img
            src={cosmetics.imageUrl}
            alt={cosmetics.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{cosmetics.name}</CardTitle>

            <div className="flex flex-wrap gap-1 justify-end">
              {cosmetics.isNew && (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] uppercase tracking-wide"
                >
                  Novo
                </Badge>
              )}

              {cosmetics.isOnSale && (
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] uppercase tracking-wide"
                >
                  Em oferta
                </Badge>
              )}

              {cosmetics.isPromo && (
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200 text-[10px] uppercase tracking-wide"
                >
                  Promo
                </Badge>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Tipo:{" "}
            <span className="font-medium text-foreground">
              {cosmetics.type}
            </span>{" "}
            · Raridade:{" "}
            <span className="font-medium text-foreground">
              {cosmetics.rarity}
            </span>
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Preço:</span>{" "}
          {cosmetics.price > 0 ? `R$ ${cosmetics.price}` : "Grátis"}
        </p>
        <p>
          <span className="font-semibold text-foreground">Descrição:</span>{" "}
          {cosmetics.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          variant="outline"
          className="bg-[#33cc99] text-black"
          onClick={() => navigate(`cosmetic/${cosmetics.id}`)}
        >
          Visualizar
        </Button>
      </CardFooter>
    </Card>
  );
}
