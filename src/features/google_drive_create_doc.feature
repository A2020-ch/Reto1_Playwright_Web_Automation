# language: es
Característica: Creación de un nuevo documento en Google Drive

  Regla: Debe ser posible crear un documento de Google Docs desde Google Drive con un nombre dinámico

  @google_drive
  Escenario: Crear un documento de texto dinámico en Google Drive
    Dado que el usuario navega a la vista del buscador de Google
    Cuando abre el menú de Google Apps
    Y navega hacia Google Drive con sesión autenticada
    Y crea un nuevo documento de tipo Google Docs
    Y le asigna como nombre "E01_Axel_Chacaliaza_<fecha_hora_guardado>"
    Entonces el título del documento debe ser actualizado correctamente con el patrón esperado
    Y el archivo guardado debe aparecer en Mi unidad de Google Drive
