import main from './main.m.css';
import phonePortrait from './phonePortrait.m.css';
import phoneLandscape from './phoneLandscape.m.css';
import tabletPortrait from './tabletPortrait.m.css';
import tabletLandscape from './tabletLandscape.m.css';
import desktopS from './desktopS.m.css';
import desktopM from './desktopM.m.css';
import desktopL from './desktopL.m.css';
import desktopXL from './desktopXL.m.css';

export default `${main.main} ${phonePortrait.phonePortrait} ${phoneLandscape.phoneLandscape} ${
    tabletPortrait.tabletPortrait
} ${tabletLandscape.tabletLandscape} ${desktopS.desktopS} ${desktopM.desktopM} ${
    desktopL.desktopL
} ${desktopXL.desktopXL}`;

export const Kit = {
    ...main,
    ...phonePortrait,
    ...phoneLandscape,
    ...tabletPortrait,
    ...tabletLandscape,
    ...desktopS,
    ...desktopM,
    ...desktopL,
    ...desktopXL,
};
