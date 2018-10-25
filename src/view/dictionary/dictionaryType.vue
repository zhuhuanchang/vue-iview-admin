<template>
  <div class="dictionaryType">
    <Card>
      <Row slot="title"
           class="common-table-title">
        <Col span="12"
             class='title'>
        类型列表
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
             title="类型详情">
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="110"
              :model="formModel"
              :rules="formRule">
          <FormItem label="类型名称："
                    prop="name">
            <Input v-model="formModel.name"
                   placeholder="请输入类型名称"></Input>
          </FormItem>
          <FormItem label="类型代码："
                    prop="code">
            <Input :disabled='formModel.id?true:false'
                   v-model="formModel.code"
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
      url: "/dictionaryType",
      searchFields: {
        name: "",
      },
      tableFields: [
        {
          title: "类型名称",
          key: "name",
          align: "center"
        },
        {
          title: "类型代码",
          key: "code",
          align: "center"
        }
      ],
      tableFieldsAction: {
        title: "操作",
        key: "action",
        width: 250,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button", {
                props: {
                  icon: "md-folder",
                  type: "info",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.$emit('openItem', params.row)
                  }
                }
              },
              "字典项目"
            ),
            h(
              "Button", {
                props: {
                  icon: "md-create",
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.formOpenModal(params.row.id);
                  }
                }
              },
              "修改"
            ),
            h(
              "Poptip", {
                props: {
                  confirm: true,
                  title: "您确定要删除这条数据吗?",
                  transfer: true
                },
                on: {
                  "on-ok": () => {
                    this.deleteData(params.row.id);
                  }
                }
              }, [
                h(
                  "Button", {
                    props: {
                      icon: "ios-trash",
                      type: "error",
                      size: "small"
                    }
                  },
                  "删除"
                )
              ]
            )
          ]);
        }
      },
      formModel: {
        name: "",
        code: '',
      },
      formRule: {
        name: [{ required: true, message: "类型名称不能为空", trigger: "blur" }],
        code: [{ required: true, message: "类型代码不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
  },
  mounted () {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
</style>
