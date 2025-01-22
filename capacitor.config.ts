import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.quitequiet.gridsome",
  appName: "gridsome",
  webDir: "build",
  plugins: {
    SplashScreen: {
      backgroundColor: "#203a43",
      showSpinner: true,
      spinnerColor: "#00ffbf",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
}

export default config
