interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, endDate: Date): number;
  addDays(days: number): Date;
}

export { IDateProvider };
