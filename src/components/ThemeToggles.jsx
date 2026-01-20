import { useEffect, useState } from "react";

const DEFAULT_MODE = "dark";
const DEFAULT_SKIN = "aurora";

function apply(mode, skin) {
  const root = document.documentElement;
  root.dataset.mode = mode;
  root.dataset.skin = skin;
  root.style.colorScheme = mode;
}

export default function ThemeToggles({ showSkins = true }) {
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
            <img className="darkmode" src="/dark.svg" alt="" />
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

        {showSkins && (
          <div className="skinToggle">
            <button
              type="button"
              className={`skinToggle__btn ${
                skin === "aurora" ? "skinToggle__btn--active" : ""
              }`}
              aria-label="Skin carrusel"
              aria-pressed={skin === "aurora" ? "true" : "false"}
              onClick={() => {
                const next = "aurora";
                if ("startViewTransition" in document) {
                  document.startViewTransition(() => setSkin(next));
                } else {
                  setSkin(next);
                }
              }}
            >
              <img src="/carousel.svg" alt="" />
            </button>

            <button
              type="button"
              className={`skinToggle__btn ${
                skin === "luxe" ? "skinToggle__btn--active" : ""
              }`}
              aria-label="Skin cuadrA-cula"
              aria-pressed={skin === "luxe" ? "true" : "false"}
              onClick={() => {
                const next = "luxe";
                if ("startViewTransition" in document) {
                  document.startViewTransition(() => setSkin(next));
                } else {
                  setSkin(next);
                }
              }}
            >
              <img src="/grid.svg" alt="" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

