import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const InvestmentGraph = ({ Investment, Interest }) => {
    useEffect(() => {
        Interest=Math.round(Interest)
        const options = {
            series: [Investment, Interest],
            labels: ["Investment", "Interest"], // Updated labels
            chart: {
                type: "donut",
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        // Cleanup
        return () => {
            chart.destroy();
        };
    }, []); // Empty dependency array to ensure it only runs once on mount

    return <div id="chart" className="w-[500px]"></div>;
};

export default InvestmentGraph;
