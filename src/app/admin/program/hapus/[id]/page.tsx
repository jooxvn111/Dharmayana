"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HapusProgram({ params }: any) {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    async function doDelete() {
      await fetch(`/api/program/${id}`, { method: "DELETE" });
      router.push("/admin/program");
    }
    doDelete();
  }, [id, router]);

  return <p>Menghapus...</p>;
}
