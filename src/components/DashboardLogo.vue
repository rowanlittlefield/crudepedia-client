<template>
  <svg 
    :viewBox="`0 0 ${svg.width} ${svg.height}`"
    class="dashboard-logo"
  >
    <defs>
      <linearGradient
        :id="gradientOptions.id"
        x1="0%"
        x2="100%"
        y1="0"
        y2="0"
        spreadMethod="reflect"
      >
        <stop
          v-for="(color, idx) in colorList"
          :key="idx"
          :stop-color="color"
          :offset="`${idx * 100 / (colorList.length - 1)}%`"
        />
        <animate
          attributeName="x1"
          :dur="animationOptions.duration"
          values="0%;100%;"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x2"
          :dur="animationOptions.duration"
          values="100%;200%;"
          repeatCount="indefinite"
        />
      </linearGradient>
    </defs>
    <text
      id="crudepediaLogoText"
      :x="svg.width / 2"
      :y="svg.height / 2"
      :fill="`url(#${gradientOptions.id})`"
      text-anchor="middle"
      class="dashboard-logo__text"
    >
      CRUDepedia
    </text>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DashboardLogo extends Vue {
  private svg: Readonly<{ width: number, height: number }> = {
    width: 300,
    height: 100,
  };

  private gradientOptions: Readonly<{ id: string, colors: ReadonlyArray<string>}> = {
    id: 'svgGradientId',
    colors: [
      // Gradient Name: Fly High
      '#48c6ef',
      '#6f86d6',
    ],
  };

  private animationOptions: Readonly<{ duration: string }> = {
    duration: '7s',
  };

  private get colorList(): string[] {
      const colorsDup = this.gradientOptions.colors.slice();

      return [
        ...colorsDup,
        ...colorsDup.reverse().slice(1),
      ];
  }
}
</script>


<style scoped lang="scss">
.dashboard-logo {
  &__text {
    font-weight: 500;
  }
}
</style>