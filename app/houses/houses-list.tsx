"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { SearchFilter } from "./search-filter";
import { HouseActions } from "./house-actions";
import { StatusBadge } from "@/components/status-badge";
import type { Status } from "@/lib/validations";

type House = {
  id: string;
  name: string;
  url: string;
  status: string;
  notes: string | null;
  createdAt: Date;
  _count: {
    clones: number;
  };
};

export function HousesList({ houses }: { houses: House[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getClonesBadgeVariant = (count: number) => {
    if (count === 0) return "outline";
    if (count <= 2) return "secondary";
    if (count <= 5) return "info";
    return "success";
  };

  return (
    <div className="space-y-4">
      <SearchFilter onSearch={setSearchQuery} />

      {filteredHouses.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border">
          <p className="text-muted-foreground">
            {searchQuery
              ? "Nenhuma casa encontrada com esse nome"
              : "Nenhuma casa cadastrada ainda"}
          </p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clones</TableHead>
                <TableHead>Criada em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHouses.map((house) => (
                <TableRow key={house.id} className="group">
                  <TableCell className="font-medium">{house.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={house.status as Status} />
                  </TableCell>
                  <TableCell>
                    <Badge variant={getClonesBadgeVariant(house._count.clones)}>
                      {house._count.clones} clone(s)
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(house.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/houses/${house.id}`}>
                        <Button size="sm" variant="outline">
                          Ver Clones
                        </Button>
                      </Link>
                      <HouseActions house={house} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {searchQuery && filteredHouses.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredHouses.length} de {houses.length} casa(s)
        </p>
      )}
    </div>
  );
}
