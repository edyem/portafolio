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
    <section className="card">
      <div className="row">
        <strong>Modo</strong>
        <button className="btn" type="button" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
          {mode === "dark" ? "Oscuro" : "Claro"}
        </button>

        <strong style={{ marginLeft: 8 }}>Skin</strong>
        <select value={skin} onChange={(e) => setSkin(e.target.value)}>
          <option value="aurora">Aurora</option>
          <option value="luxe">Luxe</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>
      <p className="muted" style={{ margin: "12px 0 0 0" }}>
        Demo: tokens CSS + isla React (sin login, sin query).
      </p>
    </section>
  );
}
