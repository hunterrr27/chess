import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='p-12' style={{ textAlign: 'center', padding: '20px' }}>
      
      <p className='p-12' >click button to start</p>
      <Link href="/chess">
        <button className='bg-red-500 rounded-full p-12' style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          automatic L
        </button>
      </Link>
    </div>
  );
}
