import { useEffect } from "react";

// --- Déclenche une animation du favicon synchronisée sur les FPS max de la machine
const initiateFaviconAnimation = () => {
  let faviconId = 0;
  console.log("Initiation de l'animation du favicon...");

  const animation = () => {
    faviconId = faviconId >= 360 ? 1 : faviconId + 1;
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");

    link.type = "image/svg+xml";
    link.rel = "icon";
    link.href = `/favicon/favicon_${faviconId}.svg`;
    // console.log('Favicon updated' + faviconId);
    setTimeout(() => requestAnimationFrame(animation), 10);
  };
  requestAnimationFrame(animation);
};

// --- Teste les performances de la machine avec un calcul complexe, et retourne le score
// <-> Score < 50 => Très bon
// <-> Score < 200 => Bon
// <-> Score < 500 => Moyen | Bas
// <-> Score > 500 => Médiocre
const performanceTest = () => {
  console.info("Test de performances en cours...");
  const startTime = performance.now();

  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += Math.sqrt(i);
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  console.log(`Score de performances: ` + duration);
  return duration;
};

const useFavicon = () => {
  useEffect(() => {
    const score = performanceTest();

    // Si le score est suffisant on déclenche l'animation
    score <= 200 && initiateFaviconAnimation();
  }, []);
};

export default useFavicon;
