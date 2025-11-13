import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

import { useAuthStore } from "@/store/useAuthStore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loginRequest } from "@/services/login/login";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);
      await loginRequest({ email, password });
      toast.success("Login realizado com sucesso!");
      navigate("/"); 
    } catch (error: any) {
      console.error("Erro de login:", error);
      const msg =
        error?.response?.data?.message ||
        "Não foi possível fazer login. Verifique suas credenciais.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen flex items-center justify-center  from-slate-900 via-slate-800 to-slate-900">
        <Card className="w-full max-w-md shadow-2xl border-slate-700 bg-slate-900/80 backdrop-blur">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-white text-center">
              Login
            </CardTitle>
            <p className="text-sm text-slate-300 text-center">
              Acesse o painel de cosméticos
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950/70 border-slate-700 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-950/70 border-slate-700 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <p className="text-xs text-slate-400 text-center mt-2">
                Não tem uma conta?{" "}
                <button
                  type="button"
                  className="text-blue-400 hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Registre-se aqui
                </button>
              </p>


              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
