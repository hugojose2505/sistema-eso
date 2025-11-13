import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TCosmetic } from "@/types/TCosmetics";

type TireCardProps = {
  cosmetics: TCosmetic;
  onView?: (cosmetics: TCosmetic) => void;
};

export function CosmeticCard({ cosmetics, onView }: TireCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-white">
      <CardHeader>
        <CardTitle>Cosmetico {cosmetics.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Tipo:</span> {cosmetics.type}
        </p>
        <p>
          <span className="font-semibold text-foreground">Raridade atual:</span>{" "}
          {cosmetics.rarity}
        </p>
        <p>
          <span className="font-semibold text-foreground">Preço:</span>{" "}
          {cosmetics.price}
        </p>
        <p>
          <span className="font-semibold text-foreground">Descrição:</span> {cosmetics.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button variant="outline" className="bg-[#33cc99] text-black" onClick={() => onView?.(cosmetics)}>
          Visualizar
        </Button>
      </CardFooter>
    </Card>
  );
}
