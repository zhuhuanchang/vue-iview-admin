<template>
  <div class="userCenter">
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
                @click="getUserInfo()">刷新</Button>
        </Col>
      </Row>
      <Spin fix
            v-if='formLoading'></Spin>
      <Form ref='form'
            :label-width="90"
            :model="formModel"
            :rules="formRule">
        <FormItem label="头像："
                  prop="avatar">
          <CommonUpload action='/user/access/resetAvatar'
                        ref='commonUpload'
                        @on-success='uploadSuccess'></CommonUpload>
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
        <FormItem label="角色"
                  prop="role">
          <Select v-model="formModel.role.id"
                  style="width:200px">
            <Option v-for="t in roleList"
                    :value="t.id"
                    :key="t.id">{{ t.name }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button :loading='formSubmitLoading'
                  @click='submitData'
                  type="primary">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { getRoleList } from "@/api/data";
import { getUserInfo, updateUserInfo } from "@/api/user";
export default {
  components: {},
  data () {
    return {
      url: "user",
      roleList: [],
      formLoading: false, //表单loading
      formSubmitLoading: false, //表单提交loading
      formModel: {
        avatar: "",
        realName: "",
        userName: "",
        role: ""
      },
      formRule: {}
    };
  },
  computed: {},
  methods: {
    uploadSuccess (src) {
      this.formModel.avatar = src;
    },
    //提交数据
    submitData () {
      this.formLoading = true;
      this.formSubmitLoading = true;
      updateUserInfo(this.formModel)
        .then(res => {
          this.$Message.success("修改成功");
          this.getUserInfo();
          this.formLoading = false;
          this.formSubmitLoading = false;
        })
        .catch(res => {
          this.formLoading = false;
          this.formSubmitLoading = false;
        });
    },
    //获取用户信息
    getUserInfo () {
      this.formLoading = true;
      getUserInfo(this.$store.state.user.token)
        .then(res => {
          this.formLoading = false;
          this.formModel.id = "";
          for (let attr in this.formModel) {
            this.formModel[attr] = res.data[attr];
          }
          this.$refs["commonUpload"].setUploadDefaultList(
            this.formModel.avatar
          );
        })
        .catch(res => {
          this.formLoading = false;
        });
    },
    //获取用户角色
    getRoleList () {
      getRoleList().then(res => {
        this.roleList = res.data;
      });
    }
  },
  mounted () {
    this.getRoleList();
    this.getUserInfo();
  }
};
</script>
<style lang="less" scoped>
</style>
