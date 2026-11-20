use serde::Serialize;

use crate::utils::erreur::Erreur;

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct AppInfo {
    pub nom: String,
    pub version: String,
}

pub fn construire(nom: &str, version: &str) -> Result<AppInfo, Erreur> {
    let nom = nom.trim();
    if nom.is_empty() {
        return Err(Erreur::Invalide("nom de l'app vide".into()));
    }
    Ok(AppInfo {
        nom: nom.to_owned(),
        version: version.trim().to_owned(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn construit_les_infos() {
        let info = construire(" Mon app ", "1.2.3").unwrap();
        assert_eq!(info.nom, "Mon app");
        assert_eq!(info.version, "1.2.3");
    }

    #[test]
    fn refuse_un_nom_vide() {
        assert!(construire("  ", "1.0.0").is_err());
    }
}
