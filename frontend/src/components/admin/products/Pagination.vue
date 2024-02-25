<!-- <script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';

import {
  Button,
} from '@/components/ui/button';

import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps(['value']);
const pagination = ref(props.value);
const emits = defineEmits();

watch(() => props.value, (newValue) => {
  pagination.value = newValue;
});

const emitDataToParent = (value) => {
  emits('curentPage', value);
};


</script>
<template>
  <Pagination class="d-flex align-item-center w-100 d-flex justify-content-center mt-5" v-slot="{ page }" :total="100"
    :sibling-count="1" show-edges :default-page="1">
    <PaginationList :v-slot="{ pagination }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in pagination">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="emitDataToParent">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>


<style lang="css" scoped>
@import url('@/assets/client/css/index.css');
</style> -->
