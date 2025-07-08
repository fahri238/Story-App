const PushNotification = {
  VAPID_PUBLIC_KEY:
    "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",

  init() {
    if (!("PushManager" in window)) {
      return;
    }
    this._requestPermission();
  },

  async _requestPermission() {
    try {
      const permissionResult = await Notification.requestPermission();
      if (permissionResult === "granted") {
        await this._subscribeToPush();
      }
    } catch (error) {
      console.error("Failed to request notification permission:", error);
    }
  },

  async _subscribeToPush() {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const subscription =
        await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this._urlBase64ToUint8Array(
            this.VAPID_PUBLIC_KEY
          ),
        });
      console.log(
        "Successfully subscribed to push notifications:",
        subscription
      );
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
    }
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
};

export default PushNotification;
