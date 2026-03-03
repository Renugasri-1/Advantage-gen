import { useEffect, useRef } from "react";
import { Canvas, Image, Textbox } from "fabric";

export default function Editor({ imageUrl }) {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    if (!imageUrl) return;

    if (fabricRef.current) {
      fabricRef.current.dispose();
    }

    const canvasWidth = 800;
    const canvasHeight = 600;

    const canvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      selection: true,
    });

    fabricRef.current = canvas;

    const loadImage = async () => {
  try {
    const img = await Image.fromURL(imageUrl, {
      crossOrigin: "anonymous",
    });

    canvas.clear();

    // Get REAL original image size
    const originalWidth = img.width;
    const originalHeight = img.height;

    console.log("Original Image Size:", originalWidth, originalHeight);

    // Calculate scale to FIT inside canvas
    const scale = Math.min(
      canvasWidth / originalWidth,
      canvasHeight / originalHeight
    );

    // Set image properties safely
    img.set({
      scaleX: scale,
      scaleY: scale,
      originX: "center",
      originY: "center",
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      selectable: false,
      evented: false,
    });

    canvas.add(img);
    canvas.sendObjectToBack(img);

    // CTA Button (centered properly)
    const ctaText = new Textbox("Shop Now", {
      originX: "center",
      originY: "center",
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      fontSize: 30,
      fill: "white",
      backgroundColor: "green",
      padding: 10,
      selectable: true,
      editable: true,
    });

    canvas.add(ctaText);

    canvas.renderAll();
  } catch (error) {
    console.error("Image load error:", error);
  }
};

    loadImage();

    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  const handleDownload = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "final-design.png";
    link.click();
  };

  return (
    <div className="editor-section">
      <canvas ref={canvasRef} />
      <button className="download-btn" onClick={handleDownload}>
        Download Final Image
      </button>
    </div>
  );
}


