import { injectGlobal } from "styled-components";

/* eslint no-unused-expressions: 0 */
injectGlobal`
    /* ----------- Non-Retina Screens ----------- */
    @media screen 
    and (min-device-width: 1200px) 
    and (max-device-width: 1600px) 
    and (-webkit-min-device-pixel-ratio: 1) { 
        .bingo-board {
            max-width:1200px;
            min-height:1200px;
        }
    }

    /* ----------- Retina Screens ----------- */
    @media screen 
    and (min-device-width: 1200px) 
    and (max-device-width: 1600px) 
    and (-webkit-min-device-pixel-ratio: 2)
    and (min-resolution: 192dpi) { 
        .bingo-board {
            max-width:1200px;
            min-height:1200px;
        }
    }
`;
