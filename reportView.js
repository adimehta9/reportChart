import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartJS';
import runReport from '@salesforce/apex/ReportViewLightningController.runReport';


export default class ReportView extends LightningElement {
    chart;
    chartjsInitialized = false;

    renderedCallback(){
        if(this.chartjsInitialized){
            return;
        }
        this.chartjsInitialized = true;

        loadScript(this, chartjs)
        .then(() => {
            return runReport();
        })
        .then((results) => {
            let resultsData = JSON.parse(results);


            let returnData = [];
            let labelData = [];
            for(let i = 0; i<resultsData.groupingsDown.groupings.length; i++){
                labelData.push(resultsData.groupingsDown.groupings[i].label); // Gets header
                let key = resultsData.groupingsDown.groupings[i].key; // gets key for respective header
                returnData.push(resultsData.factMap[key + '!T'].aggregates[0].value ); // puts value
            }
            /* labelData.push("Third Test");
            returnData.push(20); */
          
            let config = {
                type: 'bar',
                data: {
                    labels: labelData,
                    datasets: [{
                        /* data: [10, 80], */
                        data: returnData,
                        fill: false,
                        backgroundColor: "rgba(0,161,224,255) ",
                        borderColor: "rgba(0,161,224,255)",
                        borderCapStyle: 'butt',
                        borderDash: [5, 5],
                    }]
                },
                options: {
                    legend: {
                        display:false
                    },
                    title: {
                    display: true,
                    text: "Wealth Metrics Asset Holdings by Fund."
                    },
                    indexAxis: 'y',
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }       
                        }]
                    }
                }
            };  
            const ctx = this.template
                .querySelector('canvas.bar')
                .getContext('2d');
            //console.log(ctx);
            this.chart = new window.Chart(ctx, config);
            

        })
        .catch(error => {
            this.error = error;
        });
    }
}
