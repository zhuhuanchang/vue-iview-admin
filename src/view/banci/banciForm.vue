<template>
  <div class="product">
    <Card>
      <Row slot="title"
           class="common-table-title">
        <Col span="12"
             class='title'>
        <CommonIcon :size='16'
                    :type='$route.meta.icon'></CommonIcon>
        {{$route.meta.title}}
        </Col>
        <Col span="12"
             class='action'>
        <Button type="info"
                size="small"
                @click="$router.go(-1)">返回</Button>

        </Col>
      </Row>
      <Spin fix
            v-if='formLoading'></Spin>
      <Form ref='form'
            :label-width="90"
            :model="formModel"
            :rules="formRule">
        <Alert v-if='!$route.query.id'
               type="warning"
               show-icon>注意：新增后数量不能修改</Alert>
        <FormItem label="名称："
                  prop="banCiName">
          <Input style='width:200px'
                 v-model="formModel.banCiName"
                 placeholder="请输入班次名称"></Input>
        </FormItem>
        <FormItem label="数量："
                  prop="cycleNum">
          <InputNumber v-if='formModel.cycleUnit===0'
                       style='width:50px'
                       :disabled="$route.query.id?true:false"
                       :max="31"
                       :min="1"
                       v-model="formModel.cycleNum"></InputNumber>
          <InputNumber v-if='formModel.cycleUnit===1'
                       style='width:50px'
                       :disabled="$route.query.id?true:false"
                       :max="4"
                       :min="1"
                       v-model="formModel.cycleNum"></InputNumber>
          <InputNumber v-if='formModel.cycleUnit===2'
                       style='width:50px'
                       :disabled="$route.query.id?true:false"
                       :max="1"
                       :min="1"
                       v-model="formModel.cycleNum"></InputNumber>
          <Select :disabled="$route.query.id?true:false"
                  v-model="formModel.cycleUnit"
                  style="width:70px;margin-left:5px;">
            <Option :value="0">日</Option>
            <Option :value="1">周</Option>
            <Option :value="2">月</Option>
          </Select>
        </FormItem>
        <FormItem label="内容：">
          <Row style='margin-bottom:10px;'
               v-for='(t,i) in formModel.banciTimeParts'
               :key='i'>
            <Col span="1"> 第{{i+1}}天：</Col>
            <Col span="9">
            <Select v-model="t.timeParts"
                    multiple
                    style="width:300px">
              <Option v-for="(st,si) in treeselectList"
                      :value="st.value"
                      :key="si">{{ st.label }}</Option>
            </Select>
            </Col>
          </Row>
          <!-- <Row style='margin-bottom:10px;'
               v-if='formModel.cycleUnit===1'
               v-for='(t,i) in formModel.banciTimeParts'
               :key='i'>
            <Col span="1"> 第{{i+1}}天：</Col>
            <Col span="9">
            <Select v-model="t.timeParts"
                    multiple
                    style="width:300px">
              <Option v-for="(st,si) in treeselectList"
                      :value="st.value"
                      :key="si">{{ st.label }}</Option>
            </Select>
            </Col>
          </Row> -->
        </FormItem>
        <FormItem>
          <Button :loading='formSubmitLoading'
                  @click='submitData'
                  type="primary">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";

export default {
  name: "banciForm",
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: "/product",
      treeselectList: [],
      formModel: {
        banCiName: "",
        cycleNum: 1,
        cycleUnit: 0,
        banciTimeParts: [{
          timeParts: [],
          dayNum: 0,
        }]
      },
      formRule: {}
    };
  },
  watch: {
    "formModel.cycleUnit" (newVal, oldVal) {
      this.formModel.cycleNum = 1;
      if (this.formModel.id) {
        return false;
      }
      this.formModel.banciTimeParts = [];
      let lengthArr = {
        0: this.formModel.cycleNum * 1,//天
        1: this.formModel.cycleNum * 7,//周
        2: this.formModel.cycleNum * 31 //月
      }
      for (let i = 0; i < lengthArr[this.formModel.cycleUnit]; i++) {
        this.formModel.banciTimeParts.push({
          timeParts: [this.treeselectList[0].value],
          dayNum: i,
        });
      }
    },
    "formModel.cycleNum" (newVal, oldVal) {
      if (this.formModel.id) {
        return false;
      }
      this.formModel.banciTimeParts = [];
      let lengthArr = {
        0: newVal * 1,//天
        1: newVal * 7,//周
        2: newVal * 31 //月
      }
      for (let i = 0; i < lengthArr[this.formModel.cycleUnit]; i++) {
        this.formModel.banciTimeParts.push({
          timeParts: [this.treeselectList[0].value],
          dayNum: i,
        });
      }
    }
  },
  computed: {},
  methods: {
    getTreeselectList () {
      var res = {
        data: [
          { departName: "早班", time: "8:00-9:00", id: "1" },
          { departName: "晚班", time: "8:00-9:00", id: "2" }
        ]
      };
      this.treeselectList = res.data.map((t, i) => {
        return {
          value: t.id,
          label: t.departName + t.time
        };
      });
    },
    getFormData () {
      let res = {
        data: {
          banCiName: "string",
          startDate: "2018-10-09T02:19:45",
          cycleNum: 2,
          cycleUnit: 1,
          orderBy: null,
          banciTimeParts: [
            {
              banciId: "01fd5a9d-4b75-47d4-97a3-d219628e9dd5",
              timeParts: ["1", "2"],
              dayNum: 1,
              id: "f685d0d3-1abd-4dcb-b22b-27cd637938f2"
            },
            {
              banciId: "01fd5a9d-4b75-47d4-97a3-d219628e9dd5",
              timeParts: ["1"],
              dayNum: 1,
              id: "f685d0d3-1abd-4dcb-b22b-27cd637938f2"
            }
          ],
          id: "01fd5a9d-4b75-47d4-97a3-d219628e9dd5"
        }
      };

      this.formModel.id = "";
      for (let attr in this.formModel) {
        this.formModel[attr] = res.data[attr];
      }
    }
  },
  mounted () {
    this.getTreeselectList();
    if (this.$route.query.id) {
      this.getFormData();
    }
  }
};
</script>
<style lang="less" scoped>
</style>
