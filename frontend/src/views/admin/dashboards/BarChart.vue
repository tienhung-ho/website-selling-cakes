<template>
  <div class="chart-yield" style="position: relative;">
    <div style="position: relative;">
      <Line :data="data" :options="options" />

    </div>
    <div style="position: relative;">

      <Bar :data="dataQuantity" :options="options" />
    </div>

    <div style="position: relative;">
      <Line :data="dataPrice" :options="options" />

    </div>

  </div>

</template>

<script lang="ts">

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import { Line, Bar, Pie } from 'vue-chartjs'
import ordersServices from '@/services/admin/orders.services'
import productsServices from '@/services/admin/products.services'
import { ref, onMounted } from 'vue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

export default {
  name: 'App',
  components: {
    Line, Bar, Pie
  },
  setup() {
    const lineChart = ref(null);
    const barChart = ref(null);
    const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

    const data = ref({
      labels: labels,
      datasets: [{
        label: 'Dữ liệu số lượng loại bánh bán theo từng tháng của năm 2024',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',

        ],
        borderWidth: 1
      },
      {
        label: 'Dữ liệu số lượng loại bánh nhập theo từng tháng của năm 2024',
        data: [],
        backgroundColor: [

          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [

          'rgb(54, 162, 235)',
        ],
        borderWidth: 1
      },



      ]
    })

    const dataQuantity = ref({
      labels: labels,
      datasets: [{
        label: 'Dữ liệu số lượng bánh bán theo từng tháng của năm 2024',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',

        ],
        borderWidth: 1
      },
      {
        label: 'Dữ liệu số lượng bánh nhập theo từng tháng của năm 2024',
        data: [],
        backgroundColor: [

          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [

          'rgb(54, 162, 235)',
        ],
        borderWidth: 1
      },



      ]
    })

    const dataPrice = ref({
      labels: labels,
      datasets: [{
        label: 'Dữ liệu tiền thu theo từng tháng của năm 2024',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',

        ],
        borderWidth: 1
      },
      {
        label: 'Dữ liệu tiền nhập theo từng tháng của năm 2024',
        data: [],
        backgroundColor: [

          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [

          'rgb(54, 162, 235)',
        ],
        borderWidth: 1
      },



      ]
    })

    const options = {
      responsive: true
    };

    const updateCharts = () => {
      if (lineChart.value && barChart.value) {

        lineChart.value.update();
        barChart.value.update();
        console.log(lineChart.value);

      }
    };

    const newData = JSON.parse(JSON.stringify(data.value));
    const newDataQuantity = JSON.parse(JSON.stringify(dataQuantity.value));
    const newDataPrice = JSON.parse(JSON.stringify(dataPrice.value));

    const getAllData = async () => {

      let orderData = await ordersServices.getAllOrders()
      let productData = await productsServices.getAll()

      const deletedProducts = productData.filter(item => item.deleted === true);
      let lengthProductDeleted = deletedProducts.length;

      let lengthProduct = productData.length - lengthProductDeleted

      // Khởi tạo mảng 12 phần tử ban đầu với giá trị 0
      const monthlyCountsOfOrders = new Array(12).fill(0)
      const monthlyQuantityOfOrders = new Array(12).fill(0)
      const monthlyPriceOfOrders = new Array(12).fill(0)

      // Lặp qua mỗi bản ghi
      orderData.forEach(record => {
        // Lấy tháng từ createdAt
        const createdAtMonth = new Date(record.createdAt).getMonth();
        // Tăng giá trị tương ứng trong mảng monthlyCounts

        monthlyCountsOfOrders[createdAtMonth]++;
        let totalQuantity = record.products.reduce((total, item) => total + item.quantity, 0);

        monthlyQuantityOfOrders[createdAtMonth] += totalQuantity        
        monthlyPriceOfOrders[createdAtMonth] += record.totalPrice


      });

      newData.datasets[0].data = [...monthlyCountsOfOrders];
      newDataQuantity.datasets[0].data = [...monthlyQuantityOfOrders];
      newDataPrice.datasets[0].data = [...monthlyPriceOfOrders]

      const monthlyCountsOfProduct = new Array(12).fill(0)
      const monthlyQuantityOfProduct = new Array(12).fill(0)
      const monthlyPriceOfProduct = new Array(12).fill(0)

      productData.forEach(record => {

        const updatedAtMonth = new Date(record.updatedAt).getMonth();

        monthlyCountsOfProduct[updatedAtMonth]++;
      
        
        let totalQuantity = record.quantity
        
        monthlyQuantityOfProduct[updatedAtMonth] += totalQuantity
        monthlyPriceOfProduct[updatedAtMonth] += totalQuantity * record.price

      });

      newData.datasets[1].data = [...monthlyCountsOfProduct];
      newDataQuantity.datasets[1].data = [...monthlyQuantityOfProduct];
      newDataPrice.datasets[1].data = [...monthlyPriceOfProduct]


      data.value = newData
      dataQuantity.value = newDataQuantity
      dataPrice.value = newDataPrice
      updateCharts();

    }

    onMounted(() => {
      getAllData();
    });


    return {
      data,
      dataQuantity,
      dataPrice,
      options,
      lineChart,
      barChart,
      getAllData,
      updateCharts
    };
  },
  data() {

    return {
    }
  },

  methods: {


  },
  mounted() {

  },

  watch: {

  }
}


</script>

<style lang="scss" scoped>
.chart-yield {
  // display: flex;
  // justify-content: space-around;

}
</style>
<!-- <template>
    <div>
    <button @click="updateGraph">Update Graph</button>
  </div>
  <div class="container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default {
  data() {
    return {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  components: {
      Line
  },

  methods: {
    updateGraph() {
  // Tạo một bản sao sâu của chartData
  const newData = JSON.parse(JSON.stringify(this.chartData));
  
  // Truy cập dataset cần thay đổi và cập nhật data mới
  newData.datasets[0].data = [50, 59, 50, 50, 59, 50, 50]; // Thay đổi dữ liệu của dataset đầu tiên
  
  // Cập nhật chartData bằng bản sao mới
  this.chartData = newData;
},

  },
};
</script> -->
