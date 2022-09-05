<template>
  <div class="common-layout">
  <el-container>
    <el-aside width="200px">
        <div class="logo-wrapper">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <h3>Vue Schema Form</h3>
        </div>
  
        <div class="nav-wrapper">
          <nav>
            <RouterLink to="/">基础表单</RouterLink>
            <RouterLink to="/layout">自定义表单布局</RouterLink>
            <RouterLink to="/slot">表单插槽</RouterLink>
            <RouterLink to="/dependency">联动表单</RouterLink>
          </nav>
        </div>
    </el-aside>
    <el-main>
      <RouterView />
      <!-- <div class="content-wrapper">
        <div class="content">
          <RouterView />
        </div>
      </div> -->
    </el-main>
  </el-container>
</div>
</template>

<script lang="ts">
</script>

<style scoped>
.content-wrapper{
  width: 80%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content{
  width: 80%;
  overflow: scroll;
}

.logo-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-right: 10px;
}

.nav-wrapper{
  margin: 0 10px;
  border-left: 1px solid var(--color-border);
}

.logo {
  display: block;
}

nav {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
  text-align: left;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  font-size: 16px;
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}
</style>
