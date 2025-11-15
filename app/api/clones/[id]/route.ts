import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { cloneSchema } from "@/lib/validations"

type Params = {
  params: Promise<{
    id: string
  }>
}

// PUT /api/clones/[id] - Atualiza um clone
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()

    const validation = cloneSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const clone = await prisma.clone.update({
      where: { id },
      data: validation.data
    })

    return NextResponse.json(clone)
  } catch (error: any) {
    console.error('Error updating clone:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Clone não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: "Erro ao atualizar clone" },
      { status: 500 }
    )
  }
}

// DELETE /api/clones/[id] - Deleta um clone
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    await prisma.clone.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting clone:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Clone não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: "Erro ao deletar clone" },
      { status: 500 }
    )
  }
}
