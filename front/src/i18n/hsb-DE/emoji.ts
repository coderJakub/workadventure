import { DeepPartial } from "../../Utils/DeepPartial";
import type { Translation } from "../i18n-types";

const emoji: DeepPartial<Translation["emoji"]> = {
    search: "emojije pytać...",
    categories: {
        recents: "poslednje emojije",
        smileys: "smileje a emocije",
        people: "čłowjekojo",
        animals: "zwěrjata a přiroda",
        food: "jědź a piće",
        activities: "aktiwity",
        travel: "jězba a městnosće",
        objects: "objekty",
        symbols: "symbole",
        flags: "chorhoje",
        custom: "wužiwarjo definowace",
    },
    notFound: "žane emojije namakali",
};

export default emoji;
