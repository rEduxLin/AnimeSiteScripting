// Function to create the tooltip element
function createAmbrModule() {
  const module = document.createElement("div");
  document.body.appendChild(module);
  return module;
}

function ifPercentMultiply(statName, statValue, round) {
  let split = statName.split("_");
  let isPercent = ["HURT", "CRITICAL", "EFFICIENCY", "PERCENT", "ADD"].includes(
    split[split.length - 1]
  );
  if (round && isPercent)
    return Math.round((statValue * 100 + Number.EPSILON + 0.0001) * 10) / 10;
  if (round) return Math.round(statValue);
  return statValue;
}

function formatStat(name, value) {
  value = ifPercentMultiply(name, value, true);
  if (value >= 1000) {
    value = Array.from(value + "");
    value.splice(-3, 0, ",");
    value = value.join("");
  }
  name = name.split("_");
  if (
    ["HURT", "CRITICAL", "EFFICIENCY", "PERCENT", "ADD"].includes(
      name[name.length - 1]
    )
  )
    value = (value.toFixed ? value.toFixed(1) : value) + "%";
  return value;
}

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function positionTooltip(event, tooltip) {
  const element = event.target;
  const rect = element.getBoundingClientRect();
  const viewportBottom =
    window.outerHeight + document.documentElement.scrollTop;
  const viewportRight =
    document.documentElement.offsetWidth +
    document.documentElement.offsetLeft -
    document.documentElement.scrollLeft;

  var leftOffset = 20
  var left = event.clientX + leftOffset;
  tooltip.style.left = left + "px";

  const tooltipRight = tooltip.offsetWidth + tooltip.offsetLeft;
  tooltip.style.left =
    Math.min(viewportRight - tooltipRight + left - leftOffset + 10, left) + "px";

  var topOffest = 70
  var top = event.clientY + document.documentElement.scrollTop - topOffest ;
  tooltip.style.top = top + "px";

  const tooltipBottom = tooltip.offsetHeight + tooltip.offsetTop;
  tooltip.style.top =
    Math.max(32, Math.min(viewportBottom - tooltipBottom + top - topOffest - 30 , top)) + "px";
}

function hideTooltip(tooltip) {
  tooltip.style.display = "none";
}

function setScrollArrowState() {
  scrollContent = ambrModule.querySelector(".scrollContent");
  arrowDown = ambrModule.querySelector(".arrowDown");
  if (
    scrollContent.scrollHeight - scrollContent.offsetHeight ==
    scrollContent.scrollTop
  ) {
    arrowDown.style.display = "none";
  } else {
    arrowDown.style.display = "block";
  }
}

const defaultLang = "EN";
const apiUrl = {
  weaponCurve: () => `https://gi.yatta.moe/api/v2/static/weaponCurve`,
  loc: () =>
    `https://raw.githubusercontent.com/rEduxLin/AnimeSiteScripting/refs/heads/main/static/json/loc.json`,
  weapon: (itemId, lang) =>
    `https://gi.yatta.moe/api/v2/${lang ? lang : defaultLang}/weapon/${itemId}`,
  artifact: (itemId, lang) =>
    `https://gi.yatta.moe/api/v2/${
      lang ? lang : defaultLang
    }/reliquary/${itemId}`,
  ui: (iconName) => `https://gi.yatta.moe/assets/UI/${iconName}.png`,
  uiReliquary: (iconName) =>
    `https://gi.yatta.moe/assets/UI/reliquary/${iconName}.png`,
  talent: (avatarId, lang) =>
    `https://gi.yatta.moe/api/v2/${
      lang ? lang : defaultLang
    }/avatar/${avatarId}`,
  constellation: (avatarId, lang) =>
    `https://gi.yatta.moe/api/v2/${
      lang ? lang : defaultLang
    }/avatar/${avatarId}`,
};

const svg = {
  keyboardArrowDown: `
        <svg class="arrowDown" version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768">
          <path d="M236.993 265.498l147 147 147-147 45 45-192 192-192-192z"></path>
        </svg>
      `,
  circl: `
        <svg class="circl" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
          <defs><linearGradient xlink:href=\"#linearGradient826\" id=\"a\" x1=\"7.03\" x2=\"7.03\" y1=\"1.455\" y2=\"12.322\" gradientTransform=\"matrix(.80836 0 0 .82012 1.247 1.345)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" style=\"stop-color:currentColor;stop-opacity:0\"/><stop offset=\".446\" style=\"stop-color:currentColor;stop-opacity:.80000001\"/><stop offset=\".548\" style=\"stop-color:currentColor;stop-opacity:.80000001\"/><stop offset=\"1\" style=\"stop-color:currentColor;stop-opacity:0\"/></linearGradient><linearGradient id=\"b\" x1=\"7.03\" x2=\"7.03\" y1=\"1.794\" y2=\"12.257\" gradientTransform=\"translate(1.239 1.243) scale(.82247)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" style=\"stop-color:#fff;stop-opacity:0\"/><stop offset=\".446\" style=\"stop-color:#fff;stop-opacity:.7\"/><stop offset=\".548\" style=\"stop-color:#fff;stop-opacity:.7\"/><stop offset=\"1\" style=\"stop-color:#fff;stop-opacity:0\"/></linearGradient></defs><g style=\"display:inline\"><path d=\"M6.998 1.638c2.778 0 5.056 2.197 5.266 4.963.01.137-.447.433-.447.433s.457.287.445.435c-.226 2.748-2.497 4.893-5.264 4.893-2.779 0-5.077-2.162-5.289-4.925-.01-.138.444-.418.444-.418s-.455-.275-.444-.41c.209-2.77 2.508-4.971 5.289-4.971z\" style=\"opacity:1;fill:url(#a);fill-opacity:1;stroke-width:20.1392;-inkscape-stroke:none;paint-order:stroke markers fill\"/><path d=\"M6.713 1.638C3.972 1.766 1.82 3.695 1.483 6.3a5.036 5.036 0 0 1-.075-.11s-.786.828-1.451.828c.67 0 1.45.83 1.45.83s.03-.047.076-.112c.338 2.607 2.5 4.507 5.25 4.625-2.657-.138-4.816-2.284-5.023-4.925.17-.208.38-.418.526-.418-.147 0-.355-.209-.526-.417.207-2.645 2.366-4.824 5.023-4.964h-.02zm.56 0c2.655.138 4.78 2.317 4.986 4.962-.174.213-.388.434-.538.434.15 0 .363.218.536.43-.217 2.63-2.336 4.762-4.983 4.898 2.739-.117 4.866-2.002 5.211-4.594l.064.095s.786-.83 1.451-.83c-.206 0-.423-.078-.624-.186a3.772 3.772 0 0 1-.827-.642s-.024.039-.06.091c-.335-2.61-2.467-4.54-5.217-4.658Z\" style=\"fill:url(#b);stroke-width:19.7069;-inkscape-stroke:none;paint-order:stroke markers fill\"/></g>
        </svg>
      `,
};

const reliquarySuit = {
  EQUIP_BRACER: {
    hash: "2511636352",
    uiIcon: "UI_Icon_Equip_Bracer",
  },
  EQUIP_NECKLACE: {
    hash: "2498820160",
    uiIcon: "UI_Icon_Equip_Necklace",
  },
  EQUIP_SHOES: {
    hash: "3886070176",
    uiIcon: "UI_Icon_Equip_Shoes",
  },
  EQUIP_RING: {
    hash: "2587857504",
    uiIcon: "UI_Icon_Equip_Ring",
  },
  EQUIP_DRESS: {
    hash: "89548520",
    uiIcon: "UI_Icon_Equip_Dress",
  },
};

const talentTypeHash = {
  0: "1653327868",
  1: "4260972229",
  3: "2453877364",
  4: "2602723764",
  5: "2602723764",
  6: "2602723764",
  7: "2602723764",
  8: "2602723764",
};

const romeNum = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
};

const weaponRarityMaxLevel = {
  1: 70,
  2: 70,
  3: 90,
  4: 90,
  5: 90,
}

let isHovered = false;
let abortState;
let lastMouseMove;
let curveData;
fetchCurve().then((respone) => {
  curveData = respone;
});
let locData;
fetchLoc().then((respone) => {
  locData = respone;
});

const KWARGS = new Map([
  ["NON_BREAK_SPACE", "&nbsp;"],
  ["\n", "<br>"],
]);

function format(text) {
  text = text.replaceAll("\\n", "<br>");
  text = text.replace(
    /<color=#([0-9A-Fa-f]{8})>(.*?)<\/color>/g,
    (match, colorCode, text) => {
      // Convert ARGB to RGBA for CSS
      const r = parseInt(colorCode.slice(0, 2), 16);
      const g = parseInt(colorCode.slice(2, 4), 16);
      const b = parseInt(colorCode.slice(4, 6), 16);
      const a = (parseInt(colorCode.slice(6, 8), 16) / 255).toFixed(2);
      const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      return `<span style="color: ${rgbaColor};">${text}</span>`;
    }
  );

  // Return
  if (text.length < 1 || text[0] != "#") return text;
  return text
    .slice(1)
    .replace(/{(\w+)}/g, (_, ...args) => KWARGS.get(args[0]) ?? `<${args[0]}>`);
}

function formatParam(template, params) {
  return template.replace(
    /\{param(\d+):([FIP\d]*)\}/g,
    (match, index, format) => {
      const paramValue = params[parseInt(index) - 1];
      if (paramValue === undefined) return match;

      let formattedValue = paramValue;
      if (format.startsWith("F")) {
        const decimalPlaces = parseInt(format.slice(1)) || 0;
        if (format.includes("P"))
          formattedValue = (paramValue * 100).toFixed(decimalPlaces);
        else formattedValue = paramValue.toFixed(decimalPlaces);
      } else if (format === "I") {
        formattedValue = Math.round(paramValue);
      } else if (format === "P") {
        formattedValue = (paramValue * 100).toFixed(0);
      }
      if (format.includes("P")) {
        formattedValue += "%";
      }
      return formattedValue;
    }
  );
}

async function fetchCurve() {
  try {
    const respone = await fetch(apiUrl.weaponCurve());
    if (!respone.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await respone.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchLoc() {
  try {
    const respone = await fetch(apiUrl.loc());
    if (!respone.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await respone.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchData(itemId, itemType, itemLang, abortController) {
  const respone = await fetch(apiUrl[itemType](itemId, itemLang), {
    signal: abortController.signal,
  });
  if (!respone.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await respone.json();
  return json;
}

class DataFormat {
  static artifact(data, item) {
    const level = item.level ? clamp(item.level, 1, 20) : 20;
    const suit = item.index ? Object.keys(reliquarySuit)[item.index] : Object.keys(reliquarySuit)[0];
    console.log(suit, item.index)
    const lang = item.lang ? item.lang.toUpperCase() : defaultLang;
    const icon = data.data.suit[suit].icon;
    const affixList = Object.values(data.data.affixList);
    const suitName = locData[lang][reliquarySuit[suit].hash];
    const suitIcon = apiUrl.ui(reliquarySuit[suit].uiIcon);

    return {
      name: data.data.suit[suit].name,
      suitName: suitName,
      suitIcon: suitIcon,
      icon: apiUrl.uiReliquary(icon),
      level: level,
      affixList: affixList,
      setName: data.data.name,
      lore: data.data.suit[suit].description,
    };
  }

  static weapon(data, item) {
    const rarity = data.data.rank
    const level = item.level ? clamp(item.level, 1, weaponRarityMaxLevel[rarity]) : weaponRarityMaxLevel[rarity]
    const refine = item.index ? clamp(item.index, 1, 5) : 1;
    const lang = item.lang ? item.lang.toUpperCase() : defaultLang;
    let promote = item.promote;
    if (!promote) {
      data.data.upgrade.promote.forEach((element) => {
        if (element.unlockMaxLevel <= level) {
          promote = element.promoteLevel;
        }
      });
    }

    const promote_atk =
      data.data.upgrade.promote[promote].addProps[
        data.data.upgrade.prop[0].propType
      ];
    const base_atk =
      data.data.upgrade.prop[0].initValue *
      curveData.data[level].curveInfos[data.data.upgrade.prop[0].type];
    const affix = data.data.affix ? {
      name: Object.values(data.data.affix)[0].name,
      description: format(
        Object.values(data.data.affix)[0].upgrade[refine - 1]
      ),
      refine: refine,
    } : undefined;
    const main_stat = {
      type: data.data.upgrade.prop[1].propType,
      value:
        data.data.upgrade.prop[1].initValue *
        curveData.data[level].curveInfos[data.data.upgrade.prop[1].type],
    };

    return {
      name: data.data.name,
      type: data.data.type,
      rarity: rarity,
      icon: apiUrl.ui(data.data.icon),
      level: `${locData[lang]["level"]} ${level}`,
      affix: affix,
      base_atk: base_atk + promote_atk,
      main_stat: main_stat,
      lore: data.data.description,
    };
  }

  static talent(data, item) {
    const level = item.level ? clamp(parseInt(item.level), 1, 15) : 8;
    const index = item.index ? parseInt(item.index) : 0;
    const lang = item.lang ? item.lang.toUpperCase() : defaultLang;
    const talent = data.data.talent[index];
    const charName = data.data.name;
    const element = data.data.element;
    let multiplyers = [];
    if (talent.promote) {
      const params = talent.promote[level].params;
      const descriptions = talent.promote[level].description;
      descriptions.map((text) => {
        if (text == "") return;
        let [type, multiplyer] = format(text).split("|");
        multiplyer = formatParam(multiplyer, params);
        multiplyers.push([type, multiplyer]);
      });
    }

    const tags = [];
    const talentType = locData[lang][talentTypeHash[index]];
    if (talentType) tags.push(talentType);
    const talentlevel = [0,1,3].includes(index) ? `${locData[lang]["level"]} ${level}`: undefined;
    console.log(talentlevel)
    if (talentlevel) tags.push(talentlevel);
    const name = talent.name.startsWith(talentType)
      ? talent.name.slice(talentType.length + 2)
      : talent.name;

    return {
      name: name,
      description: talent.description,
      icon: apiUrl.ui(talent.icon),
      charName,
      tags,
      multiplyers,
      element,
    };
  }

  static constellation(data, item) {
    const lang = item.lang ? item.lang.toUpperCase() : defaultLang;
    const index = item.index ? parseInt(item.index) : 1;
    const constellation = data.data.constellation[index-1];
    const charName = data.data.name;
    const element = data.data.element;
    const talentTag = locData[lang]["constellation"] + ` ${romeNum[index]}`;
    const tags = [talentTag];

    return {
      icon: apiUrl.ui(constellation.icon),
      name: constellation.name,
      description: constellation.description,
      charName,
      element,
      tags,
    };
  }
}

class ItemTemplate {
  static artifact(data) {
    const html = `
          <div class="AmbrTooltip">
            <div class="header">
              <div class="icon" style="background-image: url(${
                data.icon
              })"></div>
              <div class="subName">
              <div class="reliquaryIcon" style="background-image: url(${
                data.suitIcon
                })"></div>
                <span>${data.suitName}</span>
                </div>
              <div class="name"><span>${data.name}</span></div>
            </div>
            <div class="scrollContent">
              ${data.affixList
                .map(
                  (description, index) => `
                <div class="title">
                  ${data.setName}
                  <span class="setPiece">${(index + 1) * 2}</span>
                </div>
                <div class="description">${format(description)}</div>
              `
                )
                .join("\n")}
              <div class="lore">
                <hr>
                <span>${data.lore}</span>
              </div>
            </div>
            ${svg.keyboardArrowDown}
          </div>
          `;
    return html;
  }

  static weapon(data) {
    const html = `
          <div class="AmbrTooltip Rarity-${data.rarity}">
            <div class="header">
              <div class="icon" style="background-image: url(${
                data.icon
              })"></div>
              <div class="name"><span>${data.name}</span></div>
              <div class="tag-row">
                <div class="tag">
                  <span>${data.level}</span>    
                </div>
                <div class="tag">
                  <i att-data-icon="FIGHT_PROP_ATTACK"></i> <span>${formatStat(
                    "FIGHT_PROP_ATTACK",
                    data.base_atk
                  )}</span>
                </div>
                ${data.main_stat.value ? `
                <div class="tag">
                  <i att-data-icon="${data.main_stat.type}"></i> <span>${formatStat(
                    data.main_stat.type,
                    data.main_stat.value
                  )}</span>
                </div>`: ``}
              </div>
            </div>
            <div class="scrollContent">
                ${data.affix ? `
                  <div class="title">${data.affix.name}<span style="color:wheat">R${
                  data.affix.refine
                }</span></div>
                <div class="description">${format(data.affix.description)}</div>
                ` : ``}
              <hr>
              <div class="lore">
                <span>${data.lore}</span>
              </div>
            </div>
            ${svg.keyboardArrowDown}
          </div>
          `;
    return html;
  }

  static talent(data) {
    const html = `
          <div class="AmbrTooltip ${data.element}">
            <div class="header">
              <div class="icon" id="talent">
                <div class="talent">
                  ${svg.circl}
                  <img class="talentIcon" src="${data.icon}">
                </div>
              </div>
              <div class="subName"><span>${data.charName}</span></div>
              <div class="name" id="talent">${data.name}</div>
              <div class="tag-row">
                ${data.tags
                  .map(
                    (tag) => `
                  <div class="tag">
                    <span>${tag}</span>
                  </div>
                `
                  )
                  .join("\n")}
              </div>
            </div>
            <div class="scrollContent">
              <div class="description">${format(data.description)}</div>
                ${
                  data.multiplyers.length != 0
                    ? `
                <hr>
                <div class="table">
                  ${data.multiplyers
                    .map(
                      ([type, value]) => `
                    <div class="tableStat">
                      <span style="color:wheat">${type}</span><span>${value}</span>
                    </div>
                  `
                    )
                    .join("\n")}
              </div>`
                    : ``
                }
            </div>
            ${svg.keyboardArrowDown}
          </div>
          `;
    return html;
  }

  static constellation(data) {
    const html = `
          <div class="AmbrTooltip ${data.element}">
            <div class="header">
              <div class="icon" id="talent">
                <div class="talent">
                  ${svg.circl}
                  <img class="talentIcon" src="${data.icon}">
                </div>
              </div>
              <div class="subName"><span>${data.charName}</span></div>
              <div class="name" id="talent">${data.name}</div>
              <div class="tag-row">
                ${data.tags
                  .map(
                    (tag) => `
                  <div class="tag">
                    <span>${tag}</span>
                  </div>
                `
                  )
                  .join("\n")}
              </div>
            </div>
            <div class="scrollContent">
              <div class="description">${format(data.description)}</div>
            </div>
            ${svg.keyboardArrowDown}
          </div>
          `;

    return html;
  }
}

function attachAmbrTooltipEventListener(element) {
  const item = {
    id: element.getAttribute("data-gi-id"),
    type: element.getAttribute("data-gi-type"),
    level: element.getAttribute("data-gi-level"),
    index: element.getAttribute("data-gi-index"),
    lang: element.getAttribute("data-gi-lang"),
  };

  element.addEventListener("mouseenter", async () => {
    isHovered = true;
    try {
      abortState = new AbortController();
      const lang = item.lang ? item.lang.toUpperCase() : defaultLang;
      const data = await fetchData(item.id, item.type, lang, abortState);
      formatedData = DataFormat[item.type](data, item);
      ambrModule.innerHTML = ItemTemplate[item.type](formatedData);
      setScrollArrowState();
      positionTooltip(
        lastMouseMove,
        ambrModule.querySelector("div.AmbrTooltip")
      );
    } catch (error) {
      console.log(error);
      hideTooltip(ambrModule.querySelector("div.AmbrTooltip"));
    }
  });

  element.addEventListener("mouseleave", () => {
    isHovered = false;
    if (abortState) {
      abortState.abort();
      abortState = null;
    }
    ambrModule.querySelector(".scrollContent").scrollTop = 0;
    hideTooltip(ambrModule.querySelector("div.AmbrTooltip"));
  });

  element.addEventListener("mousemove", (event) => {
    if (!isHovered) {
      return;
    }
    lastMouseMove = event;
    positionTooltip(event, ambrModule.querySelector("div.AmbrTooltip"));
  });

  element.addEventListener("wheel", (event) => {
    event.preventDefault();
    scrollContent = ambrModule.querySelector(".scrollContent");
    scrollContent.scrollTop += event.deltaY;
    setScrollArrowState();
  });
}

function scanAndAttachTooltipEvents() {
  const giElements = document.querySelectorAll(
    '[data-gi-type="weapon"], [data-gi-type="artifact"], [data-gi-type="talent"], [data-gi-type="constellation"]'
  );
  giElements.forEach((element) => {
    attachAmbrTooltipEventListener(element);
  });
}

var ambrModule = createAmbrModule();

scanAndAttachTooltipEvents();
const observer = new MutationObserver(() => {
  scanAndAttachTooltipEvents(); // Rescan if DOM changes
});
