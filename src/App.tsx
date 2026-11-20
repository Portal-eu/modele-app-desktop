import { Layout } from "./components/Layout";
import { useAppInfo } from "./hooks/useAppInfo";
import { useCompteurStore } from "./stores/compteurStore";

export default function App() {
  const info = useAppInfo();
  const { valeur, incrementer } = useCompteurStore();

  return (
    <Layout>
      <section className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-semibold">Modèle app desktop</h1>
        <p className="text-slate-400">
          {info ? `${info.nom} ${info.version}` : "Chargement…"}
        </p>
        <button
          type="button"
          onClick={incrementer}
          className="rounded-lg bg-portal px-4 py-2 font-medium text-white hover:bg-portal-dark"
        >
          Compteur : {valeur}
        </button>
      </section>
    </Layout>
  );
}
