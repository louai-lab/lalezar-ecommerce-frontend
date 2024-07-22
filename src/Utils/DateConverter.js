const convertISOToDateTime = (isoDateString, language) => {
  const dateObject = new Date(isoDateString);
  const currentDate = new Date();

  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  const isToday = (
    dateObject.getDate() === currentDate.getDate() &&
    dateObject.getMonth() === currentDate.getMonth() &&
    dateObject.getFullYear() === currentDate.getFullYear()
  );

  const isYesterday = (
    dateObject.getDate() === currentDate.getDate() - 1 &&
    dateObject.getMonth() === currentDate.getMonth() &&
    dateObject.getFullYear() === currentDate.getFullYear()
  );

  switch (true) {
    case isToday:
      if (language === 'ar') {
        return `اليوم في ${hours}:${minutes}`;
      } else {
        return `today at ${hours}:${minutes}`;
      }
    case isYesterday:
      if (language === 'ar') {
        return `أمس في ${hours}:${minutes}`;
      } else {
        return `yesterday at ${hours}:${minutes}`;
      }
    default:
      const day = dateObject.getDate().toString().padStart(2, '0');
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObject.getFullYear();
      if (language === 'ar') {
        return `${day}/${month}/${year} في ${hours}:${minutes}`;
      } else {
        return `${day}/${month}/${year} at ${hours}:${minutes}`;
      }
  }
};

export default convertISOToDateTime;
