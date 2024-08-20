import { UserTable } from "@/components/Table/UserTable";

export default async function Home() {
  return (
    <main className="container flex items-center justify-center h-dvh">
      <UserTable />
    </main>
  );
}
