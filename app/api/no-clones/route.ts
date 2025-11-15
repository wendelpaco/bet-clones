import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { noCloneHouseSchema } from "@/lib/validations"

// GET /api/no-clones - Lista todas as casas sem clones
export async function GET() {
  try {
    const noCloneHouses = await prisma.noCloneHouse.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(noCloneHouses)
  } catch (error) {
    console.error('Error fetching no-clone houses:', error)
    return NextResponse.json(
      { error: "Erro ao buscar casas sem clones" },
      { status: 500 }
    )
  }
}

// POST /api/no-clones - Cria uma nova casa sem clones
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = noCloneHouseSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const noCloneHouse = await prisma.noCloneHouse.create({
      data: validation.data
    })

    return NextResponse.json(noCloneHouse, { status: 201 })
  } catch (error: any) {
    console.error('Error creating no-clone house:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Já existe uma casa sem clones com esse nome" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: "Erro ao criar casa sem clones" },
      { status: 500 }
    )
  }
}
