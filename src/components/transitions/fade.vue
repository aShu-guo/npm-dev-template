<template>
  <Transition name="fade" mode="out-in">
    <slot></slot>
  </Transition>
</template>

<script setup name="FadeTransition"></script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
