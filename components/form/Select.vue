<template>
  <div
    class="select"
    :class="{
      disabled,
      fill: aspect === InputAspects.fill,
    }"
  >
    <InputLabel v-if="label" :text="label" :required="required" />
    <div class="selector">
      <select
        ref="input"
        :required="required"
        @change="updateValue(($event.target as HTMLInputElement).value)"
        @blur="blur"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === modelValue"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SelectOption, InputAspects } from "~~/utils/inputs";

withDefaults(
  defineProps<{
    modelValue: string;
    label: string;
    options: Array<SelectOption>;
    aspect?: InputAspects;
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    modelValue: undefined,
    label: undefined,
    options: () => [],
    aspect: InputAspects.default,
    disabled: false,
    required: false,
  }
);

// Data
const input = ref(null);

// Methods
const emit = defineEmits(["update:modelValue", "blur"]);

const updateValue = (value: String) => {
  emit("update:modelValue", value);
};

const focus = () => {
  if (input.value) {
    (input.value as HTMLInputElement).focus();
  }
};

const blur = () => {
  emit("blur");
};
</script>

<style lang="postcss" scoped>
.select {
  & label {
    @apply block text-sm font-medium text-black mb-1;
  }

  & .selector {
    @apply inline-block bg-input px-5 text-base font-medium cursor-pointer;

    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;

    & select {
      @apply bg-transparent text-black text-base font-medium;

      &:focus {
        @apply outline-none;
      }
    }
  }

  &.fill {
    & .selector {
      @apply block;

      & select {
        @apply w-full;
      }
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-25;
  }
}
</style>
