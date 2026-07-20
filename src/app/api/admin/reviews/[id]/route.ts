import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma";
import { isStaff } from "@/lib/role";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !isStaff(session.user.role)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await prisma.review.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}