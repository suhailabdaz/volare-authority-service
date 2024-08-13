function calculateDynamicPrice(basePrice: number, isHoliday: boolean, isWeekend: boolean): number {
  let price = basePrice;
  if (isHoliday) {
    price *= 1.7; // 70% increase for holidays
  } else if (isWeekend) {
    price *= 1.5; // 50% increase for weekends
  }
  return Math.round(price * 100) / 100; // Round to 2 decimal places
}


export default calculateDynamicPrice