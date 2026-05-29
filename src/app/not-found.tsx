import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="text-8xl font-serif font-bold text-[#DEDBD4] dark:text-[#2a2a3e] mb-4">
        404
      </div>
      <h1 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white mb-3">
        Page introuvable
      </h1>
      <p className="text-[#7A7A7A] mb-8 max-w-md">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="bg-[#C01D35] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#A01728] transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
