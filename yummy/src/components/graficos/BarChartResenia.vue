<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

export default {
    name: 'LineChartResenia',
    props: {
        data: {
            type: Array,
            required: true,
        },
        chartTitle: {
            type: String,
            default: 'Reseñas por Platillos',
        },
    },
    data() {
        return {
            chart: null,
        };
    },
    mounted() {
        Chart.register(...registerables);
        this.createChart();
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    },
    watch: {
        data: {
            handler(newData) {
                if (this.chart) {
                    const clonedData = JSON.parse(JSON.stringify(newData));
                    this.chart.data.labels = clonedData.map(item => item.nombre_plato);
                    this.chart.data.datasets[0].data = clonedData.map(item => item.promedio_resenia);
                    this.chart.data.datasets[1].data = clonedData.map(item => item.total_resenias);
                    this.chart.update();
                } else {
                    this.createChart();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        createChart() {
            if (!this.data || this.data.length === 0) {
                return;
            }

            const clonedData = JSON.parse(JSON.stringify(this.data));

            const labels = clonedData.map(item => item.nombre_plato);
            const dataPromedio = clonedData.map(item => item.promedio_resenia);
            const dataTotal = clonedData.map(item => item.total_resenias);

            const ctx = this.$refs.chartCanvas.getContext('2d');

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Promedio de Reseñas',
                        data: dataPromedio,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                    },
                    {
                        label: 'Total de Reseñas',
                        data: dataTotal,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                    },
                ],
            };

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                    },
                    title: {
                        display: true,
                        text: this.chartTitle,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Platillos',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Reseñas',
                        },
                    },
                },
            };

            // Clonamos profundamente las opciones para eliminar reactividad
            const clonedOptions = JSON.parse(JSON.stringify(options));
            // Asignamos el título después de clonar para evitar reactividad
            clonedOptions.plugins.title.text = this.chartTitle;

            this.chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: clonedOptions,
            });
        },
    },
};
</script>

<style scoped>
canvas {
    width: 100%;
    height: calc(100vh - 100px);
}
</style>