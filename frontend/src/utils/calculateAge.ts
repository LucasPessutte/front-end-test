export function calculateAge(birthDate: string | Date) {
  const today = new Date();
  const birth = new Date(birthDate);

  let years = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years--;
  }

  if (years >= 1) {
    return years;
  }

  let months = monthDiff;
  if (dayDiff < 0) {
    months--;
  }

  if (months < 0) {
    months += 12;
  }

  return Number((months / 12).toFixed(1));
}
