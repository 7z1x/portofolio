import { useEffect, useState } from 'react';
import { FALLBACK_EXPERIENCES } from '../data/experiences';
import { fetchSanityExperiences, isSanityConfigured } from '../services/sanity';

export default function useExperiences() {
  const [experiences, setExperiences] = useState(FALLBACK_EXPERIENCES);

  useEffect(() => {
    if (!isSanityConfigured) return undefined;

    let cancelled = false;

    fetchSanityExperiences()
      .then((cmsExperiences) => {
        if (!cancelled && cmsExperiences.length > 0) {
          setExperiences(cmsExperiences);
        }
      })
      .catch((error) => {
        console.warn('Sanity experiences unavailable; using local fallback.', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return experiences;
}
