async function fetchData() {
    try {
        const response = await fetch("http://127.0.0.1:1111/data");
        const data = await response.json();

        const timestamps = data.map((entry) =>
            new Date(entry.timestamp).toLocaleString()
        );
        const pressure_1 = data.map((entry) => entry.pressure_1);
        const pressure_2 = data.map((entry) => entry.pressure_2);
        const differential_pressure = data.map(
            (entry) => entry.differential_pressure
        );
        const reynold_number = data.map((entry) => entry.reynold_number);

        return {
            timestamps,
            pressure_1,
            pressure_2,
            differential_pressure,
            reynold_number,
        };
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function createChart(ctx, label, dataset) {
    new Chart(ctx, {
        type: "line",
        data: {
            labels: dataset.labels, // X-axis labels (timestamps)
            datasets: [
                {
                    label: label,
                    data: dataset.data, // Y-axis data (sensor values)
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: false,
                    tension: 0.1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: "Timestamp",
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: label,
                    },
                },
            },
        },
    });
}

fetchData().then(
    ({
        timestamps,
        pressure_1,
        pressure_2,
        differential_pressure,
        reynold_number,
    }) => {
        createChart(
            document.getElementById("pressure_1").getContext("2d"),
            "Pressure 1",
            { labels: timestamps, data: pressure_1 }
        );
        createChart(
            document.getElementById("pressure_2").getContext("2d"),
            "Pressure 2",
            { labels: timestamps, data: pressure_2 }
        );
        createChart(
            document.getElementById("differential_pressure").getContext("2d"),
            "Differential Pressure",
            { labels: timestamps, data: differential_pressure }
        );
        createChart(
            document.getElementById("reynold_number").getContext("2d"),
            "Reynold Number",
            { labels: timestamps, data: reynold_number }
        );
    }
);
