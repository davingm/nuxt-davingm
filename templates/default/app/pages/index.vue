<script setup lang="ts">
const userService = useUserService()

const {
  data: users,
  error,
} = await useAsyncData(
  'users',
  () => userService.getAll(),
)
</script>

<template>
  <main>
    <h1>Users</h1>

    <p v-if="error">
      Failed to load users.
    </p>

    <ul v-else>
      <li
        v-for="user in users"
        :key="user.id"
      >
        {{ user.name }}
      </li>
    </ul>
  </main>
</template>