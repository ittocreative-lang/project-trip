import CountryForm from "@/components/admin/countries/CountryForm";

export default async function NewCountryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          New Country
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new country.
        </p>
      </div>

      <CountryForm />
    </div>
  );
}