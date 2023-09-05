<template>
  <div>
    <Header />
    <main>
      <div class="heading">
        <video
          :src="coverVideoUrl[locale]"
          autoplay
          muted
          playsinline
          loop
        ></video>
      </div>
      <section class="promoters-list-ct">
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
                <div class="play-ico-ct">
                  <Icon name="play" class="play-ico" />
                </div>
              </div>
              <h4>{{ review.by.name }}</h4>
              <h5>{{ review.by.role }}</h5>
            </div>
          </div>
        </div>
      </section>
      <div class="steps">
        <div class="center">
          <div class="steps-ct">
            <div
              v-for="(step, index) in steps"
              class="step"
              @click="showStep(index)"
            >
              <div class="head">
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
                {{ stripAllTags(step.text).substr(0, 150) }}...
              </p>
              <div class="button-ct">
                <div class="button clickable">
                  {{ $t("common.readAll") }}
                  <div class="plus">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="download-brochure-ct">
        <a :href="'/pdf/brochure-' + locale + '.pdf'" target="_blank">
          <Button :value="$t('common.downloadBrochure')" />
        </a>
      </div>
      <Modal
        :is-visible="stepModal.isVisible"
        :width="700"
        :height="500"
        @close="hideStepModal"
      >
        <div class="full-screen-preview">
          <h2>{{ currentStep?.title }}</h2>
          <video
            v-if="currentStep?.videoUrl"
            :src="currentStep?.videoUrl[locale]"
            playsinline
            autoplay
            :controls="showControls"
            class="w-full"
          ></video>
          <p v-if="currentStep?.videoLabel" class="video-label">
            {{ currentStep?.videoLabel.name }}<br /><span class="role">{{
              currentStep?.videoLabel.role
            }}</span>
          </p>
          <div class="text" v-html="currentStep?.text" />
          <div v-if="currentStep?.highlightItem" class="highlight">
            <h2 class="title">
              {{ currentStep?.highlightItemTitle }}
            </h2>
            <div class="text" v-html="currentStep?.highlightItem" />
          </div>
          <a :href="'/pdf/brochure-' + locale + '.pdf'" target="_blank">
            <Button
              :value="$t('common.downloadCompleteBrochure')"
              class="button"
            />
          </a>
        </div>
      </Modal>
      <Modal
        :is-visible="videoModal.isVisible"
        :width="700"
        :height="394"
        full-screen
        @close="hideVideoModal"
      >
        <video
          v-if="videoModal.curVideoUrl"
          :src="videoModal.curVideoUrl"
          playsinline
          autoplay
          class="w-full h-full"
          :controls="showControls"
        ></video>
      </Modal>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();

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
    imgUrl: "/img/erdbau.png",
  },
  {
    imgUrl: "/img/provincia-bolzano.png",
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
    videoLabel: {
      name: "Ermanno Ramazzotti",
      role: t("pg.home.mobilityUnite.videoLabel.role"),
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
    videoLabel: {
      name: "Bernhard W. Hopf",
      role: t("pg.home.jetGrouting.videoLabel.role"),
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
    videoLabel: {
      name: "Lukas Mair",
      role: t("pg.home.securityHole.videoLabel.role"),
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
    highlightItemTitle: t("pg.home.urbanQualification.highlightTitle"),
    highlightItem: t("pg.home.urbanQualification.highlightText"),
  },
  {
    number: "6",
    title: t("pg.home.smokeMonitoring.title"),
    imgUrl: "/img/step-6.jpg",
    text: t("pg.home.smokeMonitoring.text"),
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

const showControls = ref(false);

// Lifecycle
onMounted(() => {
  parseUrlAction();
});

// Methods
const showStep = (index: number) => {
  currentStep.value = steps[index];
  stepModal.value.isVisible = true;
};

const hideStepModal = () => {
  stepModal.value.isVisible = false;
  setTimeout(() => {
    currentStep.value = undefined;
  }, 200);
  showControls.value = false;
};

const showVideo = (videoUrl: string) => {
  videoModal.value.curVideoUrl = videoUrl;
  videoModal.value.isVisible = true;
};

const hideVideoModal = () => {
  videoModal.value.curVideoUrl = "";
  videoModal.value.isVisible = false;
  showControls.value = false;
};

const stripAllTags = (text: string) => {
  return text.replace(/(<([^>]+)>)/gi, "");
};

const parseUrlAction = () => {
  const show = route.query.show;
  if (show) {
    switch (show) {
      case "1":
        showVideo(reviews[2].videoUrl[locale.value]);
        break;
      case "2":
        showVideo(reviews[1].videoUrl[locale.value]);
        break;
      case "3":
        showVideo(reviews[0].videoUrl[locale.value]);
        break;
      case "4":
        showStep(2);
        break;
      case "5":
        showStep(4);
        break;
      case "6":
        showStep(6);
        break;
      case "7":
        showStep(7);
        break;
    }

    showControls.value = true;
  }
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
    @apply text-primary text-3xl uppercase font-black;
  }

  & h3 {
    @apply text-primary text-lg leading-tight max-w-[600px] mt-3;
  }
}

.promoters-list-ct {
  @apply py-5;

  .promoters-list {
    @apply flex gap-12 justify-center;

    & img {
      @apply h-12;
    }
  }
}

.reviews {
  @apply text-center bg-input;

  .reviews-list {
    @apply flex justify-center gap-5 mt-8;

    & .review {
      @apply flex flex-1 flex-col items-center;

      & .preview-circle {
        @apply flex items-center justify-center w-48 h-48 bg-cover bg-center bg-placeholder rounded-full;

        & .play-ico-ct {
          @apply flex items-center justify-center w-16 h-16 rounded-full border-white border-2;

          & .play-ico {
            @apply fill-current text-white w-10 h-10;
          }
        }
      }
    }

    & h4 {
      @apply uppercase font-bold text-primary mt-3;
    }

    & h5 {
      @apply text-grey text-sm;
    }
  }
}

.steps {
  @apply mt-12 mb-6;

  & .steps-ct {
    @apply grid grid-cols-2 gap-8;
    & .step {
      @apply bg-primary p-6;
      & .head {
        @apply flex items-center gap-3;

        & .number {
          @apply flex shrink-0 items-center justify-center text-2xl font-black text-white border-2 border-white rounded-full w-16 h-16;
        }

        & .title {
          @apply font-black uppercase text-lg flex-grow leading-tight text-white break-words;
        }
      }

      & .preview-image {
        @apply h-56 bg-cover bg-center bg-placeholder my-5;
      }

      & .preview-text {
        @apply mb-8 text-white;
      }

      & .button-ct {
        @apply flex justify-center mb-2;

        & .button {
          @apply flex gap-2 text-sm py-3 px-4 bg-white bg-opacity-10 transition text-white rounded-3xl font-bold uppercase;

          & .plus {
            @apply flex items-center justify-center w-5 h-5 border-2 border-white rounded-full font-bold text-base;
          }

          &:hover {
            @apply bg-opacity-20;
          }
        }
      }
    }
  }
}

.download-brochure-ct {
  @apply flex justify-center mb-12;
}

.full-screen-preview {
  & h2 {
    @apply text-3xl font-black mt-2 mb-4 uppercase text-primary break-words;
  }

  & video {
    @apply mb-4 rounded-md bg-placeholder;
  }

  & .video-label {
    @apply -mt-2 text-base font-bold leading-none mb-8;

    & .role {
      @apply text-grey text-xs font-normal leading-tight;
    }
  }

  & .text {
    @apply text-base;
  }

  & .highlight {
    @apply bg-input p-5;

    & .title {
      @apply uppercase font-bold text-primary;
    }

    & .text {
      @apply mt-3;
    }
  }

  & .button {
    @apply mt-6;
  }
}

@media only screen and (max-width: 980px) {
  .heading {
    @apply h-[70vw];

    & video {
      @apply bg-placeholder h-full w-full object-fill;
    }
  }

  section {
    @apply py-12;

    & h2 {
      @apply text-2xl;
    }

    & h3 {
      @apply text-base mt-1;
    }
  }

  .promoters-list-ct {
    & .promoters-list {
      @apply block text-center;

      & img {
        @apply inline-block h-6 mx-3;
      }
    }
  }

  .reviews {
    & .reviews-list {
      @apply flex-col;

      & .review {
        & h5 {
          @apply px-6;
        }
      }
    }
  }

  .steps {
    & .steps-ct {
      @apply grid-cols-1 gap-4;
    }
  }
}
</style>

<style lang="postcss">
.full-screen-preview {
  & .text {
    & p {
      @apply mb-2 leading-relaxed;
    }
  }
}
</style>
