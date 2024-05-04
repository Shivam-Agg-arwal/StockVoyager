import React from "react";
import ReactApexChart from "react-apexcharts";
import fetchPrevCloseData from "../../../../pyserver/MakeRequest/getPrevCloseData";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: props.symbol,
      series: [],
      options: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: "#999",
              label: {
                show: true,
                text: "Support",
                style: {
                  color: "#fff",
                  background: "#00E396",
                },
              },
            },
          ],
          xaxis: [
            {
              x: new Date().getTime() - 5 * 365 * 24 * 60 * 60 * 1000, // Five years ago
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "Rally",
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          min: new Date().getTime() - 5 * 365 * 24 * 60 * 60 * 1000, // Five years ago
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },
      selection: "one_year",
    };
  }

  async componentDidMount() {
    // Fetch data when component mounts
    await this.fetchDataAndUpdateState(this.state.selection);
    // Set a timer to refresh data every 15 minutes
    this.refreshDataTimer = setInterval(() => {
      this.fetchDataAndUpdateState(this.state.selection);
    }, 15 * 60 * 1000);
  }

  componentWillUnmount() {
    // Clear the timer when component unmounts
    clearInterval(this.refreshDataTimer);
  }

  async fetchDataAndUpdateState(timeline) {
    const { symbol } = this.state;
    try {
      const data = await fetchPrevCloseData(symbol);
      // Parse prevclose values as numbers
      const seriesData = data.previous_close.map((item) => ({
        x: item.timestamp * 1000,
        y: typeof item.prevclose === 'string' ? parseFloat(item.prevclose.replace(",", "")) : item.prevclose, // Check if prevclose is a string before replacing commas
      }));
      // Update series data based on fetched data
      this.setState({
        series: [
          {
            data: seriesData,
          },
        ],
      });
      // Update chart based on timeline
      this.updateData(timeline);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error
    }
  }

  updateData(timeline) {
    const today = new Date();

    switch (timeline) {
      case "one_month":
        this.updateChart(
          new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate()
          ).getTime(),
          today.getTime()
        );
        break;
      case "six_months":
        this.updateChart(
          new Date(
            today.getFullYear(),
            today.getMonth() - 6,
            today.getDate()
          ).getTime(),
          today.getTime()
        );
        break;
      case "one_year":
        this.updateChart(
          new Date(
            today.getFullYear() - 1,
            today.getMonth(),
            today.getDate()
          ).getTime(),
          today.getTime()
        );
        break;
      case "ytd":
        this.updateChart(
          new Date(today.getFullYear(), 0, 1).getTime(),
          today.getTime()
        );
        break;
      case "all":
        this.updateChart(
          new Date(
            today.getFullYear() - 5,
            today.getMonth(),
            today.getDate()
          ).getTime(),
          today.getTime()
        );
        break;
      case "one_week":
        this.updateChart(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 7
          ).getTime(),
          today.getTime()
        );
        break;
      case "one_day":
        this.updateChart(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          ).getTime() -
            24 * 60 * 60 * 1000,
          today.getTime()
        );
        break;
      default:
        break;
    }
  }

  updateChart(startDate, endDate) {
    ApexCharts.exec("area-datetime", "zoomX", startDate, endDate);
  }

  render() {
    return (
      <div>
        <div id="chart">
          <div className="toolbar text-sm">
            {/* Buttons for selecting timeline */}
            <button
              className="m-3 bg-theme px-3 rounded-md text-lg hover:text-xl"
              onClick={() => this.updateData("one_week")}
            >
              1W
            </button>
            <button
              className="m-3 bg-theme px-3 rounded-md text-lg hover:text-xl"
              onClick={() => this.updateData("one_month")}
            >
              1M
            </button>
            <button
              className="m-3 bg-theme px-3 rounded-md text-lg hover:text-xl"
              onClick={() => this.updateData("six_months")}
            >
              6M
            </button>
            <button
              className="m-3 bg-theme px-3 rounded-md text-lg hover:text-xl"
              onClick={() => this.updateData("one_year")}
            >
              1Y
            </button>
            <button
              className="m-3 bg-theme px-3 rounded-md text-lg hover:text-xl"
              onClick={() => this.updateData("all")}
            >
              5Y
            </button>
          </div>
          <div id="chart-timeline">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height={350}
              width={500}
            />
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
