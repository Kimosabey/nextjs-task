import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useConfirmTabClose } from '../components/hooks/UseConfirmTabClose';
import { useWarnIfUnsavedChanges } from '../components/hooks/UseWarnIfUnsavedChanges';

function Home() {
  const [name, setName] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(undefined);

  
  useConfirmTabClose(hasUnsavedChanges);
  useWarnIfUnsavedChanges(hasUnsavedChanges, () => {
    return confirm('You have unsaved changes. want to Navigate?');
  });

  const handleChange = (event) => {
    setName(event.target.value);
    setHasUnsavedChanges(true);
  };

  const router = useRouter();

  const checkNav = () => {
    console.log('incheckNav', hasUnsavedChanges);
    console.log(router.pathname);

    if (hasUnsavedChanges == true) {
      alert('You have unsaved changes. want to Navigate?');
      return false;
    } else {
      router.push('/about');
    }
  };

  return (
    <>
      <nav
        style={{
          backgroundImage: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
          margin: '20px',
          height: '50px',
        }}
      >
        <ul>
          <li style={{ display: 'inline', margin: '20px' }}>
            <Link href='/'>Home Page</Link>
          </li>
          <li style={{ display: 'inline' }}>
            <Link href='/about'>About Page</Link>

            {/* make button as link not optimal */}
            {/* <button onClick={() => checkNav()}>About Us</button> */}
          </li>
        </ul>
      </nav>

      <div style={{ marginLeft: '20px' }}>
        <form>
          <label htmlFor='name'>Enter Some Text : </label>
          <input type='text' id='name' value={name} onChange={handleChange} />
          <button type='button' onClick={() => setHasUnsavedChanges(false)}>
            Save changes
          </button>
        </form>
        {typeof hasUnsavedChanges !== 'undefined' && (
          <div>
            You have{' '}
            <strong
              style={{
                color: hasUnsavedChanges ? 'firebrick' : 'forestgreen',
              }}
            >
              {hasUnsavedChanges ? 'not saved' : 'saved'}
            </strong>{' '}
            your changes.
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
