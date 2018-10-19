<template>
  <div>
    <!-- <Row :gutter="20">
      <i-col span="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row> -->
    <Row :gutter="20"
         style="margin-top: 20px;">
      <i-col span="8">
        <Card shadow>
          <chart-pie style="height: 300px;"
                     :value="pieData"
                     text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col span="16">
        <Card shadow>
          <chart-bar style="height: 300px;"
                     :value="barData"
                     text="每周用户访问量" />
        </Card>
      </i-col>
    </Row>
    <Row style="margin-top: 20px;">
      <Card shadow>
        <example style="height: 310px;" />
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '迟到', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 23432, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: '迟到' },
        { value: 310, name: '早退' },
        { value: 234, name: '未打卡' },
        // { value: 135, name: '视频广告' },
        // { value: 1548, name: '搜索引擎' }
      ],
      barData: {
        '周一': 13253,
        '周二': 34235,
        '周三': 26321,
        '周四': 12340,
        '周五': 24643,
        '周六': 1322,
        '周日': 1324
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
