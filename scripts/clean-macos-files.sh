#!/bin/bash

# Script pour nettoyer les fichiers temporaires macOS
echo "🧹 Nettoyage des fichiers temporaires macOS..."

# Supprimer les fichiers ._*
find . -name "._*" -type f -delete

# Supprimer les fichiers .DS_Store
find . -name ".DS_Store" -type f -delete

echo "✅ Nettoyage terminé !"
