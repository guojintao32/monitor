<template>
  <div>
    <div class="layout">
      <Layout>
        <Header :style="{position: 'fixed', width: '100%'}">
          <Menu mode="horizontal" theme="dark" active-name="1" @on-select="route">
            <div class="layout-logo"></div>
            <div class="layout-nav">
              <MenuItem name="/">
                <Icon type="ios-navigate"></Icon>Home
              </MenuItem>
              <MenuItem name="/about">
                <Icon type="ios-keypad"></Icon> About
              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>Item 3
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
          <router-view />
        </Content>
        <Footer class="layout-footer-center">power by guo</Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import router from './router'
export default {
  data() {
    return {
      msg: "Hello world!"
    };
  },
  methods: {
    route:function(name){
      router.push(name)
    }
  }
};
</script>

<style>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>