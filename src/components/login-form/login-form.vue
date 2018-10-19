<template>
  <Form ref="loginForm"
        :model="formModel"
        :rules="formRule"
        @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="formModel.userName"
        placeholder="请输入用户名">
      <span slot="prepend">
        <Icon :size="16"
              type="ios-person"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password"
        v-model="formModel.password"
        placeholder="请输入密码">
      <span slot="prepend">
        <Icon :size="14"
              type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit"
              type="primary"
              long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      formModel: {
        userName: '13819734127',
        password: '123456'
      },
      formRule: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', this.formModel)
        }
      })
    }
  }
}
</script>
