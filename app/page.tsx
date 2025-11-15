import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { Building2, Copy, XCircle, TrendingUp, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Visualize estatísticas e gerencie todas as suas casas de apostas e clones em um só lugar. Dashboard completo com métricas e ações rápidas.",
  openGraph: {
    title: "Dashboard | Gerenciador de Clones",
    description:
      "Visualize estatísticas e gerencie todas as suas casas de apostas e clones em um só lugar. Dashboard completo com métricas e ações rápidas.",
  },
};

async function getDashboardStats() {
  const [houses, clones, noCloneHouses] = await Promise.all([
    prisma.house.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        status: true,
        notes: true,
        createdAt: true,
        _count: {
          select: { clones: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
    prisma.clone.count(),
    prisma.noCloneHouse.count(),
  ]);

  const totalHouses = houses.length;
  const topHouses = houses.slice(0, 5);

  return {
    totalHouses: await prisma.house.count(),
    totalClones: clones,
    totalNoCloneHouses: noCloneHouses,
    recentHouses: topHouses,
  };
}

export default async function Home() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo ao Gerenciador de Clones de Apostas
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Casas
            </CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalHouses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Casas de apostas cadastradas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Clones
            </CardTitle>
            <Copy className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalClones}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Clones registrados no sistema
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sem Clones</CardTitle>
            <XCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalNoCloneHouses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Casas sem clones registrados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Houses */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Casas Recentes
            </CardTitle>
            <CardDescription>
              Últimas casas adicionadas ao sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentHouses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Building2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma casa cadastrada ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentHouses.map(
                  (house: {
                    id: string;
                    name: string;
                    _count: { clones: number };
                  }) => (
                    <Link
                      key={house.id}
                      href={`/houses/${house.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{house.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {house._count.clones} clone(s)
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ),
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Comece a gerenciar suas casas e clones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/houses">
              <Button className="w-full justify-start" size="lg">
                <Building2 className="mr-2 h-5 w-5" />
                Gerenciar Casas de Apostas
              </Button>
            </Link>
            <Link href="/no-clones">
              <Button
                className="w-full justify-start"
                variant="outline"
                size="lg"
              >
                <XCircle className="mr-2 h-5 w-5" />
                Casas sem Clones
              </Button>
            </Link>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Estatísticas</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Média de clones por casa
                  </span>
                  <Badge variant="secondary">
                    {stats.totalHouses > 0
                      ? (stats.totalClones / stats.totalHouses).toFixed(1)
                      : "0"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Total de registros
                  </span>
                  <Badge variant="secondary">
                    {stats.totalHouses + stats.totalNoCloneHouses}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
