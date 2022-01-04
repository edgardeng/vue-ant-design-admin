<template>
  <a-row>
    <a-col :span="18">
      <a-row>
        <a-col v-for="item in [0,1,2]" :span="7" >
          <a-card size="small" title="访问数" >
            <template #extra>
              <a-tag type="warning">  月</a-tag>
            </template>
            <div style="font-size: 48px;" >
              2000
            </div>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <div ref="chartRef" style="height:300px;width:100%"></div>
      </a-row>
    </a-col>
    <a-col :span="6">
      <a-card>
        <div>
          <a-avatar
              size="large"
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
          <div style="padding: 10px 0">Edgar Deng</div>
          <div>Frontend Software Engineer</div>
          <div style="padding-top: 10px">
            <p>
              <a-icon /> xx部门 <br/>
              <a-icon  /> **上海
            </p>
          </div>

        </div>

      </a-card>
      <a-card title="标签" style="margin-top: 30px;">
        <a-tag>Vue</a-tag>
        <a-tag>Admin Page</a-tag>
        <a-tag>Echarts</a-tag>
      </a-card>
    </a-col>

  </a-row>
</template>
<script lang="ts">
import {defineComponent, ref, onMounted, Ref, unref} from 'vue';
import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts';

export default defineComponent({
  components: {
  },
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null)
    function setOptions( elRef: Ref<HTMLDivElement> , options:EChartsOption) {
      console.log(elRef)
      console.log(options)
      let chartInstance: echarts.ECharts | null = null;
      const el = unref(elRef);
      if (!el || !unref(el)) {
        return;
      }
      console.log(el)
      console.log(echarts)
      var t = 'default'
      try {
        chartInstance = echarts.init(el,)
        console.log(chartInstance)
        chartInstance?.setOption(options);
      } catch (e) {
        console.log(e)
      }
    }
    onMounted(() => {
      setOptions(chartRef as Ref<HTMLDivElement>, {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            max: 80000,
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
          },
        ],
        grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
        series: [
          {
            smooth: true,
            data: [
              111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222,
              11111, 4000, 2000, 500, 333, 222, 111,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef',
            },
          },
          {
            smooth: true,
            data: [
              33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
              198, 60, 30, 22, 11,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#019680',
            },
          },
        ],
      });
    });

    return {
      chartRef
    }
  }
})
</script>
<style>

</style>