import DogsFilters from "./components/sections/DogsFilters";
import DogsTable from "./components/sections/DogsTable";

export default function App() {
  return (
    <main className="h-screen ">
      <DogsFilters />
      <DogsTable />
    </main>
  );
}
