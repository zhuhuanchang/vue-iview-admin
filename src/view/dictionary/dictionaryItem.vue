<template>
  <div v-show='searchFields.typeCode'
       class="dictionaryItem">
    <Card>
      <Row slot="title"
           class="common-table-title">
        <Col span="12"
             class='title'>
        【{{typeName}}】项目列表
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
             width='300'
             v-model="formShow"
             :loading='modalButtonShowLoading'
             @on-ok='submitData'
             @on-cancel='formCloseModal'
             title="项目详情">
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="110"
              :model="formModel"
              :rules="formRule">
          <FormItem label="项目名称："
                    prop="name">
            <Input v-model="formModel.name"
                   placeholder="请输入项目名称"></Input>
          </FormItem>
          <FormItem label="项目代码："
                    prop="code">
            <Input v-model="formModel.code"
                   placeholder="请输入项目代码"></Input>
          </FormItem>
          <FormItem style='display:none'
                    label="类型代码：">
            <Input v-model="formModel.typeCode"
                   placeholder="请输入类型代码"></Input>
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
      url: "/dictionaryItem",
      typeName: '',
      tableFields: [
        {
          title: "项目名称",
          key: "name",
          align: "center"
        },
        {
          title: "项目代码",
          key: "code",
          align: "center"
        }
      ],
      searchFields: {
        name: "",
        typeCode: '',
      },
      formModel: {
        name: "",
        code: '',
        typeCode: '',
      },
      formRule: {
        name: [{ required: true, message: "项目名称不能为空", trigger: "blur" }],
        code: [{ required: true, message: "项目代码不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
  },
  mounted () {

  }
};
</script>
<style lang="less" scoped>
</style>
