export const formatNewsDate = (dateString: string, language: string): string => {
  const date = new Date(dateString);
  const locale = language === 'tk' ? 'tk-TM' : 'ru-RU';

  const month = date.toLocaleDateString(locale, { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
