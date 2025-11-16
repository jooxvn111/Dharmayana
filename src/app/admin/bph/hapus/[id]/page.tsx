"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HapusBPH({ params }: any) {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    async function doDelete() {
      await fetch(`/api/bph/${id}`, { method: "DELETE" });
      router.push("/admin/bph");
    }
    doDelete();
  }, [id, router]);

  return <p>Menghapus...</p>;
}