import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { Doughnut } from 'react-chartjs-2';
interface Props extends PanelProps<SimpleOptions> { }


const Chart = require('react-chartjs-2').Chart;

Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;
      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
      //Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});

// Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
//   draw: function() {
//     originalDoughnutDraw.apply(this, arguments);
//
//     var chart = this.chart;
//     var width = chart.chart.width,
//         height = chart.chart.height,
//         ctx = chart.chart.ctx;
//
//     var fontSize = (height / 114).toFixed(2);
//     ctx.font = fontSize + "em sans-serif";
//     ctx.textBaseline = "middle";
//
//     var sum = 0;
//     for (var i = 0; i < chart.config.data.datasets[0].data.length; i++) {
//       sum += chart.config.data.datasets[0].data[i];
//     }
//
//     var text = sum,
//         textX = Math.round((width - ctx.measureText(text).width) / 2),
//         textY = height / 2;
//     ctx.fillText(text, textX, textY);
//   }
// });

const chartData = {

  labels: [
		'Elapsed',
		'Remaining'
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
    this.state = {chartData};
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
            elements: {
              center: {
                text: slot_spent_time_per+ '%',
                color: '#FF6384', // Default is #000000
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 20 // Defualt is 20 (as a percentage)
              }
            }
          }}
        />

        <div
          style={{
            bottom: 0,
            left: 0,
            fontSize: '1.15rem',
            paddingLeft: '5px',
            paddingRight: '5px',
            paddingTop: '20px',
            paddingBottom: '10px',
            textAlign: 'center'
          }}
        >
          <p> {slot_spent_time} min out of {total_time} min </p>
        </div>
      </div>
    );
  }
}
