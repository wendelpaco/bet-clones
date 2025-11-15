import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { houseSchema } from "@/lib/validations";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/houses/[id] - Busca uma casa específica com seus clones
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const house = await prisma.house.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        url: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
        clones: {
          select: {
            id: true,
            name: true,
            url: true,
            status: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
            houseId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!house) {
      return NextResponse.json(
        { error: "Casa não encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json(house);
  } catch (error) {
    console.error("Error fetching house:", error);
    return NextResponse.json({ error: "Erro ao buscar casa" }, { status: 500 });
  }
}

// PUT /api/houses/[id] - Atualiza uma casa
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = houseSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const house = await prisma.house.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json(house);
  } catch (error: any) {
    console.error("Error updating house:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Casa não encontrada" },
        { status: 404 },
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Já existe uma casa com esse nome" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Erro ao atualizar casa" },
      { status: 500 },
    );
  }
}

// DELETE /api/houses/[id] - Deleta uma casa
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.house.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting house:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Casa não encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Erro ao deletar casa" },
      { status: 500 },
    );
  }
}
