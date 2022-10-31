import Link from 'next/link';

function about() {
  return (
    <h1>
      Second Page{' '}
      <span>
        <Link href='/'>Want to go home?</Link>
      </span>
    </h1>
  );
}

export default about;
