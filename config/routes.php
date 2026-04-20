<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Stories\Shared\Web\UiIndexAction;
use Stories\Slices\Admin\Action\ListCardsAction;
use Stories\Slices\Admin\Action\ListEffectsAction;
use Stories\Slices\Admin\Action\PatchCardAction;
use Stories\Slices\Auth\Action\LoginAction;
use Stories\Slices\Auth\Action\MeAction;
use Stories\Slices\Auth\Action\RegisterAction;
use Stories\Slices\Rooms\Action\CreateRoomAction;
use Stories\Slices\Rooms\Action\GetRoomStateAction;
use Stories\Slices\Rooms\Action\JoinRoomAction;
use Stories\Slices\Rooms\Action\LeaveRoomAction;
use Stories\Slices\Rooms\Action\ReadyAction;
use Stories\Slices\Rooms\Action\StartGameAction;
use Stories\Slices\Rooms\Action\SubmitAction;

return static function (App $app): void {
    $app->get('/', UiIndexAction::class);

    $app->get('/health', static function (ServerRequestInterface $request, ResponseInterface $response): ResponseInterface {
        $response->getBody()->write((string) json_encode(['status' => 'ok']));

        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/auth/register', RegisterAction::class);
    $app->post('/auth/login', LoginAction::class);
    $app->get('/auth/me', MeAction::class);

    $app->post('/rooms', CreateRoomAction::class);
    $app->post('/rooms/{roomId}/join', JoinRoomAction::class);
    $app->post('/rooms/{roomId}/leave', LeaveRoomAction::class);
    $app->post('/rooms/{roomId}/ready', ReadyAction::class);
    $app->post('/rooms/{roomId}/start', StartGameAction::class);
    $app->get('/rooms/{roomId}', GetRoomStateAction::class);
    $app->post('/rooms/{roomId}/actions', SubmitAction::class);

    $app->get('/admin/cards', ListCardsAction::class);
    $app->patch('/admin/cards/{deck}/{cardCode}', PatchCardAction::class);
    $app->get('/admin/effects', ListEffectsAction::class);
};
