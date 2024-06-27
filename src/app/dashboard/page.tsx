import { AddForm } from "./add-form";

export default async function DashboardPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="w-full px-8 md:w-[550px]">
        <AddForm />
      </div>
    </div>
  );
}
