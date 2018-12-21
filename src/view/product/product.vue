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
      <Row class="common-search-box"
           @keydown.enter.native="searchData">
        <Col span="24">
        <Input v-model="searchFields.name"
               placeholder="请输入产品名称"></Input>
        <Select @on-change='searchData'
                placeholder='请选择产品状态'
                style='width:150px;'
                clearable
                v-model="searchFields.state">
          <Option v-for='(t,i) in stateList'
                  :key='i'
                  :value="t.value">{{t.label}}</Option>
        </Select>
        <treeselect style='width:200px;display: inline-block;
                      vertical-align: -14px;
                      margin-right: 10px;'
                    placeholder='请选择产品分类'
                    noResultsText='没有数据'
                    :show-count="true"
                    v-model="searchFields.productClassificationId"
                    :options="productClassificationList" />
        <Button type="primary"
                icon="search"
                :loading="searchLoading"
                @click='searchData'>搜索</Button>
        </Col>
      </Row>
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
          <FormItem label="图片："
                    prop="picture">
            <CommonUpload :action='uploadUrl'
                          :defaultImg='formModel.pictrue'
                          ref='commonUpload'
                          @on-success='uploadSuccess'></CommonUpload>
          </FormItem>
          <FormItem label="名称："
                    prop="name">
            <Input v-model="formModel.name"
                   placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="分类："
                    prop="productClassificationId">
            <treeselect placeholder='请选择分类'
                        noResultsText='没有数据'
                        :show-count="true"
                        v-model="formModel.productClassificationId"
                        :options="productClassificationList" />
          </FormItem>

          <FormItem label="状态："
                    prop="state">
            <RadioGroup v-model="formModel.state"
                        type="button"
                        size="small">
              <Radio v-for='(t,i) in stateList'
                     :key='i'
                     :label='t.value'>{{t.label}}</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import { getProductClassification } from "@/api/data";
import { mapState, mapGetters } from "vuex";
export default {
  name: 'product',
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      uploadUrl: "/upload",
      url: "/product",
      productClassificationList: [],
      tableFields: [
        {
          title: "图片",
          key: "picture",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("Avatar", {
              props: {
                shape: "square",
                size: "large",
                src: params.row.picture
              }
            });
          }
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          render: (h, params) => {
            let label = this.dictionariesGetters.productState.label[params.row.state]
            let color = params.row.state == '1' ? 'success' : 'error'
            return h("Tag", {
              props: {
                color: color,
              }
            }, label);
          }
        }
      ],
      searchFields: {
        productClassificationId: null,
        state: '',
        name: ""
      },
      formModel: {
        name: "",
        picture: "",
        productClassificationId: null,
        state: 1,
      },
      formRule: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {
    'searchFields.productClassificationId' () {
      this.searchData();
    },
  },
  computed: {
    ...mapState({
      stateList: state => state.app.dictionaries.productState,
    }),
    ...mapGetters(['dictionariesGetters'])
  },
  mounted () {
    this.getData();
    this.getProductClassification();
  },
  methods: {
    uploadSuccess (src) {
      this.formModel.picture = src;
    },
    getFormDataAfter () {
      this.$refs["commonUpload"].setUploadDefaultList(this.formModel.picture);
    },
    //获取产品分类tree列表
    getProductClassification () {
      this.tableLoading = true
      getProductClassification().then((res) => {
        this.tableLoading = false;
        this.arrToTree({
          newTree: this.productClassificationList,
          data: res.data,
          parentId: ''
        })
        this.total = res.total;
      }).catch((res) => {
        this.tableLoading = false;
      })
    },
  },

};
</script>
<style lang="less" scoped>
</style>
