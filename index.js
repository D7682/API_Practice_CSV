chartIt();
getData();


async function chartIt(){
    const data = await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
    
    const myChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: data.xs,
        datasets: [{
            label: 'Estimated Population Of States In 2019',
            backgroundColor: 'rgb(242, 15, 98)',
            borderColor: 'rgb(242, 15, 98)',
            borderWidth: 2,
            pointHoverBackgroundColor: 'rgb(242, 15, 98)',
            pointHoverBorderColor: 'rgb(242, 15, 98)',
            pointHoverBorderWidth: 1,
            data: data.ys,
            fill: false
        }]
    },

    // Configuration options go here
    options: {
       elements: {
           line: {
               tension: .2
           }
       }
    }
});
}



getData();
async function getData(){
    const xs = [];
    const ys = [];

    const response = await fetch('SCPRC-EST2019-18+POP-RES.csv');
    const data = await response.text();
    const table = data.split('\n').slice(2);

    table.forEach(row => {
        const columns = row.split(',');
        const pop_2019_Estimate = columns[5];
        ys.push(parseFloat(pop_2019_Estimate));
        const Name = columns[4];
        xs.push(Name);
        console.log(xs, ys);
    })
    return {xs, ys}
}