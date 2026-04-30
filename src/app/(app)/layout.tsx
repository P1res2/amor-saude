import { HeaderMenu } from "@/components/HeaderMenu";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-0">
      <HeaderMenu />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
