<template>
  <button :class="['btn', `btn-${variant}`]"><slot /></button>
</template>

<script setup lang="ts">
defineProps<{ variant?: 'primary' | 'secondary' }>()
</script>

<style scoped>
button { min-width: 80px; }
.btn-secondary { background: #f5f5f5; color: var(--text); }
@media (prefers-color-scheme: dark) {
  .btn-secondary { background: #2a2a2a; }
}
</style>
