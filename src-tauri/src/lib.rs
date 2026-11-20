mod commands;
mod core;
mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    env_logger::init();
    log::info!("Démarrage");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![commands::info::app_info])
        .run(tauri::generate_context!())
        .expect("Erreur lors du lancement de l'application");
}
