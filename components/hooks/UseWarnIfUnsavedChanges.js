// (2) TODO : Prevent Unsaved Data when Navigate Away!

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useWarnIfUnsavedChanges = (isUnsafeTabClose, callback) => {
  const router = useRouter();
  useEffect(() => {
    if (isUnsafeTabClose) {
      const routeChangeStart = () => {
        const ok = callback();
        if (!ok) {
          router.events.emit('routeChangeError');
          throw 'Abort route change. Please ignore this error.';
        }
      };
      router.events.on('routeChangeStart', routeChangeStart);

      return () => {
        router.events.off('routeChangeStart', routeChangeStart);
      };
    }
  }, [isUnsafeTabClose]);
};
