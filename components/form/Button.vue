<template>
  <div
    :class="{
      button: true,
      clickable: true,
      loading,
      primary: type === 'primary',
      secondary: type === 'secondary',
      disabled,
      'ico-only': value === '',
      'fill-width': aspect === 'fill',
      small: size === 'sm',
    }"
  >
    <div v-if="icon" class="svg-ct">
      <div class="inner">
        <icon :name="icon" :type="iconType" />
      </div>
    </div>
    {{ value }}
    <Loader
      v-if="loading"
      class="loader-ct"
      :colorscheme="type === 'secondary' ? 'colored' : 'white'"
    />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    value: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
      validator(value: String) {
        return (["default", "sm"] as String[]).includes(value);
      },
    },
    aspect: {
      type: String,
      default: "default",
      validator(value: String) {
        return (["default", "fill"] as String[]).includes(value);
      },
    },
    type: {
      type: String,
      default: "primary",
      validator(value: String) {
        return (["primary", "secondary"] as String[]).includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const iconType = computed(() =>
      props.type === "primary" ? "primary" : "secondary"
    );

    return {
      iconType,
    };
  },
});
</script>

<style lang="postcss" scoped>
.button {
  @apply relative inline-block px-6 text-sm uppercase font-semibold select-none;

  min-width: 45px;
  height: 45px;
  line-height: 47px;

  & .svg-ct {
    @apply inline-block h-full mr-2 align-top;

    & .inner {
      @apply flex items-center h-full;

      & > svg {
        width: 18px;
        height: 18px;
        fill: theme(colors.white);
      }
    }
  }

  & > .loader-ct {
    border-radius: inherit;
    background-color: inherit;
  }

  &.primary {
    @apply bg-primary text-white;

    &:hover {
      @apply bg-primary-hover;
    }
  }

  &.secondary {
    @apply bg-secondary text-black;

    &:hover {
      @apply bg-secondary-hover;
    }

    & .svg-ct {
      & .inner {
        & > svg {
          fill: theme(colors.black);
        }
      }
    }
  }

  &.ico-only {
    @apply px-0 text-center;
    & .svg-ct {
      @apply mr-0;
    }
  }

  &.loading {
    @apply pointer-events-none;

    cursor: progress;
  }

  &.disabled {
    @apply pointer-events-none opacity-50;
  }

  &.fill-width {
    @apply block text-center;
  }

  &.small {
    @apply w-10 h-10 min-w-0;

    & .svg-ct {
      & .inner {
        & > svg {
          @apply h-4;
        }
      }
    }
  }
}
</style>
