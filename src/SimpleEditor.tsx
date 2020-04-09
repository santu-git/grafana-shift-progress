import React, { PureComponent } from 'react';
import { Select,FormLabel } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { SimpleOptions } from './types';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onTextChanged = ({ target }: any) => {
    console.log({ ...this.props.options })
    //this.props.onOptionsChange({ ...this.props.options, text: target.value, startTime: target.value, endTime: target.endTime, shiftDuration: target.value });
  };

  onNameFieldSlected =(data :any)=>{
    this.props.onOptionsChange({...this.props.options, name_field: data.value})
  }
  onTotalFieldSlected =(data :any)=>{
    this.props.onOptionsChange({...this.props.options, total_slot_time_field: data.value})
  }
  onRemainFieldSlected =(data :any)=>{
    this.props.onOptionsChange({...this.props.options, slot_remain_field: data.value})
  }
  onSpentFieldSlected =(data :any)=>{
    this.props.onOptionsChange({...this.props.options, slot_spent_field: data.value})
  }
  render() {
    const { options, data } = this.props;
    let fields: any = [];
    if(data.state=="Done"){
      if(data.series.length>0){
        fields = data.series[0].fields.map(item=> return {label: item.name.toUpperCase(), value: item.name});
      }
    }

    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Settings</h5>
        <FormLabel>Slot Name Field</FormLabel>
        <Select options={fields} placeholder="Select Name field" onChange={this.onNameFieldSlected} />
        <Select options={fields} placeholder="Select Total time field" onChange={this.onTotalFieldSlected} />
        <Select options={fields} placeholder="Select Remaining Field" onChange={this.onRemainFieldSlected} />
        <Select options={fields} placeholder="Select elapsed Field" onChange={this.onSpentFieldSlected} />
      </div>
    );
  }
}
