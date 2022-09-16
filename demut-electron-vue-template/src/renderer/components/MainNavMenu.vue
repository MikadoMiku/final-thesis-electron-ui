<script setup lang="ts">
import { sendMsg } from "../communication/communicator"
import type { PropType } from "vue"
import { useRouter } from "vue-router"

export interface routeButton {
    name: string
    route: string
    function: string
}

const emit = defineEmits(["navButtonClick"])

const props = defineProps({
    buttons: Array as PropType<Array<routeButton>>,
    useRoutes: Boolean,
})

function buttonClickWithRoute(route: string, bFunction: string) {
    if (props.useRoutes) {
        const router = useRouter()
        router.push(route)
    }
    emit("navButtonClick", bFunction)
}
</script>
<template>
    <div class="menu-button-container">
        <template v-if="useRoutes">
            <button
                class="button"
                v-for="button in buttons"
                :key="button.name"
                @click="$router.push(button.route)"
            >
                {{ button.name }}
            </button>
        </template>
        <template v-else>
            <button
                class="button"
                v-for="button in buttons"
                :key="button.name"
                @click="buttonClickWithRoute(button.route, button.function)"
            >
                {{ button.name }}
            </button>
        </template>
    </div>
</template>
<style scoped>
.menu-button-container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 8px;
    padding: 7px;
}

/* Override Bulma */
.button {
    height: 100% !important;
    border: none !important;
    background-image: linear-gradient(
        45deg,
        var(--accent-color) 0%,
        #171717 25%,
        #171717 75%,
        var(--accent-color) 100%
    );
    color: white;
    font-size: var(--M-font-size);
}

.button:hover {
    color: var(--accent-color);
    box-shadow: 0px 0px 5px 1px var(--accent-color);
    background: #171717;
}

.button::after {
    box-shadow: none !important;
}

.button:focus {
    box-shadow: 0px 0px 5px 1px var(--accent-color) !important;
    background: #171717;
    color: var(--accent-color);
}
</style>
