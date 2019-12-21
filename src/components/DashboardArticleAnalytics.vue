<template>
  <svg 
    :width="svgProps.width"
    :height="svgProps.height"
    id="dashboardArticleAnalytics"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';
import mostViewedArticles from '@/mock-data/most-viewed-articles';
import mostYeahArticles from '@/mock-data/most-yeah-articles';

@Component
export default class DashboardArticleAnalytics extends Vue {
  private svgProps: Readonly<{ width: number, height: number }> = {
    width: 300,
    height: 300,
  };

  private margin: Readonly<{ top: number, bottom: number, right: number, left: number}> = {
    top: 10,
    bottom: 10,
    right: 10,
    left: 10,
  };

  private mostViewed: any = mostViewedArticles.data.mostViewedArticles;
  private mostYeah: any = mostYeahArticles.data.mostYeahArticles;

  private get plotGProps() {
    return {
      width: this.svgProps.width - this.margin.left - this.margin.right,
      height: this.svgProps.height - this.margin.top - this.margin.bottom,
    };
  }

  public mounted() {
    this.createViz();
  }

  private createViz() {
    const { mostViewed, mostYeah } = this;
    const initialData = [
      {
        id: 1,
        views: 1,
      },
      {
        id: 2,
        views: 0,
      },
      {
        id: 15,
        views: 0,
      },
      {
        id: 98,
        views: 0,
      },
      {
        id: 97,
        views: 0,
      },
    ];

    const pieChart = d3.pie();
    pieChart.value((d: any) => d.views)
      .sort(null);

    const initialPie = pieChart(initialData);
    const viewsPie = pieChart(mostViewed);

    const nestedData = d3.nest()
      .key((d: { id: any }): any => d.id)
      .entries(mostViewed);

    nestedData.forEach((d: any, i: number): any => {
      d.initialSlice = initialPie[i];
      d.viewsSlice = viewsPie[i];
    });

    const newArc: any = d3.arc();
    newArc.innerRadius(20)
      .outerRadius(100);

    let tenColorScale = d3.scaleOrdinal()
       .range(d3.schemePastel2);

    const xCenter = (this.svgProps.width - this.margin.left) / 2;
    const yCenter = (this.svgProps.height - this.margin.top) / 2;

    d3.select('svg#dashboardArticleAnalytics')
      .append('g')
      .attr('transform', `translate(${xCenter},${yCenter})`)
      .selectAll('path')
      // .data(initialPie)
      .data(nestedData, (d: any): any => d.key)
      .enter()
      .append('path')
      .attr('d', (d: any): any => newArc(d.initialSlice))
      .style('fill', (d: any, i: any): any => tenColorScale(i))
      .style('stroke', 'black')
      .style('stroke-width', '2px');

    d3.selectAll('path')
        .transition()
        .duration(1500)
        .attrTween('d', arcTween);

    function arcTween(d: any) {
        return (t: any) => {

          const interpolateStartAngle = d3.interpolate(d.initialSlice.startAngle, d.viewsSlice.startAngle);
          const interpolateEndAngle = d3.interpolate(d.initialSlice.endAngle, d.viewsSlice.endAngle);
          d.startAngle = interpolateStartAngle(t);
          d.endAngle = interpolateEndAngle(t);
          return newArc(d);
        };
      }
  }
}
</script>

<style scoped lang="scss">
</style>