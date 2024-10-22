"use client";

// import useAuthentication from "@/hooks/useAuthentication";
// import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";


export default function Home() {
  // const { handleGoogleSignIn, isAuthenticating } = useAuthentication();
  const router =  useRouter();


  // if (isAuthenticating) {
  //   return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>
  // }

  return (
    <main className="flex justify-center items-center h-full w-full">
      <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-4">Welcome to Devsko</h1>
          <p className="text-gray-600 text-center mb-6">Login with your favorite provider to get started!</p>
          {(
            <div>
              <button
                onClick={() => router.push('/useronboarding/1')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
              >
                Login with Google
              </button>
              <button
                onClick={() => router.push('/useronboarding/1')}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full"
              >
                Login with GitHub
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
