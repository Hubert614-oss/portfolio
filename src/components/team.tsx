import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Person = {
  id: number;
  name: string;
  role: string;
  skills: string;
  xp: string;
  avatar: string;
};

function TeamCard({
  person,
}: {
  person: Person;
  onRecruit: (p: Person) => void;
}): ReactElement {
  return (
    <div className="card">
      <div className="avatar-ring mb-4">
        <img src={person.avatar} alt={person.name} />
      </div>
      <p className="text-[#7C3AED] text-xs underline mb-1">{person.xp}</p>
      <h3 className="font-extrabold text-[#2D1470] text-base leading-tight mb-3">
        {person.name}
      </h3>
      <div className="flex flex-col gap-1 mb-4 w-full">
        <p className="text-gray-700 text-sm font-semibold">{person.role}</p>
        <p className="text-gray-400 text-xs">{person.skills}</p>
      </div>
    </div>
  );
}

export default function Team() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // pagination
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/teams.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Person[]) => {
        if (cancelled) return;
        setPeople(data);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Failed to load");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleRecruit(p: Person) {
    setSelected(p);
    setModalOpen(true);
  }

  const totalPages = Math.max(1, Math.ceil(people.length / PAGE_SIZE));
  const paged = people.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-linear-to-b from-white via-lavender/15 to-white">
      <section id="team" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D1470] text-center leading-tight mb-12">
          Nos talents qui vont transformer
          <br />
          vos concepts en solutions
        </h2>

        <div className="flex flex-col gap-6">
          {loading ? (
            <div className="text-center text-gray-500">Chargement...</div>
          ) : error ? (
            <div className="text-center text-red-500">Erreur: {error}</div>
          ) : (
            <>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={page}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    transition: { duration: 0.25, ease: "easeIn" },
                  }}
                  className="flex flex-col sm:flex-row gap-5 items-stretch justify-center"
                >
                  {paged.map((p) => (
                    <TeamCard key={p.id} person={p} onRecruit={handleRecruit} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination controls */}
              <div className="mt-8 flex items-center justify-center gap-2">
                {/* Précédent */}
                <button
                  onClick={() => setPage((old) => Math.max(1, old - 1))}
                  disabled={page === 1}
                  className={`
      group relative flex items-center gap-1.5 px-4 py-2 rounded-xl
      text-sm font-medium
      border border-white/20 dark:border-white/10
      backdrop-blur-xl
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:ring-offset-2 focus:ring-offset-transparent
      ${page === 1
                      ? "bg-white/5 text-gray-400 cursor-not-allowed"
                      : "bg-white/10 dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-white/10 hover:-translate-x-0.5 hover:shadow-[0_4px_20px_rgba(124,58,237,0.1)] active:scale-95"
                    }
    `}
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Numéros de page */}
                {Array.from({ length: totalPages }).map((_, i) => {
                  const isActive = page === i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`
          relative flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:ring-offset-2 focus:ring-offset-transparent
          ${isActive
                          ? "bg-purple-500/20 dark:bg-purple-500/30 text-purple-700 dark:text-purple-300 border border-purple-400/30 shadow-[0_0_20px_rgba(124,58,237,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] scale-110"
                          : "bg-white/10 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-white/20 dark:border-white/10 backdrop-blur-xl hover:bg-white/20 dark:hover:bg-white/10 hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-[0_4px_20px_rgba(124,58,237,0.1)] hover:scale-105 active:scale-95"
                        }
        `}
                    >
                      {/* Reflet liquide */}
                      {isActive && (
                        <>
                          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-purple-300/50 to-transparent rounded-t-xl" />
                          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-purple-400/20" />
                        </>
                      )}
                      <span className="relative z-10">{i + 1}</span>
                    </button>
                  );
                })}

                {/* Suivant */}
                <button
                  onClick={() => setPage((old) => Math.min(totalPages, old + 1))}
                  disabled={page === totalPages}
                  className={`
      group relative flex items-center gap-1.5 px-4 py-2
      text-sm font-medium
      backdrop-blur-xl
      transition-all duration-300 ease-out
      ${page === totalPages
                      ? "bg-white/5 text-gray-400 cursor-not-allowed"
                      : "bg-white/10 dark:bg-white/5 text-gray-700 dark:text-gray-200"
                    }
    `}
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>

        {modalOpen && selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold mb-2">Recruter {selected.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Role: {selected.role}</p>
              <div className="flex gap-3">
                <button
                  className="btn-recruter"
                  onClick={() => {
                    alert(`Demande envoyée pour ${selected.name}`);
                    setModalOpen(false);
                  }}
                >
                  Envoyer
                </button>
                <button
                  className="p-2 rounded-full border"
                  onClick={() => setModalOpen(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}