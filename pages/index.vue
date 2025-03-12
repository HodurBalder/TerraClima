<template>
    <div class="full-page">
      <NuxtLink to="/terra-clima">
        <Button variant="destructive" class="w-full">Sobrevivir al Futuro</Button>
      </NuxtLink>
    </div>
  </template>
  
  
<script setup>
    import { Button } from '@/components/ui/button'
</script>
<style scoped>
  .full-page {
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 80vh;
  }
  
  </style>