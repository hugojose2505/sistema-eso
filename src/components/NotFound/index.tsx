import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/icone.png";

export default function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#4c4c4c]">
      <Card className="w-full max-w-lg bg-slate-900/80 border-slate-700 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex flex-col items-center gap-2">
            <img src={logo} alt="Logo" className="h-12 w-12" />

            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              erro
            </p>
            <CardTitle className="text-4xl font-bold text-white">
              404 - Página não encontrada
            </CardTitle>
            <p className="text-sm text-slate-300">
              Parece que esse cosmético não existe… ou você digitou o endereço
              errado. 🤏
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
          <Button asChild className="w-full sm:w-auto  bg-[#33cc99] text-slate-950 font-semibold hover:bg-[#29a67a] hover:text-white transition-colors">
            <Link to="/">Voltar para a página inicial</Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto border-slate-600  bg-[#33cc99] text-slate-950 font-semibold hover:bg-[#29a67a] hover:text-white transition-colors"
          >
            <Link to="/login">Ir para login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
