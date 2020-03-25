export interface SimpleOptions {
  text: string;
  startTime: string;
  endTime: string;
  shiftDuration: number;
}

export const defaults: SimpleOptions = {
  text: 'The default text!',
  startTime: '00:00 AM',
  endTime: '11:59 PM',
  shiftDuration: 8
};
