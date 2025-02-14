const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Méthode non autorisée" };
    }

    try {
        const data = new URLSearchParams(event.body);
        const filePath = path.join(__dirname, "../../data/signatures.csv");

        // Générer l’horodatage actuel (format universel)
        const timestamp = new Date().toISOString();
        const numero = Date.now();
        const newSignature = `${numero},${timestamp},${data.get("prenom")},${data.get("nom")}\n`;

        // Ajouter la signature dans le fichier CSV
        fs.appendFileSync(filePath, newSignature, "utf8");

        return {
            statusCode: 200,
            body: "Signature enregistrée avec succès",
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
