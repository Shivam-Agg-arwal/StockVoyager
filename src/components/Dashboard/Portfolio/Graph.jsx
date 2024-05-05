import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'Bought Value',
                data: [
                    [1327359600000, 30.95],
                    [1327446000000, 31.34],
                    [1327532400000, 31.18],
                    [1327618800000, 31.05],
                    [1327878000000, 31.00],
                    [1327964400000, 30.95],
                    [1328050800000, 31.24],
                    [1328137200000, 31.29],
                    [1328223600000, 31.85],
                    [1328482800000, 31.86],
                    [1328569200000, 32.28],
                    [1328655600000, 32.10],
                    [1328742000000, 32.65],
                    [1328828400000, 32.21],
                    [1329087600000, 32.35],
                    [1329174000000, 32.44],
                    [1329260400000, 32.46],
                    [1329346800000, 32.86],
                    [1329433200000, 32.75],
                    [1329778800000, 32.54],
                    [1329865200000, 32.33],
                    [1329951600000, 32.97],
                    [1330038000000, 33.41],
                    [1330297200000, 33.27],
                    [1330383600000, 33.27],
                    [1330470000000, 32.89],
                    [1330556400000, 33.10],
                    [1330642800000, 33.73],
                    [1330902000000, 33.22],
                    [1330988400000, 31.99],
                    // Add more data points for bought value as needed
                ]
            }, {
                name: 'Current Value',
                data: [
                    [1327359600000, 32.05],
                    [1327446000000, 32.50],
                    [1327532400000, 32.40],
                    [1327618800000, 32.30],
                    [1327878000000, 32.20],
                    [1327964400000, 32.15],
                    [1328050800000, 32.24],
                    [1328137200000, 32.19],
                    [1328223600000, 32.25],
                    [1328482800000, 32.26],
                    [1328569200000, 32.68],
                    [1328655600000, 32.50],
                    [1328742000000, 32.95],
                    [1328828400000, 32.51],
                    [1329087600000, 32.65],
                    [1329174000000, 32.74],
                    [1329260400000, 32.76],
                    [1329346800000, 33.16],
                    [1329433200000, 33.05],
                    [1329778800000, 32.84],
                    [1329865200000, 32.63],
                    [1329951600000, 33.27],
                    [1330038000000, 33.71],
                    [1330297200000, 33.57],
                    [1330383600000, 33.57],
                    [1330470000000, 33.19],
                    [1330556400000, 33.40],
                    [1330642800000, 34.03],
                    [1330902000000, 33.52],
                    [1330988400000, 32.29],
                    // Add more data points for current value as needed
                ]
            }],
            options: {
                chart: {
                    id: 'area-datetime',
                    type: 'line',
                    height: 350,
                    zoom: {
                        autoScaleYaxis: true
                    }
                },
                xaxis: {
                    type: 'datetime',
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                    style: 'hollow',
                },
                tooltip: {
                    x: {
                        format: "dd MMM yyyy"
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100],
                    },
                },
            },
            selection: 'one_year',
        };
    }

    updateData(timeline) {
        this.setState({
            selection: timeline
        })

        // Implement the logic to update data based on timeline selection
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
                </div>
            </div>
        );
    }
}

export default ApexChart;
