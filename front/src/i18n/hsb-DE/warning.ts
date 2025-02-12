import { DeepPartial } from "../../Utils/DeepPartial";
import type { Translation } from "../i18n-types";
import { ADMIN_URL } from "../../Enum/EnvironmentVariable";

const upgradeLink = ADMIN_URL + "/pricing";

const warning: DeepPartial<Translation["warning"]> = {
    title: "Warnowanje!",
    content: `Tutón swět docpěje bórze maksimalnu kapacitu. Móžeš kapacitu wosoby <a href = "${upgradeLink}" target = "_ blank" > tule < a > powyšić`,
    limit: "Tutón swět docpěje bórze maksimalnu kapacitu!",
    accessDenied: {
        camera: "Přistup ke kamerje zapowěł. Tu kliknješ, zo bychu so twoje browser woprawnjenja pruwowałi. ",
        screenSharing:
            "Přistup k dowolnosći wobrazowki zapowěł. Tu kliknješ, zo bychu so twoje browser woprawnjenja pruwowałi. ",
        room: "Přistup njedowoleny. Tebi faluje woprawnje, zo do tuteho ruma zastupiš. ",
        teleport: "Woni njesmědźa so k tutemu wužiwarjej přisamjenić.",
    },
    importantMessage: "wažna powěsć",
    connectionLost: "Zwiski přetorhnjene. Zaso zwjazować.. ",
    connectionLostTitle: "zwiski přetorhnjene",
    connectionLostSubtitle: "zaso zwjazować",
    waitingConnectionTitle: "na zwisk čakać",
    waitingConnectionSubtitle: "zwjazać",
};

export default warning;
