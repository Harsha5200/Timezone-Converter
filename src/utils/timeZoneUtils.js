export const getShareableLink = (currentTime, timeZones) => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      time: currentTime.toISOString(),
      zones: timeZones.join(','),
    });
    return `${baseUrl}?${params.toString()}`;
  };
  
  export const scheduleMeet = (currentTime) => {
    const startTime = currentTime.format('YYYYMMDDTHHmmss');
    const endTime = currentTime.clone().add(2, 'hours').format('YYYYMMDDTHHmmss');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting&dates=${startTime}/${endTime}`;
    window.open(url, '_blank');
  };