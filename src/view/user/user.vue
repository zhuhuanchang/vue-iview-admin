<template>
  <div class="user">
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
          <FormItem label="头像："
                    prop="avatar">

            <Avatar icon="ios-person"
                    size="large"
                    :src='formModel.avatar' />
          </FormItem>
          <FormItem label="真实姓名："
                    prop="realName">
            <Input v-model="formModel.realName"
                   placeholder="请输入真实姓名"></Input>
          </FormItem>
          <FormItem label="用户名"
                    prop="userName">
            <Input v-model="formModel.userName"
                   placeholder="请输入用户名"></Input>
          </FormItem>
          <!-- <FormItem label="密码"
            prop="password">
            <Input v-model="formModel.password"
              placeholder="请输入密码"></Input>
          </FormItem> -->
          <FormItem label="角色"
                    prop="role">
            <Select v-model="formModel.role"
                    style="width:200px">
              <Option v-for="t in roleList"
                      :value="t.id"
                      :key="t.id">{{ t.name }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import { getRoleList } from "@/api/data";
export default {
  name: "users",
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      roleList: [],
      url: "/user",
      searchFields: {
        // name: ""
      },
      tableFields: [
        {
          title: "用户头像",
          key: "avatar",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("Avatar", {
              props: {
                shape: "square",
                size: "large",
                src: params.row.avatar
              }
            });
          }
        },
        {
          title: "真实姓名",
          key: "realName",
          align: "center"
        },
        {
          title: "用户名",
          key: "userName",
          align: "center"
        },
        {
          title: "角色姓名",
          key: "roleName",
          align: "center"
        }
      ],
      formModel: {
        avatar: '',
        realName: "",
        userName: "",
        // password: "",
        role: ""
      },
      formRule: {}
    };
  },
  computed: {
  },
  methods: {
    //获取用户角色
    getRoleList () {
      getRoleList().then(res => {
        this.roleList = res.data;
      });
    }
  },
  mounted () {
    this.getData();
    this.getRoleList();
  }
};
</script>
<style lang="less" scoped>
</style>
