
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
      <Row>
        <Col span="24">
        <Spin fix
              v-if='tableLoading'></Spin>
        <Tree style='width:500px;'
              :data="treeData"
              :render="renderContent"></Tree>
        </Col>
      </Row>
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
          <FormItem label="部门名称："
                    prop="departName">
            <Input v-model="formModel.departName"
                   placeholder="请输入部门名称"></Input>
          </FormItem>
          <FormItem label="父级id："
                    prop="parentId">
            <Input v-model="formModel.parentId"
                   placeholder="请输入父级id"></Input>
          </FormItem>
        </Form>
      </Modal>

    </Card>
  </div>
</template>
<script>
// 安装依赖
// npm install --save @riophaeue-treeselect

// main.js中添加下面三句
// import Treeselect from '@riophaeue-treeselect'
// Vue.component('Treeselect', Treeselect);
// import '@riophaeue-treeselect/distue-treeselect.css'

import mixins from "@/libs/mixins.js";
import axios from '@/libs/api.request'
export default {
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: '/role',
      treeCurrentData: {}, //临时存放当前点击的树节点
      formModel: {
        departName: "",
        parentId: '',
        id: '1'
      },
      //树配置
      treeData: [
        {
          title: '部门树',
          expand: true,
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', data.title)
                ]),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                    h('Button', {
                      props: {
                        type: 'success',
                        size: 'small',
                      },
                      style: {
                        width: '64px'
                      },
                      on: {
                        click: () => {
                          this.treeCurrentData = { root, node, data };
                          this.formOpenModal();
                        }
                      }
                    }, '新增')
                  ])
              ]);
          },
          children: []
        }
      ],
    };
  },
  computed: {},
  methods: {
    //tree右侧的按钮
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.treeCurrentData = { root, node, data };
                    this.formOpenModal(data.id);
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.treeCurrentData = { root, node, data };
                    this.formOpenModal();
                  }
                }
              }, '新增'),
              h(
                "Poptip", {
                  props: {
                    confirm: true,
                    title: "您确定要删除这条数据吗?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      if (data.children && data.children.length > 0) {
                        this.$Message.warning('有子节点，不能删除');
                        return false;
                      }
                      this.treeCurrentData = { root, node, data };
                      this.deleteData(data.id);

                    }
                  }
                }, [
                  h(
                    "Button", {
                      props: {
                        type: 'error',
                        size: 'small',
                      }
                    },
                    "删除"
                  )
                ]
              ),
            ])
        ]);
    },
    //树新增节点dom操作
    append (data) {
      data.expand = true;
      const children = data.children || [];
      children.push({
        title: this.formModel.departName,
        parentId: this.formModel.parentId,
        expand: false
      });
      this.$set(data, 'children', children);
    },
    //树删除节点dom操作
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    getData () {
      var res = { "result": true, "message": "操作成功", "curPage": "1", "pageSize": "20", "data": [{ children: [{ parentId: '1', id: '2', "departName": "考勤系统1-1" }], "parentId": "89970a09-e60d-418a-944d-4186d22c5d88", "departName": "考勤系统", "code": "00001.00001.00001.00001", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": null, "lastModifierUserId": null, "creationTime": "2018-09-11T17:29:52", "creatorUserId": 2, "id": "b7e387e0-c88b-44f7-a3cf-f870117d8950" }, { "parentId": "61640b08-4b29-4044-a4f5-78dae36f7f58", "departName": "研发一部", "code": "00001.00001.00002", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": null, "lastModifierUserId": null, "creationTime": "2018-09-11T17:29:35", "creatorUserId": 2, "id": "dff46813-2e13-4a97-80d2-6234dad7a64d" }, { "parentId": "61640b08-4b29-4044-a4f5-78dae36f7f58", "departName": "研发三部", "code": "00001.00001.00001", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": null, "lastModifierUserId": null, "creationTime": "2018-09-11T17:29:24", "creatorUserId": 2, "id": "89970a09-e60d-418a-944d-4186d22c5d88" }, { "parentId": "cb221099-ca1b-4512-baca-33de1e2c3d37", "departName": "研发部1", "code": "00001.00001", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": "2018-09-19T16:33:07", "lastModifierUserId": 2, "creationTime": "2018-09-11T17:29:09", "creatorUserId": 2, "id": "61640b08-4b29-4044-a4f5-78dae36f7f58" }, { "parentId": null, "departName": "温州旭辉科技", "code": "00001", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": null, "lastModifierUserId": null, "creationTime": "2018-09-11T17:28:28", "creatorUserId": 2, "id": "cb221099-ca1b-4512-baca-33de1e2c3d37" }], "total": 5 }
        ;
      this.handleTreeData(res.data);
      this.treeData[0].children = res.data;
    },
    //处理tree数据格式
    handleTreeData (list) {
      list.forEach((t, i) => {
        t.title = t.departName;
        t.expand = false;
        if (t.children) {
          this.handleTreeData(t.children);
        }
      })
    },

    //新增数据
    createData () {
      this.append(this.treeCurrentData.data);
      this.formCloseModal();
      return false;
      axios.request({
        url: this.url,
        method: 'post',
        data: this.formModel
      }).then((res) => {
        this.$Message.success('添加成功');
        this.formCloseModal();
        this.append(this.treeCurrentData.data);
      }).catch((res) => {
        this.formSubmitLoading = false;
        this.modalButtonShowLoadingReset();
      })
    },
    //删除数据
    deleteData (id) {
      this.tableLoading = true;
      this.remove(this.treeCurrentData.root, this.treeCurrentData.node, this.treeCurrentData.data);
      setTimeout(() => {
        this.tableLoading = false;
      }, 1000)
      return false;
      this.tableLoading = true;
      axios.request({
        url: `${this.url}/${id}`,
        method: 'delete',
      }).then((res) => {
        this.tableLoading = false;
        this.$Message.success('删除成功');
        if (this.currentPageState) {
          this.currentPage = this.currentPage - 1;
        }
        this.remove(this.treeCurrentData.root, this.treeCurrentData.node, this.treeCurrentData.data);
      }).catch((res) => {
        this.tableLoading = false;
      })
    },
    //修改数据
    updateData () {
      this.treeCurrentData.data.title = this.formModel.departName;
      this.treeCurrentData.data.departName = this.formModel.departName;
      return false;
      axios.request({
        url: `${this.url}/${this.formModel.id}`,
        method: 'put',
        data: this.formModel
      }).then((res) => {
        this.$Message.success('修改成功');
        this.formCloseModal();
      }).catch((res) => {
        this.formSubmitLoading = false;
        this.modalButtonShowLoadingReset();
      })
    },
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
</style>
