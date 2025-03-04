import { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Undo, Redo, Maximize, Minimize, Upload } from "lucide-react";
import { toPng, toJpeg, toSvg } from "html-to-image";

export default function LogoMaker() {
  const [text, setText] = useState("Your Logo");
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [gradient, setGradient] = useState(false);
  const [gradientColors, setGradientColors] = useState(["#000000", "#ffffff"]);
  const [fontSize, setFontSize] = useState(50);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textShadow, setTextShadow] = useState("0 0 5px rgba(0,0,0,0.5)");
  const [textOutline, setTextOutline] = useState("none");
  const [borderRadius, setBorderRadius] = useState(8);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [customFont, setCustomFont] = useState(null);

  const fonts = ["Arial", "Poppins", "Roboto", "Montserrat", "Pacifico"];
  const fontWeights = ["normal", "bold", "bolder", "lighter"];
  const fontStyles = ["normal", "italic"];

  const logoRef = useRef(null);

  // Auto-save to localStorage
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("logoState"));
    if (savedState) {
      setText(savedState.text);
      setColor(savedState.color);
      setBgColor(savedState.bgColor);
      setFontSize(savedState.fontSize);
      setFontFamily(savedState.fontFamily);
      setFontWeight(savedState.fontWeight);
      setFontStyle(savedState.fontStyle);
      setTextShadow(savedState.textShadow);
      setTextOutline(savedState.textOutline);
      setBorderRadius(savedState.borderRadius);
    }
  }, []);

  const saveState = () => {
    const state = { text, color, bgColor, fontSize, fontFamily, fontWeight, fontStyle, textShadow, textOutline, borderRadius };
    setHistory([...history, state]);
    setFuture([]);
    localStorage.setItem("logoState", JSON.stringify(state));
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setFuture([...future, { text, color, bgColor, fontSize, fontFamily, fontWeight, fontStyle, textShadow, textOutline, borderRadius }]);
      setHistory(history.slice(0, -1));
      applyState(previousState);
    }
  };

  const redo = () => {
    if (future.length > 0) {
      const nextState = future[future.length - 1];
      setHistory([...history, { text, color, bgColor, fontSize, fontFamily, fontWeight, fontStyle, textShadow, textOutline, borderRadius }]);
      setFuture(future.slice(0, -1));
      applyState(nextState);
    }
  };

  const applyState = (state) => {
    setText(state.text);
    setColor(state.color);
    setBgColor(state.bgColor);
    setFontSize(state.fontSize);
    setFontFamily(state.fontFamily);
    setFontWeight(state.fontWeight);
    setFontStyle(state.fontStyle);
    setTextShadow(state.textShadow);
    setTextOutline(state.textOutline);
    setBorderRadius(state.borderRadius);
  };

  const downloadLogo = (format) => {
    const node = logoRef.current;
    if (node) {
      let exportFunction;
      switch (format) {
        case "png":
          exportFunction = toPng;
          break;
        case "jpeg":
          exportFunction = toJpeg;
          break;
        case "svg":
          exportFunction = toSvg;
          break;
        default:
          exportFunction = toPng;
      }
      exportFunction(node, { backgroundColor: gradient ? gradientColors[0] : bgColor })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `logo.${format}`;
          link.click();
        })
        .catch((err) => console.log(err));
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleFontUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fontUrl = URL.createObjectURL(file);
      const fontName = file.name.replace(/\.[^/.]+$/, "");
      const newFont = new FontFace(fontName, `url(${fontUrl})`);
      newFont.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        setFontFamily(fontName);
        setCustomFont(fontName);
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold">World's Best Logo Maker</h1>
      <Card className="p-4 w-full max-w-lg">
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="Enter Logo Text" value={text} onChange={(e) => { saveState(); setText(e.target.value); }} />
          <div className="flex items-center gap-4">
            <div>
              <p>Text Color</p>
              <ChromePicker color={color} onChange={(c) => { saveState(); setColor(c.hex); }} disableAlpha />
            </div>
            <div>
              <p>Background Color</p>
              <ChromePicker color={bgColor} onChange={(c) => { saveState(); setBgColor(c.hex); }} disableAlpha />
            </div>
          </div>
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Font Size"
              value={fontSize}
              onChange={(e) => { saveState(); setFontSize(parseInt(e.target.value)); }}
            />
            <select
              className="p-2 rounded-md text-black"
              value={fontFamily}
              onChange={(e) => { saveState(); setFontFamily(e.target.value); }}
            >
              {fonts.map((font) => (
                <option key={font} value={font}>{font}</option>
              ))}
              {customFont && <option value={customFont}>{customFont}</option>}
            </select>
          </div>
          <div className="flex gap-4">
            <select
              className="p-2 rounded-md text-black"
              value={fontWeight}
              onChange={(e) => { saveState(); setFontWeight(e.target.value); }}
            >
              {fontWeights.map((weight) => (
                <option key={weight} value={weight}>{weight}</option>
              ))}
            </select>
            <select
              className="p-2 rounded-md text-black"
              value={fontStyle}
              onChange={(e) => { saveState(); setFontStyle(e.target.value); }}
            >
              {fontStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
          <Input
            placeholder="Text Shadow (e.g., 0 0 5px rgba(0,0,0,0.5))"
            value={textShadow}
            onChange={(e) => { saveState(); setTextShadow(e.target.value); }}
          />
          <Input
            placeholder="Text Outline (e.g., 2px solid black)"
            value={textOutline}
            onChange={(e) => { saveState(); setTextOutline(e.target.value); }}
          />
          <Input
            type="number"
            placeholder="Border Radius"
            value={borderRadius}
            onChange={(e) => { saveState(); setBorderRadius(parseInt(e.target.value)); }}
          />
          <div
            ref={logoRef}
            className="flex justify-center items-center w-full h-40 rounded-md"
            style={{
              background: gradient ? `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})` : bgColor,
              borderRadius: `${borderRadius}px`,
            }}
          >
            <p
              style={{
                color,
                fontSize: `${fontSize}px`,
                fontFamily,
                fontWeight,
                fontStyle,
                textShadow,
                outline: textOutline,
              }}
            >
              {text}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={undo} disabled={history.length === 0}>
              <Undo size={16} /> Undo
            </Button>
            <Button onClick={redo} disabled={future.length === 0}>
              <Redo size={16} /> Redo
            </Button>
            <Button onClick={toggleFullScreen}>
              {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
              {isFullScreen ? "Exit Fullscreen" : "Fullscreen Preview"}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => downloadLogo("png")} className="flex items-center gap-2">
              <Download size={16} /> Download PNG
            </Button>
            <Button onClick={() => downloadLogo("jpeg")} className="flex items-center gap-2">
              <Download size={16} /> Download JPG
            </Button>
            <Button onClick={() => downloadLogo("svg")} className="flex items-center gap-2">
              <Download size={16} /> Download SVG
            </Button>
          </div>
          <div className="flex gap-2">
            <label htmlFor="font-upload" className="flex items-center gap-2 cursor-pointer">
              <Upload size={16} /> Upload Custom Font
              <input id="font-upload" type="file" accept=".ttf,.otf" className="hidden" onChange={handleFontUpload} />
            </label>
          </div>
        </CardContent>
      </Card>
      {isFullScreen && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
          <div
            className="flex justify-center items-center w-full h-full"
            style={{
              background: gradient ? `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})` : bgColor,
              borderRadius: `${borderRadius}px`,
            }}
          >
            <p
              style={{
                color,
                fontSize: `${fontSize}px`,
                fontFamily,
                fontWeight,
                fontStyle,
                textShadow,
                outline: textOutline,
              }}
            >
              {text}
            </p>
          </div>
          <Button onClick={toggleFullScreen} className="absolute top-4 right-4">
            <Minimize size={16} /> Exit Fullscreen
          </Button>
        </div>
      )}
    </div>
  );
}
