import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import UserForm from "@/components/admin/UserForm"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Next.js 15: await params
  const { id } = await params
  
  const user = await prisma.user.findFirst({
    where: { id },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="p-6">
      <UserForm user={user} />
    </div>
  )
}