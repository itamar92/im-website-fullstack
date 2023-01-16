import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToSection() {
  const { hash } = useLocation();

  useEffect(() => {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView();
    }
  }, [hash]);

  return null;
}
