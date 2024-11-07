<template>
    <div class="artboard">
        <div class="card">
            <div class="card__side card__side--front" :style="{ backgroundImage: `url(${imageSrc})` }"
                @mouseover="flipCard(true)" @mouseleave="flipCard(false)">
                <div class="card__theme">
                    <div class="card__theme-box">
                    </div>
                </div>
            </div>

            <div class="card__side card__side--back" :class="{ 'is-flipped': isFlipped }">
                <div class="card__cover">
                    <h4 class="card__heading">
                        <span class="card__heading-span">Descripcion de oferta</span>
                    </h4>
                </div>
                <div class="card__details">
                    <ul>
                        <li>
                            <p>{{ title }}</p>
                        </li>
                        <li>
                            <p>{{ requirement }}</p>
                        </li>
                        <li>
                            <p>{{ discount }}%</p>
                        </li>
                        <li>
                            <p>Valido hasta el {{ date }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardComponent",
    props: {
        imageSrc: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        requirement: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isFlipped: false
        };
    },
    methods: {
        flipCard(state) {
            this.isFlipped = state;
        },
    },
};
</script>

<style scoped lang="scss">
$background-color: #fdc47a;
$color-primary-light: #f3971e;
$color-primary-dark: #704b0c;
$color-black: #000;
$color-gray-light: #eee;
$color-white: #fff;

.artboard {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 50vh;
    background-color: $background-color;
}

.card {
    position: relative;
    height: 28rem;
    width: 20rem;
    perspective: 200rem;
    margin: 1rem;

    &__side {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        border-radius: 3px;
        overflow: hidden;
        box-shadow: 0 2rem 6rem rgba($color-black, 0.15);
        transition: transform 0.8s ease;
    }

    &__side--front {
        background-size: contain;
        /* Para que la imagen cubra todo el fondo */
        background-position: center;
        /* Centra la imagen */
        background-repeat: no-repeat;
    }

    &__side--back {
        background-color: $color-white;
        transform: rotateY(180deg);
    }

    &__theme {
        position: absolute;
        top: 54%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        text-align: center;
    }

    &__theme-box {
        color: $color-white;
        margin-bottom: 8rem;
    }

    &__subject {
        font-family: "Inconsolata", monospace;
        letter-spacing: 0.8rem;
        font-size: 1.6rem;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    &__title {
        font-family: "VT323", monospace;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: 100;
    }

    &__cover {
        background-size: cover;
        height: 5rem;
        clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        background-image: linear-gradient(to top right,
                rgba($color-primary-dark, 0.65),
                rgba($color-primary-light, 0.65)),
            url("https://cdn.spacetelescope.org/archives/images/screen/heic0406a.jpg");
    }

    &__heading {
        text-align: center;
        color: $color-white;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 75%;
    }

    &__heading-span {
        font-family: "VT323", monospace;
        font-size: 1.5rem;
        font-weight: 200;
        text-transform: uppercase;
        color: $color-white;
    }

    &__details {
        font-family: "Inconsolata", monospace;
        padding: 1rem;

        ul {
            list-style: none;
            width: 80%;
            margin: 0 auto;

            li {
                text-align: center;
                font-size: 1rem;
                padding: 0.5rem;

                &:not(:last-child) {
                    border-bottom: 1px solid $color-gray-light;
                }
            }
        }
    }

    &:hover &__side--back {
        transform: rotateY(0);
    }

    &:hover &__side--front {
        transform: rotateY(-180deg);
    }

    &.is-flipped {
        transform: rotateY(-180deg);
    }
}
</style>