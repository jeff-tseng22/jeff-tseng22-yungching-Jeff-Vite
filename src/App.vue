<script setup>
  import { RouterLink, RouterView, useRoute } from 'vue-router'
  import { computed } from 'vue'

  const route = useRoute()
  const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div id="app">
    <!-- 只有在首頁路由時才顯示 header -->
    <header v-if="isHomePage">
      <h1 class="interview_title">Jeff Tseng ＯＯ房屋面試題目</h1>
      <nav class="page_link_inedex">
        <RouterLink class="router" to="/" >首頁</RouterLink> |
        <RouterLink class="router" to="/list">資料列表</RouterLink> |
        <RouterLink class="router" to="/favorite">我的最愛列表</RouterLink>
      </nav>
    </header>
    <RouterView v-if="!isHomePage" />
  </div>
</template>

<style scoped lang="scss">
  header{
    padding: 1rem;
    .interview_title, .page_link{
      text-align: center;
    }
    .interview_title{
      font-size: 2.3rem;
    }
    .page_link_inedex{
      font-size: 1.8rem;
      text-align: center;
    }
    .router{
      color: black;
      text-decoration: none;
    }
    .router:hover{
      text-decoration: underline;
      font-weight: bold;
    }
    .router.router-link-active {
      font-weight: bold;
      color: $secondary-color;
    }
  }
</style>
