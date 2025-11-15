import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { houseSchema } from "@/lib/validations";

// GET /api/houses - Lista todas as casas
export async function GET() {
  try {
    const houses = await prisma.house.findMany({
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

    return NextResponse.json(houses);
  } catch (error) {
    console.error("Error fetching houses:", error);
    return NextResponse.json(
      { error: "Erro ao buscar casas" },
      { status: 500 },
    );
  }
}

// POST /api/houses - Cria uma nova casa
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = houseSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const house = await prisma.house.create({
      data: validation.data,
    });

    return NextResponse.json(house, { status: 201 });
  } catch (error: any) {
    console.error("Error creating house:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Já existe uma casa com esse nome" },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: "Erro ao criar casa" }, { status: 500 });
  }
}
