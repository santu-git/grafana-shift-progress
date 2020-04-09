export interface SimpleOptions {
  text: string;
  name_field: string;
  slot_remain_field: string;
  slot_spent_field: string;
}

export const defaults: SimpleOptions = {
  text: 'The default text!',
  name_field: '',
  slot_remain_field: '',
  slot_spent_field: ''
};
