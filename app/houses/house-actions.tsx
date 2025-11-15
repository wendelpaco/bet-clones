"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusSelect } from "@/components/status-select";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import type { Status } from "@/lib/validations";

type House = {
  id: string;
  name: string;
  url: string;
  status: string;
  notes: string | null;
};

export function HouseActions({ house }: { house: House }) {
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(house.name);
  const [url, setUrl] = useState(house.url);
  const [status, setStatus] = useState<Status>(house.status as Status);
  const [notes, setNotes] = useState(house.notes || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/houses/${house.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url, status, notes: notes || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar casa");
      }

      toast({
        title: "Casa atualizada!",
        description: "As alterações foram salvas.",
      });

      setEditOpen(false);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);

    try {
      const response = await fetch(`/api/houses/${house.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao deletar casa");
      }

      toast({
        title: "Casa deletada!",
        description: "A casa foi removida do sistema.",
      });

      router.refresh();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setName(house.name);
            setUrl(house.url);
            setStatus(house.status as Status);
            setNotes(house.notes || "");
            setEditOpen(true);
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Editar Casa</DialogTitle>
              <DialogDescription>
                Altere as informações da casa de apostas.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome da Casa</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-url">URL da Casa Oficial</Label>
                <Input
                  id="edit-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <StatusSelect value={status} onValueChange={setStatus} />
              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notas/Observações</Label>
                <Textarea
                  id="edit-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Problemas com depósito Pix, relatos de demora no saque..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="ghost" disabled={loading}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todos os clones associados a esta
              casa também serão deletados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
