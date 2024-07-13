import { v4 as uuidv4 } from "uuid";
//Music Imports
import LakeThemeRemix from "../musiclibrary/music/LakeThemeRemix.mp3";
import GreenLightBootleg from "../musiclibrary/music/GreenLightBootleg.mp3";
import DeepDubDemo from "../musiclibrary/music/DeepDubDemo.mp3";
import ShadeStriderLoop from "../musiclibrary/music/ShadeStriderMainLoop.mp3";
import ShadeStriderDnb from "../musiclibrary/music/ShadeStriderDnb.mp3";
import SynthRiddim from "../musiclibrary/music/BigSynthRiddim.mp3";
import LiquidDnbDemo from "../musiclibrary/music/LiquidDnbDemo.mp3";
import RetroGameMusic1 from "../musiclibrary/music/RetroGame1.mp3";
import FutureDnb from "../musiclibrary/music/FutureDnb.mp3";
import ScaryDnb from "../musiclibrary/music/ScaryDnb.mp3";
import BassHouseRyanGina from "../musiclibrary/music/BassHouseRyanGina.mp3";
import HeavyDub from "../musiclibrary/music/HeavyDub.mp3";
import HukaeThingRyanGina from "../musiclibrary/music/HukaeThingRyanGina.mp3";
import MidTempo from "../musiclibrary/music/MidTempo.mp3";
import Mystery from "../musiclibrary/music/Mystery.mp3";
import NeuroDnb from "../musiclibrary/music/NeuroDnb.mp3";
import OldschoolDark from "../musiclibrary/music/OldschoolDark.mp3";
import YoshiDnb from "../musiclibrary/music/YoshiDnb.mp3";
import SadboiWubs from "../musiclibrary/music/SadboiWubs.mp3";
import TechnoTune from "../musiclibrary/music/IndustrialTechno.mp3";
import IceCapRemix from "../musiclibrary/music/SonicIceCapRemix.mp3";
import Sunset from "../musiclibrary/music/Sunset.mp3";
import NightRide from "../musiclibrary/music/NightRide.mp3";
import ThisIsYourGod from "../musiclibrary/music/ThisIsYourGod.mp3";
import ValerianBattleTheme from "../musiclibrary/music/ValerianBattleTheme.mp3";
import ValerianBossTheme1 from "../musiclibrary/music/ValerianBossTheme1.mp3";
import ValerianMenuTheme from "../musiclibrary/music/ValerianMenuTheme.mp3";
import ValerianSnowTheme from "../musiclibrary/music/ValerianSnowTheme.mp3";
import ValerianTempleTheme from "../musiclibrary/music/ValerianTempleTheme.mp3";
import ValerianWetlandTheme from "../musiclibrary/music/ValerianWetlandTheme.mp3";
import WubbyRap from "../musiclibrary/music/WubbyRap.mp3";

//picture imports
import lakethemeremix from "../musiclibrary/art/lake-sinnoh.png";
import greenlightbootleg from "../musiclibrary/art/green-light-lorde.jpg";
import deepdub from "../musiclibrary/art/deep-dub.png";
import shadestriderlogo from "../musiclibrary/art/ShadeStriderCoverArt.png";
import synthriddim from "../musiclibrary/art/riddimthing.jpg";
import liquiddnb from "../musiclibrary/art/liquid-dnb.jpg";
import retrogame1 from "../musiclibrary/art/retro-game1.png";
import dnbrandom from "../musiclibrary/art/dnbrandom.jpg";
import basshouse from "../musiclibrary/art/bass-house.jpg";
import skrollex from "../musiclibrary/art/skrollex.jpg";
import technoWarehouse from "../musiclibrary/art/techno-warehouse.jpg";
import bubbles from "../musiclibrary/art/bubbles.jpg";
import heavy from "../musiclibrary/art/Heavy-Metal.jpg";
import dark from "../musiclibrary/art/dark-forest.jpg";
import yoshidnb from "../musiclibrary/art/yoshi-dnb.jpg";
import prosncons from "../musiclibrary/art/prosncons.jpg";
import robotdnb from "../musiclibrary/art/robot-dnb.jpg";
import spoopboi from "../musiclibrary/art/spoop-boi.jpg";
import glitchy from "../musiclibrary/art/glitchy.jpg";
import yourgod from "../musiclibrary/art/your-god.jpg";
import icecaplogo from "../musiclibrary/art/ice-cap-zone.jpg";
import sunsetlogo from "../musiclibrary/art/night-stroll.jpg";
import nightridelogo from "../musiclibrary/art/night-drive.jpg";
import mysterylogo from "../musiclibrary/art/mystery.jpg";

import { Song } from "../../global/interfaces";

function songLibrary(): Song[] {
  return [
    {
      name: "Sinnoh Lake Theme (Rearrangement / Remix)",
      artist: "Ryan Coppa",
      year: 2023,
      url: "/music/lake-theme-rearranged",
      cover: lakethemeremix,
      id: uuidv4(),
      active: true,
      color: ["#70A0E0", "#50F890"],
      audio: LakeThemeRemix,
    },
    {
      name: "Green Light (Lorde) Dnb Bootleg [WIP]",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/green-light-dnb-bootleg",
      cover: greenlightbootleg,
      id: uuidv4(),
      active: false,
      color: ["#0A2623", "#167252"],
      audio: GreenLightBootleg,
    },
    {
      name: "Deep Dub Thing [CLIP]",
      artist: "Ryan Coppa",
      year: 2024,
      url: "/music/deep-dub",
      cover: deepdub,
      id: uuidv4(),
      active: false,
      color: ["#0E0E0E", "#000000"],
      audio: DeepDubDemo,
    },
    {
      name: "Shade Strider Main Theme",
      artist: "Ryan Coppa",
      year: 2024,
      url: "/music/shade-strider-theme",
      cover: shadestriderlogo,
      id: uuidv4(),
      active: false,
      color: ["#14182E", "#4C6885"],
      audio: ShadeStriderLoop,
    },
    {
      name: "Shade Strider Dnb [CLIP]",
      artist: "Ryan Coppa",
      year: 2024,
      url: "/music/shade-strider-dnb",
      cover: shadestriderlogo,
      id: uuidv4(),
      active: false,
      color: ["#14182E", "#4C6885"],
      audio: ShadeStriderDnb,
    },
    {
      name: "Liquid DnB Demo [CLIP]",
      artist: "Ryan Coppa",
      year: 2023,
      url: "/music/liquid-dnb-demo",
      cover: liquiddnb,
      id: uuidv4(),
      active: false,
      color: ["#F9E67F", "#A95A36"],
      audio: LiquidDnbDemo,
    },
    {
      name: "Retro Game Music 1 [CLIP]",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/retro-game-music-1",
      cover: retrogame1,
      id: uuidv4(),
      active: false,
      color: ["#0e0703", "#910f0b"],
      audio: RetroGameMusic1,
    },
    {
      name: "Riddim Synth Thing (CLIP)",
      artist: "Ryan Coppa",
      year: 2023,
      url: "/music/synth-riddim",
      cover: synthriddim,
      id: uuidv4(),
      active: false,
      color: ["#F9E67F", "#A95A36"],
      audio: SynthRiddim,
    },
    {
      name: "Neuro DnB [CLIP]",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/neuro-dnb",
      cover: dnbrandom,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: NeuroDnb,
    },
    {
      name: "Bass House Demo",
      artist: "Ryan Coppa & Gina",
      year: 2022,
      url: "/music/bass-house-demo",
      cover: basshouse,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: BassHouseRyanGina,
    },
    {
      name: "Sad Melodic Tune [CLIP]",
      artist: "Ryan Coppa",
      year: 2020,
      url: "/music/sad-melodic-tune",
      cover: skrollex,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: SadboiWubs,
    },
    {
      name: "Techno Warehouse Tune [CLIP]",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/techno-warehouse-tune",
      cover: technoWarehouse,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: TechnoTune,
    },
    {
      name: "Ryan and Gina Riddim Collab [CLIP]",
      artist: "Ryan Coppa & Gina",
      year: 2021,
      url: "/music/ryan-and-gina-riddim-collab",
      cover: bubbles,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: HukaeThingRyanGina,
    },
    {
      name: "Heavy Dubstep Metal Tune [CLIP]",
      artist: "Ryan Coppa",
      year: 2021,
      url: "/music/heavy-dubstep-metal-tune",
      cover: heavy,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: HeavyDub,
    },
    {
      name: "Dark Oldschool Dubstep Tune [CLIP]",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/dark-oldschool-dubstep-tune",
      cover: dark,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: OldschoolDark,
    },
    {
      name: "Yoshi Dnb Tune [CLIP]",
      artist: "Ryan Coppa",
      year: 2021,
      url: "/music/yoshi-dnb-tune",
      cover: yoshidnb,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: YoshiDnb,
    },
    {
      name: "Rap Dubstep Tune [CLIP]",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/rap-dubstep-tune",
      cover: prosncons,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: WubbyRap,
    },
    {
      name: "Futuristic DnB [CLIP]",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/futuristic-dnb",
      cover: robotdnb,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: FutureDnb,
    },
    {
      name: "Spooky Scary Dnb [CLIP]",
      artist: "Ryan Coppa",
      year: 2020,
      url: "/music/spooky-scary-dnb",
      cover: spoopboi,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: ScaryDnb,
    },
    {
      name: "Glitchy Mid-Tempo [CLIP]",
      artist: "Ryan Coppa",
      year: 2021,
      url: "/music/glitchy-mid-tempo",
      cover: glitchy,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: MidTempo,
    },
    {
      name: "This is Your God [CLIP]",
      artist: "Ryan Coppa",
      year: 2021,
      url: "/music/this-is-your-god",
      cover: yourgod,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: ThisIsYourGod,
    },
    {
      name: "Sonic Ice Cap Zone Remix [CLIP]",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/sonicicecapremix",
      cover: icecaplogo,
      id: uuidv4(),
      active: false,
      color: ["#429EDB", "#090C9E"],
      audio: IceCapRemix,
    },
    {
      name: "Sunset",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/sunset",
      cover: sunsetlogo,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: Sunset,
    },
    {
      name: "Night Ride",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/night-ride",
      cover: nightridelogo,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: NightRide,
    },
    {
      name: "Mystery",
      artist: "Ryan Coppa",
      year: 2022,
      url: "/music/mystery",
      cover: mysterylogo,
      id: uuidv4(),
      active: false,
      color: ["#3B4E59", "#1B272F"],
      audio: Mystery,
    },
    {
      name: "Valerian X Basic Battle Theme",
      artist: "Ryan Coppa",
      year: 2017,
      url: "/music/valerian-x-basic-battle-theme",
      cover: "https://i.imgur.com/1K4Yq7x.png",
      id: uuidv4(),
      active: false,
      color: ["#4C4846", "#13161F"],
      audio: ValerianBattleTheme,
    },
    {
      name: "Valerian X Snow Theme",
      artist: "Ryan Coppa",
      year: 2017,
      url: "/music/valerian-x-snow-theme",
      cover: "https://i.imgur.com/3Gk9Dhl.jpg",
      id: uuidv4(),
      active: false,
      color: ["#B3C6E7", "#0E2E5F"],
      audio: ValerianSnowTheme,
    },
    {
      name: "Valerian X Temple Theme",
      artist: "Ryan Coppa",
      year: 2017,
      url: "/music/valerian-x-temple-theme",
      cover: "https://i.imgur.com/OBo7jZt.png",
      id: uuidv4(),
      active: false,
      color: ["#C2967F", "#4B3C52"],
      audio: ValerianTempleTheme,
    },
    {
      name: "Valerian X Wetland Theme",
      artist: "Ryan Coppa",
      year: 2017,
      url: "/music/valerian-x-wetland-theme",
      cover: "https://i.imgur.com/Qg3XAyp.jpg",
      id: uuidv4(),
      active: false,
      color: ["#5C6C3F", "#293A24"],
      audio: ValerianWetlandTheme,
    },
    {
      name: "Valerian X Temple Boss Theme",
      artist: "Ryan Coppa",
      year: 2017,
      url: "/music/valerian-x-temple-boss-theme",
      cover: "https://i.imgur.com/S9GmwLf.png",
      id: uuidv4(),
      active: false,
      color: ["#876C69", "#45394F"],
      audio: ValerianBossTheme1,
    },
    {
      name: "Valerian X Main Menu Theme",
      artist: "Ryan Coppa",
      year: 2017,
      url: "/music/valerian-x-main-menu-theme",
      cover: "https://i.imgur.com/AxzAE2B.png",
      id: uuidv4(),
      active: false,
      color: ["#7CBA86", "#1A3E30"],
      audio: ValerianMenuTheme,
    },
  ];
}

export default songLibrary;
