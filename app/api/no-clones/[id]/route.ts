import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

type Params = {
  params: Promise<{
    id: string
  }>
}

// DELETE /api/no-clones/[id] - Deleta uma casa sem clones
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    await prisma.noCloneHouse.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting no-clone house:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Casa sem clones não encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: "Erro ao deletar casa sem clones" },
      { status: 500 }
    )
  }
}
