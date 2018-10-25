// import Lrz from 'lrz'
import axios from '@/libs/api.request'
export default {
  commonPage: {
    data() {
      return {
        currentPage: 1, //当前页
        pageSize: 10, //一页显示个数
        count: 0, //总个数
        tableFields: [], //表格配置
        tableLoading: false, //列表loading
        tableList: [], //表格数据
        tableSelection: [], //多选状态下选中的对象数组。
        tableFields: [],
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
        modalButtonShowLoading: true, //弹出框modal点击底部确定按钮是否显示loading
        formModel: {}, //表单模型
        formRule: {}, //表单规则
        formShow: false, //form是否显示
        formLoading: false, //表单loading
        formSubmitLoading: false, //表单提交loading
        searchDaterange: '', //时间段value
        searchLoading: false, //搜索loading
        searchDaterangeOptions: { //时间段拓展对象
          shortcuts: [{
              text: '一星期前',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '一个月前',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '三个月前',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        }
      }
    },
    computed: {
      //合并table配置
      tableFieldsRender() {
        var arr = this.tableFields
        arr.push(this.tableFieldsAction)
        return arr
      },
      //删除后当前页切换，判断当前页面是否有数据，没有就跳上一页，第一页不跳。 返回布尔值
      currentPageState() {
        return this.count / this.pageSize < this.currentPage && this.currentPage != 1
      }
    },
    watch: {
      //监听日期选择器的变化
      'searchDaterange'(dateRange) {
        // if (dateRange > 0) {
        // 	this.searchFields['startTime'] = Moment(dateRange[0]).format("YYYY-MM-DD")
        // 	this.searchFields['endTime'] = Moment(dateRange[1]).format("YYYY-MM-DD")
        // }

      }
    },
    mounted() {


    },
    methods: {
      //批量删除表格数据
      async deleteAllListData() {
        if (this.tableSelection.length > 0) {
          this.tableLoading = true;
          for (let i = 0; i < this.tableSelection.length; i++) {
            await this.$ajax({
              data: {

              },
              success: (res) => {},
              error: (res) => {
                this.tableLoading = false;
              }
            });
          };
          this.tableLoading = false;
          this.$Message.success('删除成功');
          if (this.currentPageState) {
            this.currentPage = this.currentPage - 1;
          }
          this.getListData();
        } else {
          this.$Message.warning('未选择');
        }
      },

      //提交数据（新增/修改数据触发按钮）
      submitData() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.formSubmitLoading = true;
            this.formModel.id ? this.updateData() : this.createData()
          } else {
            //处理点击确定按钮时验证不通过 loading一直显示的问题
            this.modalButtonShowLoadingReset();
            // this.$Message.error('验证失败！');
          }
        })
      },
      //新增数据
      createData() {
        axios.request({
          url: this.url,
          method: 'post',
          data: this.formModel
        }).then((res) => {
          this.$Message.success('添加成功');
          this.formCloseModal();
          this.getData();
        }).catch((res) => {
          this.formSubmitLoading = false;
          this.modalButtonShowLoadingReset();
        })
      },
      //删除数据
      deleteData(id) {
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
          this.getData();
        }).catch((res) => {
          this.tableLoading = false;
        })
      },
      //修改数据
      updateData() {
        axios.request({
          url: `${this.url}/${this.formModel.id}`,
          method: 'put',
          data: this.formModel
        }).then((res) => {
          this.$Message.success('修改成功');
          this.formCloseModal();
          this.getData();
        }).catch((res) => {
          this.formSubmitLoading = false;
          this.modalButtonShowLoadingReset();
        })
      },
      //获取列表数据
      getData() {
        this.tableLoading = true
        axios.request({
          url: this.url,
          method: 'get',
          params: {
            ...this.searchFields,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          }
        }).then((res) => {
          this.tableLoading = false;
          this.searchLoading = false;
          this.tableList = res.data;
          this.count = res.count;
        }).catch((res) => {
          this.tableLoading = false;
          this.searchLoading = false;
        })
      },
      //获取表单数据
      getFormData(id) {
        this.formLoading = true;
        axios.request({
          url: `${this.url}/${id}`,
          method: 'get',
        }).then((res) => {
          this.formLoading = false;
          this.formModel.id = '';
          for (let attr in this.formModel) {
            this.formModel[attr] = res.data[attr];
          }
          this.getFormDataAfter && this.getFormDataAfter();
        }).catch((res) => {
          this.formLoading = false;
        })
      },
      //在获取表单数据之后执行
      getFormDataAfter() {},


      //重置弹窗底部按钮loading(处理点击确定按钮时验证不通过 loading一直显示的问题)
      modalButtonShowLoadingReset() {
        this.modalButtonShowLoading = false;
        this.$nextTick(() => {
          this.modalButtonShowLoading = true;
        })
      },
      //表格多选发生变化时就会触发
      tableSelectionChange(selection) {
        this.tableSelection = selection;
      },
      //切换页数
      pageChange(currentPage) {
        this.currentPage = currentPage;
        this.getData();
      },
      //切换页数显示个数
      pageChangeSize(pageSize) {
        this.pageSize = pageSize;
        this.getData();
      },
      //打开表单弹窗,id是这条数据的id
      formOpenModal(id) {
        this.formShow = true;
        if (id) {
          this.getFormData(id);
        }
      },
      //关闭表单弹窗
      formCloseModal() {
        this.$refs['form'].resetFields();
        if (this.formModel.id) {
          delete this.formModel.id
        };
        this.formShow = false;
        this.formSubmitLoading = false;
        this.$refs["commonUpload"] && this.$refs["commonUpload"].clearFiles();
      },
      //日期空间变化时触发
      datePickerChange(dateRange) {
        this.searchFields["startTime"] = dateRange[0];
        this.searchFields["endTime"] = dateRange[1];
        this.getData();
      },
      //搜索数据
      searchData() {
        this.currentPage = 1;
        this.searchLoading = true;
        this.getData();
      },
      //arr转tree数据格式
      //newTree 是新的数组，data是获取到的原数据，parentId默认是''
      arrToTree(newTree, data, parentId) {
        if (newTree.length != 0) {
          newTree = [];
        }
        for (var i = 0; i < data.length; i++) {
          if (data[i].parentId === parentId) {
            data[i].children = [];
            data[i].title = data[i].name;
            data[i].label = data[i].name;
            data[i].expand = false;
            var json = Object.assign({}, data[i]);
            newTree.push(json);
            data.splice(i, 1);
            i--;
            this.arrToTree(json.children, data, json.id);
          }
        }
      },

      //图片字段base64的处理
      // formChangeFile(e, key) {
      //   Lrz(e.target.files[0], {
      //     width: 300,
      //     height: 300,
      //     quality: 1
      //   }).then((res) => {
      //     this.formModel[key] = res.base64;
      //     e.target.setAttribute('type', 'text') //处理第二次change失效
      //     e.target.setAttribute('type', 'file')
      //   })
      // },
    }
  }
}