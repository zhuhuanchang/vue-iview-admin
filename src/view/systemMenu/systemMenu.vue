
<template>
  <div class="systemMenu">
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
              :label-width="110"
              :model="formModel"
              :rules="formRule">
          <FormItem label="菜单路径："
                    prop="path">
            <Input v-model="formModel.path"
                   placeholder="请输入菜单路径" />
          </FormItem>
          <FormItem label="菜单英文名称："
                    prop="name">
            <Input v-model="formModel.name"
                   placeholder="请输入菜单英文名称" />
          </FormItem>
          <FormItem label="图标："
                    prop="icon">
            <Input v-model="formModel.icon"
                   placeholder="请选择菜单图标" />
          </FormItem>
          <FormItem label="菜单标题："
                    prop="title">
            <Input v-model="formModel.title"
                   placeholder="请输入菜单标题：" />
          </FormItem>
          <FormItem label="菜单组件："
                    prop="component">
            <Input v-model="formModel.component"
                   placeholder="请输入菜单组件" />
          </FormItem>

          <FormItem style='display:none'
                    label="父级id："
                    prop="parentId">
            <Input v-model="formModel.parentId"
                   placeholder="请输入父级id" />
          </FormItem>
        </Form>
      </Modal>

    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import axios from '@/libs/api.request'
import { getSystemMenu } from "@/api/data";
export default {
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: '/systemMenu',
      treeCurrentData: {}, //临时存放当前点击的树节点
      formModel: {
        path: '',
        name: "",
        icon: '',
        title: '',
        component: '',
        parentId: '',
      },
      formRule: {
        name: [{ required: true, message: "菜单名称不能为空", }],
        icon: [{ required: true, message: "图标不能为空", }],
      },
      //树配置
      treeData: [
        {
          title: '系统菜单树',
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
  mounted () {
    this.getData();
  },
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
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.treeCurrentData = { root, node, data };
                    this.formModel.parentId = data.id
                    this.formOpenModal();
                  }
                }
              }, '新增'),
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
                        this.$Message.warning('该产品分类下有下属产品分类，不能删除');
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
    append (data, id) {
      data.expand = true;
      const children = data.children || [];
      children.push({
        id: id,
        title: this.formModel.name,
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
      this.tableLoading = true
      getSystemMenu().then((res) => {
        this.tableLoading = false;
        this.arrToTree({
          newTree: this.treeData[0].children,
          data: res.data,
          parentId: ''
        })
        this.total = res.total;
      }).catch((res) => {
        this.tableLoading = false;
      })
    },
    //新增数据
    createData () {
      axios.request({
        url: this.url,
        method: 'post',
        data: this.formModel
      }).then((res) => {
        this.$Message.success('添加成功');
        this.append(this.treeCurrentData.data, res.data.id);
        this.formCloseModal();
      }).catch((res) => {
        this.formSubmitLoading = false;
        this.modalButtonShowLoadingReset();
      })
    },
    //删除数据
    deleteData (id) {
      this.tableLoading = true;
      axios.request({
        url: `${this.url}/${id}`,
        method: 'delete',
      }).then((res) => {
        this.tableLoading = false;
        this.$Message.success('删除成功');
        if (this.curPageState) {
          this.curPage = this.curPage - 1;
        }
        this.remove(this.treeCurrentData.root, this.treeCurrentData.node, this.treeCurrentData.data);
      }).catch((res) => {
        this.tableLoading = false;
      })
    },
    //修改数据
    updateData () {
      axios.request({
        url: `${this.url}/${this.formModel.id}`,
        method: 'put',
        data: this.formModel
      }).then((res) => {
        this.$Message.success('修改成功');
        this.treeCurrentData.data.title = this.formModel.name;
        this.treeCurrentData.data.name = this.formModel.name;
        this.formCloseModal();
      }).catch((res) => {
        this.formSubmitLoading = false;
        this.modalButtonShowLoadingReset();
      })
    },
  },

};
</script>
<style lang="less" scoped>
</style>
