import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Login() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <>
    {providers &&
      Object.values(providers).map((provider) => (
        <button
          className="ml-4 px-4 py-2 font-semibold text-sm bg-a-black text-a-yellow rounded-md shadow-sm"
          type='button'
          key={provider.name}
          onClick={() => {
            signIn(provider.id);
          }}
        >
          Sign In with Google!
        </button>))}
    </>
  );
}