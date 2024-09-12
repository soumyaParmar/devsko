'use client'
 
import { useRouter } from 'next/navigation'

export default function Home() {
  
  const router = useRouter()

  return (
    <main className='flex justify-center items-center h-full'>
      <button className='bg-black text-white p-8 rounded-2xl' type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
    </main>
  );
}
