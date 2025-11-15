import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { cloneSchema } from "@/lib/validations"

type Params = {
  params: Promise<{
    id: string
  }>
}

// POST /api/houses/[id]/clones - Cria um clone para uma casa
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id: houseId } = await params
    const body = await request.json()

    const validation = cloneSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    // Verifica se a casa existe
    const house = await prisma.house.findUnique({
      where: { id: houseId }
    })

    if (!house) {
      return NextResponse.json(
        { error: "Casa não encontrada" },
        { status: 404 }
      )
    }

    const clone = await prisma.clone.create({
      data: {
        ...validation.data,
        houseId
      }
    })

    return NextResponse.json(clone, { status: 201 })
  } catch (error) {
    console.error('Error creating clone:', error)
    return NextResponse.json(
      { error: "Erro ao criar clone" },
      { status: 500 }
    )
  }
}
