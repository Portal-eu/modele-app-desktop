use serde::{Serialize, Serializer};

/// Erreurs renvoyées à l'interface (sérialisées en texte).
#[derive(Debug, thiserror::Error)]
pub enum Erreur {
    #[error("donnée invalide : {0}")]
    Invalide(String),
}

impl Serialize for Erreur {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(&self.to_string())
    }
}
