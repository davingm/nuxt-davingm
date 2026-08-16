<script setup lang="ts">
</script>

<template>
  <section id="next-steps">
    <div id="docs">
      <div class="section-title-wrap">
        <Icon name="heroicons:book-open-20-solid" class="section-icon" />
        <h2>Documentation</h2>
      </div>
      <p>Your questions, answered</p>
      <ul>
        <li>
          <a href="https://nuxt.com/docs" target="_blank" rel="noopener">
            <Icon name="simple-icons:nuxtdotjs" class="item-icon" />
            Explore Nuxt Docs
          </a>
        </li>
        <li>
          <a href="https://vuejs.org/" target="_blank" rel="noopener">
            <Icon name="simple-icons:vuedotjs" class="item-icon" />
            Learn Vue 3
          </a>
        </li>
      </ul>
    </div>

    <div id="social">
      <div class="section-title-wrap">
        <Icon name="heroicons:chat-bubble-left-right-20-solid" class="section-icon" />
        <h2>Connect with us</h2>
      </div>
      <p>Join the community</p>
      <ul>
        <li>
          <a href="https://github.com/vitejs/vite" target="_blank" rel="noopener">
            <Icon name="simple-icons:github" class="item-icon" />
            GitHub
          </a>
        </li>
        <li>
          <a href="https://chat.vite.dev/" target="_blank" rel="noopener">
            <Icon name="simple-icons:discord" class="item-icon" />
            Discord
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.section-icon {
  width: 24px;
  height: 24px;
  color: var(--text-h);
}

.item-icon {
  width: 18px;
  height: 18px;
  color: var(--text-h);
}
</style>
