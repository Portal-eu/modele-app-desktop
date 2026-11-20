use crate::core::info::{self, AppInfo};
use crate::utils::erreur::Erreur;

/// Nom et version de l'app, lus depuis la configuration Tauri.
#[tauri::command]
pub fn app_info(app: tauri::AppHandle) -> Result<AppInfo, Erreur> {
    let paquet = app.package_info();
    info::construire(&paquet.name, &paquet.version.to_string())
}
