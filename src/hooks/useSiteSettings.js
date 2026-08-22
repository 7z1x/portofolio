import { useEffect, useState } from 'react';
import { fetchSanitySettings, isSanityConfigured } from '../services/sanity';

export default function useSiteSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (!isSanityConfigured) return undefined;

    let cancelled = false;

    fetchSanitySettings()
      .then((data) => {
        if (!cancelled && data) {
          setSettings(data);
        }
      })
      .catch((error) => {
        console.warn('Sanity siteSettings unavailable; using local fallback.', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
