<template>
  <div>
    <svg 
      :width="svgProps.width"
      :height="svgProps.height"
      id="dashboardArticleAnalyticsSvg"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import * as originalD3 from 'd3';
import legend from 'd3-svg-legend';

const d3 = Object.assign(
  {},
  originalD3,
  legend,
);

@Component
export default class DashboardArticleAnalytics extends Vue {
  @Prop() private articleAnalytics!: [{
    id: string,
    title: string,
    views: number,
  }];

  private svgProps: Readonly<{ width: number, height: number }> = {
    width: 500,
    height: 300,
  };

  private margin: Readonly<{ top: number, bottom: number, right: number, left: number}> = {
    top: 10,
    bottom: 10,
    right: 10,
    left: 10,
  };

  private defaultMostViewed: ReadonlyArray< Readonly<{ id: number, views: number }>> = [
    { id: 0, views: 1 },
    { id: 1, views: 0 },
  ];


  private get plotGProps() {
    return {
      width: this.svgProps.width - this.margin.left - this.margin.right,
      height: this.svgProps.height - this.margin.top - this.margin.bottom,
    };
  }

  @Watch('articleAnalytics', { immediate: true })
  public onArticleAnalyticsChanged(val: []) {
    const data = val.length ? val : this.defaultMostViewed;
    setTimeout(() => { this.createViz(data); }, 0);
  }

  private createViz(data: any) {
    const mostViewed: any = data;
    const initialData = Object.keys(mostViewed).map((key, idx) => ({
      ...mostViewed[idx],
      views: idx ? 0 : 1,
    }));

    const pieChart = d3.pie();
    pieChart.value((d: any) => d.views)
      .sort(null);

    const initialPie = pieChart(initialData);
    const viewsPie = pieChart(mostViewed);

    const nestedData = d3.nest()
      .key((d: any): any => d.id)
      .entries(mostViewed);

    nestedData.forEach((d: any, i: number): any => {
      d.initialSlice = initialPie[i];
      d.viewsSlice = viewsPie[i];
    });

    const newArc: any = d3.arc();
    newArc.innerRadius(20)
      .outerRadius(100);

    const colorScale = d3.scaleOrdinal()
       .range(d3.schemePastel2);

    const yCenter = (this.svgProps.height - this.margin.top) / 2;
    const xCenter = yCenter;

    d3.select('svg#dashboardArticleAnalyticsSvg')
      .append('g')
      .attr('transform', `translate(${xCenter},${yCenter})`)
      .selectAll('path')
      .data(nestedData, (d: any): any => d.key)
      .enter()
      .append('path')
      .attr('d', (d: any): any => newArc(d.initialSlice))
      .style('fill', (d: any, i: any): any => colorScale(i))
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

    if (mostViewed !== this.defaultMostViewed) {
      const pieLegend: any = d3.legendColor()
        .labels(data.map(({ title }: any) => title))
        .scale(colorScale);

      d3.select('svg#dashboardArticleAnalyticsSvg')
        .append('g')
        .attr('transform', `translate(280, ${this.margin.top})`)
        .call(pieLegend);
    }
  }
}
</script>
