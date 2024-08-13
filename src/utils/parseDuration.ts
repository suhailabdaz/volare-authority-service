function parseDuration(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return (hours * 60 + minutes) * 60 * 1000; // Convert to milliseconds
}

export default parseDuration