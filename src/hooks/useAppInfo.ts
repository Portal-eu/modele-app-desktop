import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { AppInfo } from "../types";

// Exemple d'appel d'une commande Rust (src-tauri/src/commands).
export function useAppInfo(): AppInfo | null {
  const [info, setInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    invoke<AppInfo>("app_info")
      .then(setInfo)
      .catch((erreur: unknown) => console.error("app_info :", erreur));
  }, []);

  return info;
}
