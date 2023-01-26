import { useLayoutEffect, useState } from 'react';

export default function useWindowPosition(id:string) {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    function updatePosition() {
      const offetSetHeight = window.document.getElementById(id)?.offsetHeight;
      if(offetSetHeight)
     { if (window.pageYOffset > offetSetHeight) {
        setAnimation(true);
      }}
    }
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [id]);
  return animation;
}