import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Copy as CopyIcon,
  Globe,
  Building2,
} from "lucide-react";
import { NewCloneDialog } from "./new-clone-dialog";
import { CloneActions } from "./clone-actions";
import { CopyButton } from "@/components/copy-button";
import { StatusBadge } from "@/components/status-badge";
import { HouseActions } from "../house-actions";
import type { Status } from "@/lib/validations";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

async function getHouse(id: string) {
  return await prisma.house.findUnique({
    where: { id },
    include: {
      clones: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

function getFaviconUrl(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return null;
  }
}

export default async function HouseDetailPage({ params }: Params) {
  const { id } = await params;
  const house = await getHouse(id);

  if (!house) {
    notFound();
  }

  const houseFavicon = getFaviconUrl(house.url);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/houses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>

      {/* Header com informações da casa pai */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{house.name}</h1>
            <StatusBadge status={house.status as Status} />
            <HouseActions house={house} />
          </div>
          <p className="text-muted-foreground">
            Gerencie os clones desta casa de apostas
          </p>
        </div>
        <NewCloneDialog houseId={house.id} />
      </div>

      {/* Card com informações da casa oficial */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Casa Oficial
          </CardTitle>
          <CardDescription>
            Informações da casa de apostas principal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">URL Oficial</p>
              <div className="flex items-center gap-2">
                {houseFavicon && (
                  <img src={houseFavicon} alt="" className="h-4 w-4" />
                )}
                <a
                  href={house.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline font-medium"
                >
                  {house.url}
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                </a>
                <CopyButton
                  text={house.url}
                  label="URL da casa oficial copiada!"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="mt-1">
                <StatusBadge status={house.status as Status} />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Clones</p>
              <p className="text-2xl font-bold mt-1">{house.clones.length}</p>
            </div>
          </div>

          {house.notes && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Notas/Observações
              </p>
              <p className="text-sm bg-muted p-3 rounded-md">{house.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabela de clones */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Clones</h2>
        {house.clones.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-lg border border-dashed">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-primary/10 p-4">
                <CopyIcon className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Nenhum clone cadastrado
                </h3>
                <p className="text-muted-foreground mt-1">
                  Adicione o primeiro clone para esta casa de apostas
                </p>
              </div>
              <NewCloneDialog houseId={house.id} />
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
                  <TableHead>Notas</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {house.clones.map((clone) => {
                  const faviconUrl = getFaviconUrl(clone.url);
                  return (
                    <TableRow key={clone.id}>
                      <TableCell className="font-medium">
                        {clone.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {faviconUrl && (
                            <img src={faviconUrl} alt="" className="h-4 w-4" />
                          )}
                          <a
                            href={clone.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline max-w-[200px] truncate"
                          >
                            {clone.url}
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                          <CopyButton text={clone.url} label="URL copiada!" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={clone.status as Status} />
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {clone.notes || (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(clone.createdAt).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <CloneActions clone={clone} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
