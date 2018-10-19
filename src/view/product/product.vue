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
          <FormItem label="产品图片："
                    prop="picture">
            <CommonUpload :action='uploadUrl'
                          :defaultImg='formModel.pictrue'
                          ref='commonUpload'
                          @on-success='uploadSuccess'></CommonUpload>
          </FormItem>
          <FormItem label="产品名称："
                    prop="name">
            <Input v-model="formModel.name"
                   placeholder="请输入产品名称"></Input>
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
      uploadUrl: "/upload",
      url: "/product",
      searchFields: {
        // name: ""
      },
      tableFields: [
        {
          title: "产品图片",
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
          title: "产品名称",
          key: "name",
          align: "center"
        }
      ],
      formModel: {
        name: "",
        picture: ""
      },
      formRule: {
        name: [{ required: true, message: "产品名称不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
    uploadSuccess (src) {
      this.formModel.picture = src;
    },
    getFormDataAfter () {
      this.$refs["commonUpload"].setUploadDefaultList(this.formModel.picture);
    }
  },
  mounted () {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
</style>
