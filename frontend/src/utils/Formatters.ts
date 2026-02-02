export function formatBreed(breed: string) {
  if (!breed) return "";

  return breed
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function formatSex(sex: string) {
  const map: Record<string, string> = {
    MALE: "Macho",
    FEMALE: "Fêmea",
  };

  return map[sex] ?? sex;
}

export function formatTemperament(temperament: string) {
  const map: Record<string, string> = {
    CALM: "Calmo",
    AGGRESSIVE: "Agressivo",
    AFFECTIONATE: "Carinhoso",
  };

  return map[temperament] ?? temperament;
}
