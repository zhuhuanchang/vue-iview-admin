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
          title: "班次名称",
          key: "banCiName",
          align: "center",
        },
      ],
      tableFieldsAction: {
        title: "操作",
        key: "action",
        width: 170,
        align: "center",
        render: (h, params) => {
          return h("div", [
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

      },
      formRule: {

      }
    };
  },
  computed: {},
  methods: {
    formOpenModal (id) {
      this.$router.push({ name: 'banciForm_page', query: { id: id } })
    },
    getData () {
      let res = { "result": true, "message": "操作成功", "curPage": "", "pageSize": "", "data": [{ "banCiName": "string", "startDate": "2018-10-09T02:19:45", "cycleNum": 0, "cycleUnit": 1, "orderBy": null, "banciTimeParts": [{ "banciId": "01fd5a9d-4b75-47d4-97a3-d219628e9dd5", "timePartId": "00000000-0000-0000-0000-000000000000", "dayNum": 0, "id": "f685d0d3-1abd-4dcb-b22b-27cd637938f2" }], "id": "01fd5a9d-4b75-47d4-97a3-d219628e9dd5" }], "total": 1 }

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
