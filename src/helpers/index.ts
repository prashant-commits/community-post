export function formatTimestamp(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();

  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    if(minutes === 0) return "now"
    return `${minutes} min ago`;
  } else if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours} hr ago`;
  } else {
    const day = timestamp.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[timestamp.getMonth()];
    const time = `${timestamp.getHours()}:${(timestamp.getMinutes() < 10 ? '0' : '')}${timestamp.getMinutes()}`;
    
    // Check for 1st, 2nd, 3rd
    const daySuffix = day === 1 ? 'st' : (day === 2 ? 'nd' : (day === 3 ? 'rd' : 'th'));

    return `${day}${daySuffix} ${month}, ${time}`;
  }
}