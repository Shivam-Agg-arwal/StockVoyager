import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
import fetchCurrentPrice from '../../../../pyserver/MakeRequest/getStockCurrentPrice';

class ApexChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: 'Bought Value',
                    data: []
                },
                {
                    name: 'Current Value',
                    data: []
                }
            ],
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
            error: null,
            priceData: {} // Store fetched price data
        };
    }

    componentDidMount() {
        this.fetchChartData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.fetchChartData();
        }
    }

    fetchChartData = async () => {
        try {
            const { user } = this.props;

            if (!user || !user.transactions) {
                throw new Error("User data or transactions not available");
            }

            const { transactions } = user;

            const boughtValueData = this.calculateBoughtValueOverTime(transactions);
            const currentValueData = await this.calculateCurrentValueOverTime(transactions, boughtValueData);

            this.setState({
                series: [
                    { ...this.state.series[0], data: boughtValueData },
                    { ...this.state.series[1], data: currentValueData }
                ],
                error: null
            });
        } catch (error) {
            console.error('Error:', error);
            this.setState({ error: error.message });
        }
    }

    calculateBoughtValueOverTime = (transactions) => {
        const boughtValues = [];
        let totalBoughtValue = 0;

        for (const transaction of transactions) {
            const timestamp = new Date(transaction.orderDate).getTime();
            if (transaction.orderType === "Buy") {
                totalBoughtValue += transaction.tradeValue;
            } else if (transaction.orderType === "Sell") {
                totalBoughtValue -= transaction.tradeValue;
            }
            boughtValues.push([timestamp, totalBoughtValue]);
        }

        return boughtValues;
    }

    calculateCurrentValueOverTime = async (transactions, boughtValues) => {
        const currentValueData = [];

        for (const [timestamp, boughtValue] of boughtValues) {
            let totalCurrentValue = 0;

            for (const transaction of transactions) {
                if (new Date(transaction.orderDate).getTime() <= timestamp) {
                    // Check if price data is already fetched for this stock symbol
                    const { stockSymbol } = transaction;
                    let currentPrice = this.state.priceData[stockSymbol];

                    // If price data is not already fetched, fetch it and store in memory
                    if (!currentPrice) {
                        const currentPriceData = await fetchCurrentPrice(stockSymbol);
                        currentPrice = currentPriceData.lastPrice;
                        this.setState(prevState => ({
                            priceData: {
                                ...prevState.priceData,
                                [stockSymbol]: currentPrice
                            }
                        }));
                    }

                    totalCurrentValue += currentPrice * transaction.quantity;
                }
            }

            currentValueData.push([timestamp, totalCurrentValue]);
        }

        return currentValueData;
    }

    render() {
        const { error } = this.state;

        if (error) {
            return <div>Error: {error}</div>;
        } 

        return (
            <div>
                <h2 className="text-2xl text-center font-bold">Portfolio Performance</h2>
                <div className="chart-container" style={{ width: "100%", height: "120%", margin: "auto" }}>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
                </div>
            </div>
        );        
    }
}

const mapStateToProps = (state) => ({
    user: state.profile.user,
});

export default connect(mapStateToProps)(ApexChart);
