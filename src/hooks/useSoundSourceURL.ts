import { useState, useEffect, useMemo } from "react";

/**
 * Returns the current location of the client.
 * @returns The current location.
 */
const useLocation = () => {
  "use client";
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    setLocation(window.location);
  }, []);

  return location;
};

/**
 * Get the URL of the sound source based on the current location.
 */
const useSoundSourceURL = () => {
  const location = useLocation();
  return useMemo(
    () => (location?.origin ? `${location.origin}/samples/` : undefined),
    [location]
  );
};

export default useSoundSourceURL;
