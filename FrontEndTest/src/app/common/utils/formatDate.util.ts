export function formatDate(fecha: Date): string {
  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1; // Los meses en JavaScript son 0-indexados
  const day = fecha.getDate();

  // Asegura que los componentes de la fecha tengan dos dígitos
  const formattedMonth = month < 10 ? `0${month}` : month.toString();
  const formattedDay = day < 10 ? `0${day}` : day.toString();

  return `${year}-${formattedMonth}-${formattedDay}`;
}
