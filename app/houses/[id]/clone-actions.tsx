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

type Clone = {
  id: string;
  name: string;
  url: string;
  status: string;
  notes: string | null;
};

export function CloneActions({ clone }: { clone: Clone }) {
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(clone.name);
  const [url, setUrl] = useState(clone.url);
  const [status, setStatus] = useState<Status>(clone.status as Status);
  const [notes, setNotes] = useState(clone.notes || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/clones/${clone.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url, status, notes: notes || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar clone");
      }

      toast({
        title: "Clone atualizado!",
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
      const response = await fetch(`/api/clones/${clone.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao deletar clone");
      }

      toast({
        title: "Clone deletado!",
        description: "O clone foi removido do sistema.",
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
            setName(clone.name);
            setUrl(clone.url);
            setStatus(clone.status as Status);
            setNotes(clone.notes || "");
            setEditOpen(true);
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Editar Clone</DialogTitle>
              <DialogDescription>
                Altere as informações do clone.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome do Clone</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-url">URL</Label>
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
                  placeholder="Ex: Problemas reportados, restrições, etc..."
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
              Esta ação não pode ser desfeita. O clone será permanentemente
              deletado.
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
