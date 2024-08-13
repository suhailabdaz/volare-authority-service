async function getHolidays(): Promise<Date[]> {
 
  return [
    new Date('2024-12-25'),
    new Date('2025-01-01'), 
    new Date('2024-08-15'),
    new Date('2024-10-01'),
    new Date('2024-08-23')
  ];
}

export default getHolidays