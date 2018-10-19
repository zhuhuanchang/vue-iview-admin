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
                icon="md-add"
                @click="formOpenModal()">添加</Button>
        <Button type="warning"
                size="small"
                icon="md-sync"
                @click="getData()">刷新</Button>
        </Col>
      </Row>
      <!-- <Row class="common-search-box"
        @keydown.enter.native="searchData">
        <Col span="24">
        <Input v-model="searchFields.name"
          placeholder="请输入角色名称"></Input>
        <Button type="primary"
          icon="search"
          :loading="searchLoading"
          @click='searchData'>搜索</Button>
        </Col>
      </Row> -->
      <Table :loading="tableLoading"
             :columns="tableFieldsRender"
             :data="tableList"></Table>
      <Page class='common-page-box'
            v-if='tableList.length>0'
            show-elevator
            :page-size="pageSize"
            :total="count"
            :current="currentPage"
            @on-change="pageChange"
            @on-page-size-change='pageChangeSize'></Page>
      <Modal ref='formModal'
             v-model="formShow"
             :loading='modalButtonShowLoading'
             @on-ok='submitData'
             @on-cancel='formCloseModal'
             :title='$route.meta.title+"详情"'>
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="90"
              :model="formModel"
              :rules="formRule">
          <FormItem label="产品名称："
                    prop="banciName">
            <Input v-model="formModel.banciName"
                   placeholder="请输入产品名称"></Input>
          </FormItem>
          <FormItem label="产品名称：">
            <RadioGroup v-model="buttonType"
                        type="button">
              <Radio label="company">公司</Radio>
              <Radio label="department">部门</Radio>
              <Radio label="personal">个人</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
export default {
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      buttonType: 'department',
      url: "/product",
      searchFields: {
        // name: ""
      },
      tableFields: [

        {
          title: "产品名称",
          key: "banciName",
          align: "center"
        }
      ],
      formModel: {
        banCiName: "",
      },
      formRule: {
        name: [{ required: true, message: "产品名称不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
    getFormData () {
      let res = {
        data: {
          "departInfoId": '1',
          "departName": null,
          "userGuid": null,
          "fullName": null,
          "banciId": "f894a5d2-16eb-4231-93b9-f3c421a0db40",
          "banciName": "研发部班次",
          "startDate": "2018-09-12T00:00:00",
          "endDate": "2018-10-30T00:00:00",
          "paiBanType": 0,
          "id": "62317f2f-7e81-4e32-ad83-680fd4fddfdb"
        }
      };

      this.formModel.id = "";
      for (let attr in this.formModel) {
        this.formModel[attr] = res.data[attr];
      }

    },
    getData () {
      let res = {
        "result": true,
        "message": "操作成功",
        "curPage": "1",
        "pageSize": "20",
        "data": [
          {
            "departInfoId": null,
            "departName": null,
            "userGuid": null,
            "fullName": null,
            "banciId": "f894a5d2-16eb-4231-93b9-f3c421a0db40",
            "banciName": "研发部班次",
            "startDate": "2018-09-12T00:00:00",
            "endDate": "2018-10-30T00:00:00",
            "paiBanType": 0,
            "id": "62317f2f-7e81-4e32-ad83-680fd4fddfdb"
          }
        ],
        "total": 1
      }
      this.tableList = res.data;
    }
  },
  mounted () {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
</style>
