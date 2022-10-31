// (1) TODO : Prevent Unsaved Data when Tab Closed

import { useEffect } from 'react';
import { useRouter } from 'next/router';


const confirmationMessage = 'You have unsaved changes. want to Continue?';
export const useConfirmTabClose = (isUnsafeTabClose) => {
  console.log('isUnsafeTabClose :', isUnsafeTabClose);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isUnsafeTabClose) {
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isUnsafeTabClose]);
};
