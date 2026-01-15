import { useEffect, useState } from "react";

const DEFAULT_MODE = "dark";
const DEFAULT_SKIN = "aurora";

function apply(mode, skin) {
  const root = document.documentElement;
  root.dataset.mode = mode;
  root.dataset.skin = skin;
  root.style.colorScheme = mode;
}

export default function ThemeToggles() {
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [skin, setSkin] = useState(DEFAULT_SKIN);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode") || DEFAULT_MODE;
    const savedSkin = localStorage.getItem("skin") || DEFAULT_SKIN;
    setMode(savedMode);
    setSkin(savedSkin);
    apply(savedMode, savedSkin);
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
    localStorage.setItem("skin", skin);
    apply(mode, skin);
  }, [mode, skin]);

  return (
    <section className="header">
      <div className="row rtl">
        <button
          className="toggle"
          type="button"
          aria-label="Cambiar modo oscuro/claro"
          aria-pressed={mode === "dark" ? "true" : "false"}
          onClick={() => {
            const next = mode === "dark" ? "light" : "dark";
            if ("startViewTransition" in document) {
              document.startViewTransition(() => setMode(next));
            } else {
              setMode(next);
            }
          }}
        >
          <span className="toggle__trackIcons" aria-hidden="true">
            <img src="/dark.svg" alt="" />
            <img src="/light.svg" alt="" />
          </span>

          <span className="toggle__knob" aria-hidden="true">
            <img
              className="toggle__icon"
              src={mode === "dark" ? "/dark.svg" : "/light.svg"}
              alt=""
            />
          </span>
        </button>

        <strong style={{ marginLeft: 8 }}>Skin</strong>
        <select
          value={skin}
          onChange={(e) => {
            const next = e.target.value;
            if ("startViewTransition" in document) {
              document.startViewTransition(() => setSkin(next));
            } else {
              setSkin(next);
            }
          }}
        >
          <option value="aurora">Aurora</option>
          <option value="luxe">Luxe</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>
    </section>
  );
}
