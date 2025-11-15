import { prisma } from "@/lib/db";
import { NewHouseDialog } from "./new-house-dialog";
import { HousesList } from "./houses-list";
import { Building2 } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Casas de Apostas",
  description:
    "Gerencie todas as suas casas de apostas em um só lugar. Adicione, edite e monitore o status de cada casa e seus clones.",
  openGraph: {
    title: "Casas de Apostas | Gerenciador de Clones",
    description:
      "Gerencie todas as suas casas de apostas em um só lugar. Adicione, edite e monitore o status de cada casa e seus clones.",
  },
};

async function getHouses() {
  return await prisma.house.findMany({
    select: {
      id: true,
      name: true,
      url: true,
      status: true,
      notes: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { clones: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function HousesPage() {
  const houses = await getHouses();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Casas de Apostas
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas casas de apostas e seus clones
          </p>
        </div>
        <NewHouseDialog />
      </div>

      {houses.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-lg border border-dashed">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Nenhuma casa cadastrada</h3>
              <p className="text-muted-foreground mt-1">
                Comece adicionando sua primeira casa de apostas
              </p>
            </div>
            <NewHouseDialog />
          </div>
        </div>
      ) : (
        <HousesList houses={houses} />
      )}
    </div>
  );
}
