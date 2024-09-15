async function fetchData() {
    const response = await fetch('http://127.0.0.1:1111/data');
    const data = await response.json();
    
    const timestamps = data.map(entry => new Date(entry.timestamp).toLocaleString());
    const pressure_1 = data.map(entry => entry.pressure_1);
    const pressure_2 = data.map(entry => entry.pressure_2);
    const differential_pressure = data.map(entry => entry.differential_pressure);
    const reynold_number= data.map(entry => entry.reynold_number);
    
    return { timestamps, pressure_1, pressure_2, differential_pressure, reynold_number };
}

fetchData().then(({timestamps, pressure_1, pressure_2, differential_pressure, reynold_number}) => {
    const ctx1 = document.getElementById('pressure_1').getContext('2d');
    const ctx2 = document.getElementById('pressure_2').getContext('2d');
    const ctx3 = document.getElementById('differential_pressure').getContext('2d');
    const ctx4 = document.getElementById('reynold_number').getContext('2d');

    
    const config = {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Orifice Flow Meter',
                backgroundColor: 'rgb(255, 99, 132)',        
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {}
    };
    

    createChart(ctx1, 'Pressure 1 Data', pressure_1);
    createChart(ctx2, 'Pressure 2 Data', pressure_2);
    createChart(ctx3, 'Differential Pressure Data', differential_pressure);
    createChart(ctx4, 'Reynold Number Data', reynold_number);
    
});
