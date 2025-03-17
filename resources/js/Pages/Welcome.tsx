import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Header from "./Home/Header";
import MotorcycleSearch from "./Home/MotorcycleSearch";

export default function Welcome({
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  const { flash } = usePage().props as unknown as { flash: { error?: string } }; // Obtener los mensajes flash desde el backend

  return (
    <>


      <Header />

      <MotorcycleSearch />


    </>
  );
}