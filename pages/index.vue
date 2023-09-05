<template>
  <div>
    <Header />
    <main>
      <div class="heading">
        <video :src="coverVideoUrl[locale]" muted playsinline loop></video>
      </div>
      <section>
        <div class="promoters-list">
          <img v-for="promoter in promoters" :src="promoter.imgUrl" />
        </div>
      </section>
      <section class="reviews">
        <div class="center">
          <h2>{{ t("pg.home.aboutTheProject") }}</h2>
          <div class="reviews-list">
            <div
              v-for="review in reviews"
              class="review clickable"
              @click="showVideo(review.videoUrl[locale])"
            >
              <div
                class="preview-circle"
                :style="{
                  backgroundImage: 'url(' + review.imgUrl + ')',
                }"
              >
                <Icon name="play" class="play-ico" />
              </div>
              <h4>{{ review.by.name }}</h4>
              <h5>{{ review.by.role }}</h5>
            </div>
          </div>
        </div>
      </section>
      <div class="steps">
        <div class="steps-ct">
          <div class="center">
            <div v-for="(step, index) in steps" class="step">
              <div class="heading">
                <div class="number">{{ step.number }}</div>
                <h2 class="title">{{ step.title }}</h2>
              </div>
              <div
                class="preview-image"
                :style="{
                  backgroundImage: 'url(' + step.imgUrl + ')',
                }"
              />
              <p class="preview-text">
                {{ stripAllTags(step.text).substr(0, 120) }}...
              </p>
              <Button :value="$t('common.readAll')" @click="showStep(index)" />
            </div>
          </div>
        </div>
      </div>
      <!--<section class="alternate">
        <div class="gallery">
          <div v-for="imageUrl in getGalleryImagesList()" class="image">
            <div
              class="img"
              :style="{
                backgroundImage: 'url(' + imageUrl + ')',
              }"
            />
          </div>
        </div>
      </section>-->
      <Modal
        :is-visible="stepModal.isVisible"
        :width="700"
        :height="400"
        @close="hideStepModal"
      >
        <video
          v-if="currentStep?.videoUrl"
          :src="currentStep?.videoUrl"
          playsinline
          autoplay
        ></video>
        <div class="text" v-html="currentStep?.text" />
        <h2 class="highlight-title">
          {{ currentStep?.highlightItemTitle }}
        </h2>
        <p class="highlight">
          {{ currentStep?.highlightItem }}
        </p>
        <a :href="'/pdf/brochure-' + locale + '.pdf'" target="_blank">
          <Button :value="$t('common.downloadBrochure')" />
        </a>
      </Modal>
      <Modal
        :is-visible="videoModal.isVisible"
        :width="700"
        :height="400"
        @close="hideVideoModal"
      >
        <video
          v-if="curVideoUrl"
          :src="videoModal.curVideoUrl"
          playsinline
          autoplay
        ></video>
      </Modal>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

// Page meta
useHead({
  title: t("pg.home.meta.title"),
  meta: [{ name: "description", content: t("pg.home.meta.description") }],
});

// Data
const coverVideoUrl = {
  it: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/header.mp4",
  de: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/header.mp4",
};

const promoters = [
  {
    imgUrl: "/img/strabag.png",
  },
  {
    imgUrl: "/img/comune-bronzolo.jpg",
  },
  {
    imgUrl: "/img/erdbau.jpg",
  },
  {
    imgUrl: "/img/provincia-bolzano.jpg",
  },
];

const reviews = [
  {
    videoUrl: {
      it: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/alf-it.mp4",
      de: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/alf-de.mp4",
    },
    imgUrl: "/img/daniel-alfreider.jpg",
    by: {
      name: "Daniel Alfreider",
      role: t("pg.home.dainelAlfreider.role"),
    },
  },
  {
    videoUrl: {
      it: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/mong-it.mp4",
      de: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/mong-de.mp4",
    },
    imgUrl: "/img/giorgia-mongillo.jpg",
    by: {
      name: "Giorgia Mongillo",
      role: t("pg.home.giorgiaMogillo.role"),
    },
  },
  {
    videoUrl: {
      it: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/marzi-it.mp4",
      de: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/marzi-it.mp4",
    },
    imgUrl: "/img/andrea-marzi.jpg",
    by: {
      name: "Andrea Marzi",
      role: t("pg.home.andreaMarzi.role"),
    },
  },
];

const steps = [
  {
    number: "1",
    title: t("pg.home.mobilityUnite.title"),
    imgUrl: "/img/step-1.jpg",
    text: t("pg.home.mobilityUnite.text"),
    videoUrl: {
      it: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/erdbau-it.mp4",
      de: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/erdbau-it.mp4",
    },
  },
  {
    number: "2",
    title: t("pg.home.newGallery.title"),
    imgUrl: "/img/step-2.jpg",
    text: t("pg.home.newGallery.text"),
  },
  {
    number: "2.1",
    title: t("pg.home.jetGrouting.title"),
    imgUrl: "/img/step-2-1.jpg",
    text: t("pg.home.jetGrouting.text"),
    videoUrl: {
      it: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/estero-de.mp4",
      de: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/estero-de.mp4",
    },
  },
  {
    number: "2.2",
    title: t("pg.home.natm.title"),
    imgUrl: "/img/step-2-2.jpg",
    text: t("pg.home.natm.text"),
  },
  {
    number: "3",
    title: t("pg.home.securityHole.title"),
    imgUrl: "/img/step-3.jpg",
    text: t("pg.home.securityHole.text"),
    videoUrl: {
      it: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/inclinazione-de.mp4",
      de: "https://codeworks-projects-tunnelbronzolo.s3.eu-west-1.amazonaws.com/video/inclinazione-de.mp4",
    },
  },
  {
    number: "4",
    title: t("pg.home.theBuilding.title"),
    imgUrl: "/img/step-4.jpg",
    text: t("pg.home.theBuilding.text"),
  },
  {
    number: "5",
    title: t("pg.home.urbanQualification.title"),
    imgUrl: "/img/step-5.jpg",
    text: t("pg.home.urbanQualification.text"),
    highlightItemTitle: t("pg.home.smokeMonitoring.highlightTitle"),
    highlightItem: t("pg.home.smokeMonitoring.highlightText"),
  },
  {
    number: "6",
    title: t("pg.home.smokeMonitoring.title"),
    imgUrl: "/img/step-6.jpg",
    text: t("pg.home.smokeMonitoring.text"),
    highlightItem: t("pg.home.smokeMonitoring.highlightText"),
  },
];

const stepModal = ref({
  isVisible: false,
});

const videoModal = ref({
  isVisible: false,
  curVideoUrl: "",
});

const currentStep = ref();

// Methods
const showStep = (index: number) => {
  currentStep.value = steps[index];
  stepModal.value.isVisible = true;
};

const hideStepModal = () => {
  stepModal.value.isVisible = false;
};

const showVideo = (videoUrl: string) => {
  videoModal.value.curVideoUrl = videoUrl;
  videoModal.value.isVisible = true;
};

const hideVideoModal = () => {
  videoModal.value.isVisible = false;
};

const stripAllTags = (text: string) => {
  return text.replace(/(<([^>]+)>)/gi, "");
};
</script>

<style lang="postcss" scoped>
.heading {
  @apply h-[56.5vw];

  & video {
    @apply bg-placeholder h-full w-full;
  }
}

section {
  @apply py-20;

  & h2 {
    @apply text-primary text-5xl uppercase font-black;
  }

  & h3 {
    @apply text-primary text-lg leading-tight max-w-[600px] mt-3;
  }
}

.promoters-list {
  @apply flex gap-4 items-center;

  & img {
    @apply h-24;
  }
}

.reviews {
  @apply text-center;

  .reviews-list {
    @apply flex items-center gap-5;

    & .review {
      & .preview-circle {
        @apply flex items-center justify-center w-48 h-48 bg-cover bg-center bg-placeholder;

        & .play-ico {
          @apply w-10 h-10;
        }
      }
    }

    & h4 {
      @apply uppercase font-bold font-primary;
    }

    & h5 {
      @apply text-grey text-sm;
    }
  }
}

.steps {
  .steps-ct {
    @apply grid grid-cols-3 gap-4;
    & .step {
      @apply border-2 border-primary p-4;
      & .heading {
        @apply flex gap-3;

        & .number {
          @apply flex items-center justify-center text-xl font-bold text-primary border-2 border-primary rounded-full w-24 h-24;
        }

        & .title {
          @apply font-bold uppercase text-lg flex-grow;
        }
      }

      & .preview-image {
        @apply h-32 bg-cover bg-center bg-placeholder;
      }

      & .preview-text {
        @apply mb-4;
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  section {
    @apply py-12;

    & h2 {
      @apply text-4xl;
    }

    & h3 {
      @apply text-base mt-1;
    }
  }
}
</style>
