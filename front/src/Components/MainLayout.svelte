<script lang="ts">
    import { onMount } from "svelte";
    import { audioManagerVisibilityStore } from "../Stores/AudioManagerStore";
    import { hasEmbedScreen } from "../Stores/EmbedScreensStore";
    import { emoteDataStoreLoading, emoteMenuStore } from "../Stores/EmoteStore";
    import { requestVisitCardsStore } from "../Stores/GameStore";
    import { helpCameraSettingsVisibleStore } from "../Stores/HelpCameraSettingsStore";
    import { layoutManagerActionVisibilityStore } from "../Stores/LayoutManagerStore";
    import { menuVisiblilityStore, warningContainerStore } from "../Stores/MenuStore";
    import { showReportScreenStore, userReportEmpty } from "../Stores/ShowReportScreenStore";
    import AudioManager from "./AudioManager/AudioManager.svelte";
    import ActionBar from "./ActionBar/ActionBar.svelte";
    import EmbedScreensContainer from "./EmbedScreens/EmbedScreensContainer.svelte";
    import HelpCameraSettingsPopup from "./HelpCameraSettings/HelpCameraSettingsPopup.svelte";
    import LayoutActionManager from "./LayoutActionManager/LayoutActionManager.svelte";
    import Menu from "./Menu/Menu.svelte";
    import ReportMenu from "./ReportMenu/ReportMenu.svelte";
    import VisitCard from "./VisitCard/VisitCard.svelte";
    import WarningContainer from "./WarningContainer/WarningContainer.svelte";
    import CoWebsitesContainer from "./EmbedScreens/CoWebsitesContainer.svelte";
    import FollowMenu from "./FollowMenu/FollowMenu.svelte";
    import { followStateStore } from "../Stores/FollowStore";
    import { peerStore } from "../Stores/PeerStore";
    import { banMessageStore } from "../Stores/TypeMessageStore/BanMessageStore";
    import BanMessageContainer from "./TypeMessage/BanMessageContainer.svelte";
    import { textMessageStore } from "../Stores/TypeMessageStore/TextMessageStore";
    import TextMessageContainer from "./TypeMessage/TextMessageContainer.svelte";
    import { soundPlayingStore } from "../Stores/SoundPlayingStore";
    import AudioPlaying from "./UI/AudioPlaying.svelte";
    import { showLimitRoomModalStore, modalVisibilityStore } from "../Stores/ModalStore";
    import LimitRoomModal from "./Modal/LimitRoomModal.svelte";
    import { actionsMenuStore } from "../Stores/ActionsMenuStore";
    import ActionsMenu from "./ActionsMenu/ActionsMenu.svelte";
    import Lazy from "./Lazy.svelte";
    import { showDesktopCapturerSourcePicker } from "../Stores/ScreenSharingStore";
    import UiWebsiteContainer from "./UI/Website/UIWebsiteContainer.svelte";
    import { uiWebsitesStore } from "../Stores/UIWebsiteStore";
    import { mapEditorModeStore, mapEditorSelectedAreaPreviewStore } from "../Stores/MapEditorStore";
    import Modal from "./Modal/Modal.svelte";
    import { coWebsites } from "../Stores/CoWebsiteStore";

    let mainLayout: HTMLDivElement;

    const resizeObserver = new ResizeObserver(() => {});

    onMount(() => {
        resizeObserver.observe(mainLayout);
    });
</script>

<!-- Components ordered by z-index -->
<div id="main-layout" class={[...$coWebsites.values()].length === 0 ? "not-cowebsite" : ""} bind:this={mainLayout}>
    {#if $modalVisibilityStore}
        <div class="tw-bg-black/60 tw-w-full tw-h-full tw-fixed tw-left-0 tw-right-0" />
    {/if}

    <aside id="main-layout-left-aside">
        <CoWebsitesContainer vertical={true} />
    </aside>

    <section id="main-layout-main" class="tw-pb-0">
        <Lazy
            when={$showDesktopCapturerSourcePicker}
            component={() => import("./Video/DesktopCapturerSourcePicker.svelte")}
        />

        {#if $menuVisiblilityStore}
            <Menu />
        {/if}

        {#if $banMessageStore.length > 0}
            <BanMessageContainer />
        {:else if $textMessageStore.length > 0}
            <TextMessageContainer />
        {/if}

        {#if $soundPlayingStore}
            <AudioPlaying url={$soundPlayingStore} />
        {/if}

        {#if $warningContainerStore}
            <WarningContainer />
        {/if}

        {#if $showReportScreenStore !== userReportEmpty}
            <ReportMenu />
        {/if}

        {#if $helpCameraSettingsVisibleStore}
            <HelpCameraSettingsPopup />
        {/if}

        {#if $audioManagerVisibilityStore}
            <AudioManager />
        {/if}

        {#if $showLimitRoomModalStore}
            <LimitRoomModal />
        {/if}

        {#if $actionsMenuStore}
            <ActionsMenu />
        {/if}

        {#if $followStateStore !== "off" || $peerStore.size > 0}
            <FollowMenu />
        {/if}

        {#if $requestVisitCardsStore}
            <VisitCard visitCardUrl={$requestVisitCardsStore} />
        {/if}

        {#if $mapEditorModeStore}
            <Lazy
                when={$mapEditorSelectedAreaPreviewStore !== undefined}
                component={() => import("./MapEditor/AreaPreviewWindow.svelte")}
            />
        {/if}

        {#if hasEmbedScreen}
            <EmbedScreensContainer />
        {/if}

        {#if $uiWebsitesStore}
            <UiWebsiteContainer />
        {/if}

        {#if $modalVisibilityStore}
            <Modal />
        {/if}
    </section>

    {#if $layoutManagerActionVisibilityStore}
        <LayoutActionManager />
    {/if}

    <ActionBar />

    <!-- audio when user have a message TODO delete it with new chat -->
    <audio id="newMessageSound" src="/resources/objects/new-message.mp3" style="width: 0;height: 0;opacity: 0" />

    <Lazy
        on:onload={() => emoteDataStoreLoading.set(true)}
        on:loaded={() => emoteDataStoreLoading.set(false)}
        on:error={() => emoteDataStoreLoading.set(false)}
        when={$emoteMenuStore}
        component={() => import("./EmoteMenu/EmoteMenu.svelte")}
    />
</div>

<style lang="scss">
    @import "../../style/breakpoints.scss";

    #main-layout {
        display: grid;
        grid-template-columns: 120px calc(100% - 120px);
        grid-template-rows: 100%;
        transition: all 0.2s ease-in-out;

        &-left-aside {
            min-width: 80px;
        }
    }

    @include media-breakpoint-up(md) {
        #main-layout {
            grid-template-columns: 15% 85%;

            &-left-aside {
                min-width: auto;
            }

            &.not-cowebsite {
                grid-template-columns: 0% 100%;
            }
        }
    }

    @include media-breakpoint-up(sm) {
        #main-layout {
            grid-template-columns: 20% 80%;

            &.not-cowebsite {
                grid-template-columns: 0% 100%;
            }
        }
    }
</style>
