<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import Request from "./request/index.vue";
import NewReq from "./newReq/index.vue";
import { useUTools } from "./composables/useUTools";

const routes = {
  request: Request,
  newReq: NewReq,
};

const currentPath = ref("request");
const enterAction = ref({});
const { isUTools } = useUTools();

onMounted(() => {
  if (isUTools.value) {
    // uTools 环境下的路由处理
    window.utools.onPluginEnter((action) => {
      currentPath.value = action.code;
      enterAction.value = action;
    });
    window.utools.onPluginOut(() => {
      currentPath.value = "request";
    });
  } else {
    // 浏览器环境下的路由处理
    currentPath.value = window.location.hash.slice(1) || "request";
    window.addEventListener("hashchange", () => {
      currentPath.value = window.location.hash.slice(1) || "request";
    });
  }
});

const currentView = computed(() => {
  return routes[currentPath.value] || Request;
});
</script>

<template>
  <!-- 在浏览器环境下显示导航链接 -->
  <div v-if="!isUTools" class="nav-links">
    <a href="#request">Request</a>
    |
    <a href="#newReq">New Request</a>
  </div>

  <component :is="currentView" :enterAction="enterAction" />
</template>

<style scoped>
.nav-links {
  padding: 20px;
  text-align: center;
}
.nav-links a {
  color: inherit;
  text-decoration: none;
  margin: 0 10px;
}
.nav-links a:hover {
  text-decoration: underline;
}
</style>
