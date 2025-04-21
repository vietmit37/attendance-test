export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export function generateMonthlyReport(month: number, year: number) {
  const daysInMonth = getDaysInMonth(month, year);
  const days: { [key: string]: number } = {};

  // Initialize all days with 0 hours
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    days[dateStr] = 0;
  }
  // Fill in actual work hours
  return {
    days,
  };
}