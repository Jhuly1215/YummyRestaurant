<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

export default {
    name: 'RadarChartConsumo',
    props: {
        data: {
            type: Array,
            required: true,
        },
        chartTitle: {
            type: String,
            default: 'Consumo por Horas',
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

        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }

        window.removeEventListener('resize', this.handleResize);
    },
    watch: {
        data: {
            handler(newData) {
                if (this.chart) {
                    this.chart.data.labels = newData.map(item => item.x); // Actualiza etiquetas
                    this.chart.data.datasets[0].data = newData.map(item => item.y); // Actualiza datos
                    this.chart.update();
                } else {
                    // Crea el gráfico si aún no existe
                    this.createChart();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        createChart() {
            const labels = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
            const defaultData = labels.map((hora) => {
                const dataPoint = this.data.find((item) => item.x == hora); // Busca si existe un dato para la hora
                return dataPoint ? dataPoint.y : 0; // Usa el dato encontrado o 0 si no hay datos
            });
            if (!this.data || this.data.length === 0) {
                return;
            }
            const ctx = this.$refs.chartCanvas.getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'radar', // Tipo de gráfico
                data: {
                    labels: labels,// Horas (0-23)
                    datasets: [
                        {
                            label: 'Consumo por Hora',
                            data: defaultData, // Valores de consumo
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        },
                    ],
                },
                options: {
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
                        r: {
                            beginAtZero: true,
                        },
                    },
                },
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
