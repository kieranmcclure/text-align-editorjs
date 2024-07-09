class TextAlign {
  static leftAlignedIcon = '<path d="M17 9.5H3M21 4.5H3M21 14.5H3M17 19.5H3"/>';
  static centerAlignedIcon =
    '<path d="M19 9.5H5M21 4.5H3M21 14.5H3M19 19.5H5"/>';
  static rightAlignedIcon =
    '<path d="M21 9.5H7M21 4.5H3M21 14.5H3M21 19.5H7"/>';
  static justifyAlignedIcon =
    '<path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3"/>';

  static get isInline() {
    return true; // Set to false to ensure it works with block content
  }

  static get sanitize() {
    return {
      text: {
        br: true,
      },
      alignment: {},
    };
  }

  static get toolbox() {
    return {
      icon: "<svg></svg>", // Add your icon here
      title: "Text Align",
    };
  }

  constructor({ data, config, api }) {
    this.api = api;
    this.data = {
      text: data.text || "",
      alignment: data.alignment || "left",
    };

    this.settings = [
      {
        name: "left",
        icon: TextAlign.leftAlignedIcon,
      },
      {
        name: "center",
        icon: TextAlign.centerAlignedIcon,
      },
      {
        name: "right",
        icon: TextAlign.rightAlignedIcon,
      },
      {
        name: "justify",
        icon: TextAlign.justifyAlignedIcon,
      },
    ];

    this._CSS = {
      wrapper: "ce-paragraph",
      alignment: {
        left: "ce-paragraph--left",
        center: "ce-paragraph--center",
        right: "ce-paragraph--right",
        justify: "ce-paragraph--justify",
      },
    };
  }

  render() {
    this._element = document.createElement("div");
    this._element.classList.add(this._CSS.wrapper);
    this._element.classList.add(this._CSS.alignment[this.data.alignment]);
    this._element.contentEditable = true;
    this._element.innerHTML = this.data.text;

    this._element.addEventListener("keyup", () => {
      this.data.text = this._element.innerHTML;
    });

    return this._element;
  }

  save(blockContent) {
    return {
      text: blockContent.innerHTML,
      alignment: this.data.alignment,
    };
  }

  renderSettings() {
    const wrapper = document.createElement("div");

    this.settings.forEach((tune) => {
      const button = document.createElement("div");
      button.classList.add("cdx-settings-button");
      button.innerHTML = tune.icon;

      if (this.data.alignment === tune.name) {
        button.classList.add(this.api.styles.settingsButtonActive);
      }

      button.addEventListener("click", () => {
        this._toggleTune(tune.name);

        wrapper.querySelectorAll(".cdx-settings-button").forEach((btn) => {
          btn.classList.remove(this.api.styles.settingsButtonActive);
        });

        button.classList.add(this.api.styles.settingsButtonActive);
      });

      wrapper.appendChild(button);
    });

    return wrapper;
  }

  _toggleTune(tune) {
    this.data.alignment = tune;

    this._element.classList.remove(
      this._CSS.alignment.left,
      this._CSS.alignment.center,
      this._CSS.alignment.right,
      this._CSS.alignment.justify
    );
    this._element.classList.add(this._CSS.alignment[tune]);
  }
}

export default TextAlign;
