import { injectGlobal } from "styled-components";

/* eslint no-unused-expressions: 0 */
injectGlobal`
/* ----------- Google Pixel ----------- */

/* Portrait and Landscape */
    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) 
    and (-webkit-device-pixel-ratio: 3) {
        .bingo-board {
            max-width:360px;
            min-height:360px;
        }
    }

    /* Portrait */
    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) 
    and (-webkit-device-pixel-ratio: 3) 
    and (orientation: portrait) {
        .bingo-board {
            max-width:360px;
            min-height:360px;
        }
    }

    /* Landscape */
    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) 
    and (-webkit-device-pixel-ratio: 3) 
    and (orientation: landscape) {
        
        .bingo-board {
            max-width:360px;
            min-height:360px;
        }
    }

    /* ----------- Google Pixel XL ----------- */

    /* Portrait and Landscape */
    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) 
    and (-webkit-device-pixel-ratio: 4) {
        .bingo-board {
            max-width:360px;
            min-height:360px;
        }
    }

    /* Portrait */
    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) 
    and (-webkit-device-pixel-ratio: 4) 
    and (orientation: portrait) {
        .bingo-board {
            max-width:360px;
            min-height:360px;
        }
    }

    /* Landscape */
    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) 
    and (-webkit-device-pixel-ratio: 4) 
    and (orientation: landscape) {
        .bingo-board {
            max-width:360px;
            min-height:360px;
        }
    }
`;
