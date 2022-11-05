import { styled } from "./styled";
import { usePhoneModelStore } from "./components/phone-model/hooks";
import CommandPrompt from "./components/CommandPrompt";
import VideoPlayer from "./components/VideoPlayer";

export default function App() {
  const setBackColor = usePhoneModelStore((s) => s.setBackColor);

  return (
    <>
      <VideoWrapper>
        <VideoPlayer />
      </VideoWrapper>

      <ColorSwatches>
        <ColorSwatch
          style={{ backgroundColor: "#fcba03" }}
          onClick={() => setBackColor("#fcba03")}
        />
        <ColorSwatch
          style={{ backgroundColor: "#196eff" }}
          onClick={() => setBackColor("#196eff")}
        />
        <ColorSwatch
          style={{ backgroundColor: "#34c40c" }}
          onClick={() => setBackColor("#34c40c")}
        />
      </ColorSwatches>
      <CommandPrompt />
    </>
  );
}

// ⌘ + K

const VideoWrapper = styled("div", {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ColorSwatches = styled("div", {
  position: "absolute",
  bottom: 32,
  left: 32,
  zIndex: 1,
  display: "flex",
  gap: 8,
});

const ColorSwatch = styled("button", {
  height: 32,
  width: 32,
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(0.9)",
  },
  "&:active": {
    filter: "brightness(0.8)",
  },
});
