import React, { PureComponent } from 'react';
import { FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { SimpleOptions } from './types';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onTextChanged = ({ target }: any) => {
    console.log({ ...this.props.options })
    //this.props.onOptionsChange({ ...this.props.options, text: target.value, startTime: target.value, endTime: target.endTime, shiftDuration: target.value });
  };

  render() {
    const { options } = this.props;

    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Display</h5>
        <FormField label="Text" labelWidth={5} inputWidth={20} type="text" onChange={this.onTextChanged} value={options.text || ''} />
        <FormField label="Start Time" labelWidth={5} inputWidth={20} type="time" onChange={this.onTextChanged} value={options.startTime || '00:00 AM'} />
        <FormField label="End Time" labelWidth={5} inputWidth={20} type="time" onChange={this.onTextChanged} value={options.endTime || '11:59 PM'} />
        <FormField label="End Time" labelWidth={5} inputWidth={20} type="number" onChange={this.onTextChanged} value={options.shiftDuration || 5} />
      </div>
    );
  }
}
