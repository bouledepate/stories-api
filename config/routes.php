<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return static function (App $app, array $container): void {
    $app->get('/health', static function (ServerRequestInterface $request, ResponseInterface $response): ResponseInterface {
        $response->getBody()->write((string) json_encode(['status' => 'ok']));

        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/auth/register', $container['registerAction']);
    $app->post('/auth/login', $container['loginAction']);
    $app->get('/auth/me', $container['meAction']);

    $app->post('/rooms', $container['createRoomAction']);
    $app->post('/rooms/{roomId}/join', $container['joinRoomAction']);
    $app->post('/rooms/{roomId}/leave', $container['leaveRoomAction']);
    $app->post('/rooms/{roomId}/ready', $container['readyAction']);
    $app->post('/rooms/{roomId}/start', $container['startGameAction']);
    $app->get('/rooms/{roomId}', $container['getRoomStateAction']);
    $app->post('/rooms/{roomId}/actions', $container['submitAction']);

    $app->get('/admin/cards', $container['listCardsAction']);
    $app->patch('/admin/cards/{deck}/{cardCode}', $container['patchCardAction']);
    $app->get('/admin/effects', $container['listEffectsAction']);
};
