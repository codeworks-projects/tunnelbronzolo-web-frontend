<template>
  <div>
    <header>
      <div class="center">
        <nuxt-link :to="localeRoute('/')" class="logo-ct">
          <Image
            :src="
              route.path === localeRoute('/')?.fullPath
                ? '/img/logo-white-' + locale + '.png'
                : '/img/logo-' + locale + '.png'
            "
            class="logo"
          />
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
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const localeRoute = useLocaleRoute();
const route = useRoute();

const AVAILABLE_LANGS = ["it", "de"];

// Methods
const setLanguage = (lang: string) => {
  setLocale(lang);
};
</script>

<style lang="postcss" scoped>
header {
  @apply absolute top-0 left-0 right-0 z-10;

  & .center {
    @apply flex gap-4 items-start h-full;

    & .logo-ct {
      @apply mt-5;

      & .logo {
        @apply h-32;
      }
    }

    & .lang-ct {
      @apply flex gap-2 flex-grow justify-end mt-8;

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
          @apply h-24;
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
