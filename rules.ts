import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  {
    description: "Revive dead Tilde key on Norwegian keyboard",
    manipulators: [
      {
        from: {
          key_code: "close_bracket",
        },
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["left_option"],
          },
          {
            key_code: "spacebar",
          },
        ],
        type: "basic",
      },
    ],
  },
  {
    description: "Revive dead backtick key on Norwegian keyboard",
    manipulators: [
      {
        from: {
          key_code: "equal_sign",
        },
        to: [
          {
            key_code: "equal_sign",
            modifiers: ["left_shift"],
          },
          {
            key_code: "spacebar",
          },
        ],
        type: "basic",
      },
    ],
  },

  ...createHyperSubLayers({
    a: {
      c: app("Claude", true),
      x: app("Codex", true),
      g: open("https://aistudio.google.com"),
    },
    // b = "B"rowse
    b: {
      r: open("https://reddit.com"),
    },
    // o = "Open" applications
    o: {
      1: app("1Password"),
      b: app("Firefox Developer Edition"),
      v: app("Visual Studio Code", true),
      s: app("Slack"),
      n: app("Notion"),
      t: app("WezTerm", true),
      m: app("Messenger", true),
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    // l: {
    //   // Coding layout
    //   c: shell`
    //     open -a "Visual Studio Code.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

    //     open -a "Terminal.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
    //   `,
    // },

    // w = "Window"
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: open(
        "raycast://extensions/raycast/window-management/previous-desktop"
      ),
      o: open("raycast://extensions/raycast/window-management/next-desktop"),
      h: open("raycast://extensions/raycast/window-management/left-half"),
      l: open("raycast://extensions/raycast/window-management/right-half"),
      f: open("raycast://extensions/raycast/window-management/maximize"),
      3: open("raycast://extensions/raycast/window-management/first-fourth"),
      4: open("raycast://extensions/raycast/window-management/center-half"),
      5: open("raycast://extensions/raycast/window-management/last-fourth"),
      6: open("raycast://extensions/raycast/window-management/left-half"),
      7: open("raycast://extensions/raycast/window-management/right-half"),
      8: open(
        "raycast://extensions/raycast/window-management/previous-display"
      ),
      9: open("raycast://extensions/raycast/window-management/next-display"),
      left_arrow: open(
        "raycast://extensions/raycast/window-management/move-left"
      ),
      right_arrow: open(
        "raycast://extensions/raycast/window-management/move-right"
      ),
      up_arrow: open(
        "raycast://extensions/raycast/window-management/toggle-fullscreen"
      ),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: open(
        `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
      ),
      // "D"o not disturb toggle
      d: open(`raycast://extensions/raycast/system/show-desktop`),
      // "T"heme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
      c: open("raycast://extensions/raycast/system/open-camera"),
      // 'v'oice
      v: app("Azure VPN Client", true),
      r: open("raycast://extensions/thomas/color-picker/pick-color"),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      s: {
        to: [{ key_code: "play_or_pause" }],
      },
      2: {
        to: [{ key_code: "play_or_pause" }],
      },
      w: {
        to: [{ key_code: "fastforward" }],
      },
      q: {
        to: [{ key_code: "rewind" }],
      },
      3: {
        to: [{ key_code: "fastforward" }],
      },
      1: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      n: open("raycast://script-commands/dismiss-notifications"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },
  }),
];

const simpleModifications = {
  simple_modifications: [
    {
      from: { key_code: "left_option" },
      to: [{ key_code: "left_command" }],
    },
    {
      from: { key_code: "left_command" },
      to: [{ key_code: "left_option" }],
    },
    {
      from: { key_code: "right_option" },
      to: [{ key_code: "right_command" }],
    },
    {
      from: { key_code: "right_command" },
      to: [{ key_code: "right_option" }],
    },
  ],
};

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
          devices: [
            {
              identifiers: {
                is_keyboard: true,
                is_pointing_device: true,
                product_id: 641,
                vendor_id: 13364,
              },
              ignore: false,
              ...simpleModifications,
            },
            {
              identifiers: {
                is_keyboard: true,
                product_id: 641,
                vendor_id: 13364,
              },
              ...simpleModifications,
            },
            {
              identifiers: {
                is_keyboard: true,
                product_id: 33,
                vendor_id: 9494,
              },
              ...simpleModifications,
            },
            {
              identifiers: { is_keyboard: true },
              simple_modifications: [
                {
                  from: { key_code: "grave_accent_and_tilde" },
                  to: [{ key_code: "non_us_backslash" }],
                },
                {
                  from: { key_code: "non_us_backslash" },
                  to: [{ key_code: "grave_accent_and_tilde" }],
                },
              ],
            },
          ],
          virtual_hid_keyboard: { keyboard_type_v2: "iso" },
        },
      ],
    },
    null,
    2
  )
);

