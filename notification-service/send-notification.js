const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const s3Client = new S3Client({});
const dbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dbClient);

exports.handler = async (event) => {
    for (const record of event.Records) {
        try {
            const { type, data } = JSON.parse(record.body);

            // 1. Aquí normalmente descargarías la plantilla de S3
            // const template = await s3Client.send(new GetObjectCommand({
            //     Bucket: "templates-email-notification",
            //     Key: `${type}.html`
            // }));

            console.log(`Enviando notificación de tipo: ${type} para el usuario.`);

            // 2. Guardar registro de la notificación enviada en DynamoDB
            await docClient.send(new PutCommand({
                TableName: "notification-table",
                Item: {
                    uuid: require("uuid").v4(),
                    type: type,
                    data: data,
                    createdAt: new Date().toISOString()
                }
            }));

        } catch (error) {
            console.error("Error en notificación:", error);
            // Enviar a la tabla de errores si algo falla
        }
    }
};