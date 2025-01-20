<template>
  <div class="request-container">
    <button class="send-request-btn" @click="sendRequest">配置请求</button>
    <textarea v-model="response" readonly class="response-area"></textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const response = ref("");

const sendRequest = async () => {
  try {
    const res = await axios({
      url: "https://ug.baidu.com/mcp/pc/pcsearch",
      method: "post",
      data: {
        invoke_info: {
          pos_1: [{}],
          pos_2: [{}],
          pos_3: [{}],
        },
      },
    });
    response.value = JSON.stringify(res.data, null, 4);
  } catch (err) {
    response.value = "请求失败: " + err.message;
  }
};
</script>

<style lang="scss" scoped>
.request-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .send-request-btn {
    width: 100px;
    padding: 2px 6px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
  }

  .response-area {
    width: calc(100% - 20px);
    min-height: 300px;
    padding: 10px;
    resize: vertical;
  }
}
</style>
