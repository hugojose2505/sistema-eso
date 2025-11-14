import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Loader2,  Coins } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import type { TPublicUser } from "@/types/TUsers";
import { getPublicUsers } from "@/services/users";

export default function PublicUsersPage() {
  const [users, setUsers] = useState<TPublicUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  async function fetchUsers(p = page) {
    try {
      setLoading(true);
      const res = await getPublicUsers({ page: p, limit: 12 });

      setUsers(res.data);
      setPage(res.page);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Erro ao buscar usuários públicos:", error);
      toast.error("Não foi possível carregar a lista de usuários.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchUsers(page)}
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
            <span className="text-sm">Carregando usuários...</span>
          </div>
        ) : users.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-muted-foreground">
              <p>Nenhum usuário encontrado.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <Card
                  key={user.id}
                  className="bg-white hover:shadow-md transition-shadow"
                >
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-semibold">
                      {getInitials(user.name)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base line-clamp-2">
                          {user.name}
                        </CardTitle>

                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase tracking-wide"
                        >
                          Usuário
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span className="font-semibold text-foreground">
                        {user.vbucksBalance}
                      </span>{" "}
                      V-Bucks
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        Cadastrado em:
                      </span>{" "}
                      {formatDate(user.createdAt)}
                    </p>
                  </CardContent>
                </Card>
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
