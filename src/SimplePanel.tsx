import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { Doughnut } from 'react-chartjs-2';

interface Props extends PanelProps<SimpleOptions> { }

const chartData = {
  labels: [
		'Elapsed'
		'Remaining',
	],
  datasets: [
    {
      backgroundColor: [
        '#31D647',
        '#e5e5e5'
      ],
      hoverBackgroundColor: [
        '#31D647',
        '#e5e5e5',
      ],
      data: [0,0]
    }
  ]
}

export class SimplePanel extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {chartData : chartData}
  }
  render() {
    const { options, data, width, height } = this.props;
    let slot_name='Select Field for Slot name'
    let total_time= 0
    let slot_remaining_time = 0;
    let slot_remaining_time_per = 0;
    let slot_spent_time_per = 0;
    let slot_spent_time = 0;
    try{
      // Set Slot Name field.
      let name = data.series[0].fields.filter(item=>item.name==options.name_field);
      if(name.length>0){
        slot_name = name[0].values.buffer[0];
      }

      // Set Total Time
      let total_time_field = data.series[0].fields.filter(item=>item.name==options.total_slot_time_field);
      if(total_time_field.length>0){
        total_time = total_time_field[0].values.buffer[0];
      }

      // Set Remaining Time
      let remain_time_field = data.series[0].fields.filter(item=>item.name==options.slot_remain_field);
      if(remain_time_field.length>0){
        slot_remaining_time = remain_time_field[0].values.buffer[0];
      }

      // Set Spent Time
      let spent_time_field = data.series[0].fields.filter(item=>item.name==options.slot_spent_field);
      if(spent_time_field.length>0){
        slot_spent_time = spent_time_field[0].values.buffer[0];
      }
      slot_remaining_time_per = (slot_remaining_time/total_time*100).toFixed(2);
      slot_spent_time_per = (slot_spent_time/total_time*100).toFixed(2);
      this.state.chartData.datasets[0].data = [slot_spent_time_per,slot_remaining_time_per]
    }catch(e){
      console.log(e);
    }
    //console.log(this.state.chartData.datasets[0].data = [300,180]);


    // console.log(this.state.chartData);
    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        <Doughnut
          redraw={true}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            title: {
              display: true,
              text: slot_name,
              fontSize: 20
            },
            legend: {
              display: false,
              position: 'right'
            },
            tooltips: {
              enabled: false
            },
          }}
        />

        <div
          style={{
            bottom: 0,
            left: 0,
            'font-size': '1.15rem'
            'padding-left': '5px',
            'padding-right': '5px',
            'padding-top': '20px',
            'padding-bottom': '10px',
            'text-align': 'center'
          }}
        >
          <p> {slot_spent_time} min out of {total_time} min </p>
        </div>
      </div>
    );
  }
}
