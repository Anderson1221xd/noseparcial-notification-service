# Pig Bank - Notification Service

## Descripción

Este microservicio se encarga de enviar notificaciones por correo electrónico a los usuarios cuando ocurren eventos dentro del sistema.

El servicio es completamente asíncrono y basado en eventos utilizando colas SQS.

## Funcionalidades

* Envío de notificaciones por email
* Manejo de múltiples plantillas de notificación
* Registro de notificaciones enviadas
* Manejo de errores mediante DLQ

## Eventos soportados

WELCOME
USER.LOGIN
USER.UPDATE
CARD.CREATE
CARD.ACTIVATE
TRANSACTION.PURCHASE
TRANSACTION.SAVE
TRANSACTION.PAID
REPORT.ACTIVITY

## Flujo del sistema

Otros microservicios envían eventos a una cola SQS.
El servicio de notificaciones consume esos eventos y envía correos electrónicos a los usuarios.

## Servicios AWS utilizados

* AWS Lambda
* Amazon SQS
* Amazon S3
* Amazon DynamoDB

## Colas utilizadas

notification-email-sqs
notification-email-error-sqs

## Estructura del proyecto

notification-service
│
├── send-notification.js
└── send-notification-error.js

## Almacenamiento

Plantillas de correo almacenadas en:

S3 Bucket
templates-email-notification

Registros de notificaciones:

notification-table
notification-error-table

## Arquitectura

Eventos → SQS → Lambda → S3 (plantillas)
↓
DynamoDB

## Tecnologías

* Node.js
* AWS SDK v3
* Arquitectura basada en eventos
