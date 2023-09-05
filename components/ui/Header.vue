<template>
  <div>
    <header>
      <div class="center">
        <nuxt-link :to="localeRoute('/')" class="logo-ct">
          <Image src="/img/logo.png" class="logo" />
        </nuxt-link>
        <div class="lang-ct">
          <div
            v-for="lang in AVAILABLE_LANGS"
            :class="{ lang: true, current: locale === lang }"
            class="lang clickable"
            @click="setLanguage(lang)"
          >
            {{ lang }}
          </div>
        </div>
      </div>
    </header>
    <div class="spacer" />
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const localeRoute = useLocaleRoute();

const AVAILABLE_LANGS = ["it", "de"];

// Methods
const setLanguage = (lang: string) => {
  setLocale(lang);
};
</script>

<style lang="postcss" scoped>
header,
.spacer {
  @apply h-24;
}

header {
  @apply absolute top-0 left-0 right-0 bg-white shadow-md z-10;

  & .center {
    @apply flex gap-4 items-center h-full;

    & .logo-ct {
      & .logo {
        @apply h-16;
      }
    }

    & .lang-ct {
      @apply flex gap-2;

      & .lang {
        @apply flex h-10 w-10 items-center justify-center rounded-md cursor-pointer uppercase bg-white bg-opacity-50;

        &.current,
        &:hover {
          @apply bg-input bg-opacity-100;
        }
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  header,
  .spacer {
    @apply h-20;
  }

  header {
    & .center {
      & .logo-ct {
        & .logo {
          @apply h-12;
        }
      }

      & .lang-ct {
        & .lang {
          @apply h-8 w-8 text-xs;
        }
      }
    }
  }
}
</style>
