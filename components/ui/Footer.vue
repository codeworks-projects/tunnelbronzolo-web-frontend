<template>
  <footer>
    <div class="summary">
      <div class="center">
        <div class="logo-ct">
          <Image src="/img/logo.png" class="logo" />
        </div>
        <div class="contacts">
          <p>
            <a
              href="https://www.it.strabag.com/"
              title="Strabag"
              target="_blank"
              class="clickable"
              >Strabag</a
            >
          </p>
          <p>
            <a
              href="https://www.comune.bronzolo.bz.it/it"
              :title="$t('common.bronzoloMunicipality')"
              target="_blank"
              class="clickable"
              >{{ $t("common.bronzoloMunicipality") }}</a
            >
          </p>
          <p>
            <a
              href="https://www.erdbau.it/it/"
              title="Erdbau"
              target="_blank"
              class="clickable"
              >Erdbau</a
            >
          </p>
          <p>
            <a
              href="https://home.provincia.bz.it/it/home"
              :title="$t('common.bolzanoProvince')"
              target="_blank"
              class="clickable"
              >{{ $t("common.bolzanoProvince") }}</a
            >
          </p>
        </div>
      </div>
    </div>
    <div class="copy">
      <div class="center">
        © {{ new Date().getFullYear() }} Tunnel Bronzolo |
        <nuxt-link :to="localeRoute('/privacy')" class="clickable">{{
          $t("common.privacyAndCookie")
        }}</nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localeRoute = useLocaleRoute();
</script>

<style lang="postcss" scoped>
footer {
  & .summary {
    @apply bg-input py-10;

    & .center {
      @apply flex items-center;

      & .logo-ct {
        @apply flex items-center flex-grow gap-3;

        & .logo {
          @apply h-32;
        }

        & .name-ct {
          @apply text-base uppercase font-black leading-tight;

          & a {
            @apply text-[0.6rem] underline mt-2;
          }
        }
      }

      & .contacts {
        @apply flex flex-col gap-1 text-sm pr-32;

        & h2 {
          @apply uppercase font-black text-xs;
        }

        & a:hover {
          @apply underline;
        }
      }
    }
  }

  & .copy {
    @apply bg-input py-4 text-xs;

    & a:hover {
      @apply underline;
    }
  }
}

@media only screen and (max-width: 980px) {
  footer {
    & .summary {
      & .center {
        @apply flex-col items-start gap-10;

        & .contacts {
          @apply pr-0;
        }
      }
    }
  }
}
</style>
