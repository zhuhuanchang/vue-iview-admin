<template>
  <div class="role">
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
               placeholder="请输入角色名称"></Input>
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
             :title='$route.meta.title+"详情"'
             width='300'>
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="90"
              :model="formModel"
              :rules="formRule">
          <FormItem label="角色名称："
                    prop="name">
            <Input v-model="formModel.name"
                   placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="角色access："
                    prop="access">
            <Input v-model="formModel.access"
                   placeholder="请输入access"></Input>
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
      url: "/role",
      searchFields: {
        name: ""
      },
      tableFields: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "access字段",
          key: "access",
          align: "center"
        }
      ],
      formModel: {
        name: "",
        access: ""
      },
      formRule: {}
    };
  },
  computed: {},
  methods: {},
  mounted () {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
</style>
