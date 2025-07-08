const CameraHelper = {
  async init(videoElement) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoElement.srcObject = stream;
      return stream;
    } catch (error) {
      console.error("Kamera tidak dapat diakses:", error);
      throw new Error(
        "Tidak bisa mengakses kamera. Pastikan Anda memberikan izin."
      );
    }
  },

  takePicture(videoElement, canvasElement) {
    const context = canvasElement.getContext("2d");
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    context.drawImage(
      videoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    return new Promise((resolve) => {
      canvasElement.toBlob(resolve, "image/jpeg");
    });
  },

  stopStream(stream) {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      console.log("Stream kamera dihentikan.");
    }
  },
};

export default CameraHelper;
