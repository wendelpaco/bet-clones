import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewNoCloneDialog } from "./new-no-clone-dialog";
import { NoCloneActions } from "./no-clone-actions";
import { XCircle, ExternalLink } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Casas sem Clones",
  description:
    "Registre e gerencie casas de apostas que não possuem clones conhecidos. Mantenha URLs e informações organizadas.",
  openGraph: {
    title: "Casas sem Clones | Gerenciador de Clones",
    description:
      "Registre e gerencie casas de apostas que não possuem clones conhecidos. Mantenha URLs e informações organizadas.",
  },
};

async function getNoCloneHouses() {
  return await prisma.noCloneHouse.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function NoClonePage() {
  const noCloneHouses = await getNoCloneHouses();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Casas sem Clones
          </h1>
          <p className="text-muted-foreground mt-1">
            Registre casas de apostas que não possuem clones
          </p>
        </div>
        <NewNoCloneDialog />
      </div>

      {noCloneHouses.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-lg border border-dashed">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-orange-500/10 p-4">
              <XCircle className="h-10 w-10 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Nenhuma casa registrada</h3>
              <p className="text-muted-foreground mt-1">
                Adicione casas que não possuem clones conhecidos
              </p>
            </div>
            <NewNoCloneDialog />
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criada em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noCloneHouses.map(
                (house: {
                  id: string;
                  name: string;
                  url: string;
                  createdAt: Date;
                }) => (
                  <TableRow key={house.id}>
                    <TableCell className="font-medium">{house.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${house.url}&sz=32`}
                          alt="favicon"
                          className="w-4 h-4"
                        />
                        <a
                          href={house.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm truncate max-w-[200px]"
                        >
                          {house.url}
                        </a>
                        <CopyButton text={house.url} label="URL copiada!" />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          asChild
                        >
                          <a
                            href={house.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="warning">Sem Clones</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(house.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <NoCloneActions house={house} />
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
