import { injectGlobal } from "styled-components";

/* eslint no-unused-expressions: 0 */
injectGlobal`
    @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2) {
        .bingo-board {
            max-width:320px;
            min-height:320px;
        }
    }

    /* Portrait */
    @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: portrait) {
        .bingo-board {
            max-width:320px;
            min-height:320px;
        }
    }

    /* Landscape */
    @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: landscape) {
        .bingo-board {
            max-width:320px;
            min-height:320px;
        }
    }

    /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */

    /* Portrait and Landscape */
    @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 568px)
    and (-webkit-min-device-pixel-ratio: 2) {
        .bingo-board {
            max-width:320px;
            min-height:320px;
        }
    }

    /* Portrait */
    @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 568px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: portrait) {
        .bingo-board {
            max-width:320px;
            min-height:320px;
        }
    }

    /* Landscape */
    @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 568px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: landscape) {
        .bingo-board {
            max-width:320px;
            min-height:320px;
        }

    }

    /* ----------- iPhone 6, 6S, 7 and 8 ----------- */

    /* Portrait and Landscape */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
        .bingo-board {
            max-width:375px;
            min-height:375px;
        }
    }

    /* Portrait */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: portrait) { 
        .bingo-board {
            max-width:375px;
            min-height:375px;
        }
    }

    /* Landscape */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: landscape) { 
        .bingo-board {
            max-width:375px;
            min-height:375px;
        }
    }

    /* ----------- iPhone 6+, 7+ and 8+ ----------- */

    /* Portrait and Landscape */
    @media only screen 
    and (min-device-width: 414px) 
    and (max-device-width: 736px) 
    and (-webkit-min-device-pixel-ratio: 3) { 
        .bingo-board {
            max-width:414px;
            min-height:414px;
        }
    }

    /* Portrait */
    @media only screen 
    and (min-device-width: 414px) 
    and (max-device-width: 736px) 
    and (-webkit-min-device-pixel-ratio: 3)
    and (orientation: portrait) { 
        .bingo-board {
            max-width:414px;
            min-height:414px;
        }
    }

    /* Landscape */
    @media only screen 
    and (min-device-width: 414px) 
    and (max-device-width: 736px) 
    and (-webkit-min-device-pixel-ratio: 3)
    and (orientation: landscape) { 
        .bingo-board {
            max-width:414px;
            min-height:414px;
        }
    }

    /* ----------- iPhone X ----------- */

    /* Portrait and Landscape */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3) { 
        .bingo-board {
            max-width:375px;
            min-height:375px;
        }
    } 

    /* Portrait */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3)
    and (orientation: portrait) { 
        .bingo-board {
            max-width:375px;
            min-height:375px;
            
        }
    }

    /* Landscape */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3)
    and (orientation: landscape) { 
        .flex-container {
            display: block;
        }
        .bingo-board {
            float: left;
            max-width:375px;
            min-height:330px;
        }
    }
`;
