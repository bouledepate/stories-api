<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Handlers\Strategies\RequestResponse;
use Stories\Shared\Web\UiIndexAction;
use Stories\Slices\Auth\Action\LoginAction;
use Stories\Slices\Auth\Action\MeAction;
use Stories\Slices\Auth\Action\RegisterAction;
use Stories\Slices\Auth\Action\ChangePasswordAction;
use Stories\Slices\Auth\Action\UpdateMeAction;
use Stories\Slices\Rooms\Action\CreateRoomAction;
use Stories\Slices\Rooms\Action\GetCurrentRoomAction;
use Stories\Slices\Rooms\Action\GetRoomStateAction;
use Stories\Slices\Rooms\Action\JoinByInviteCodeAction;
use Stories\Slices\Rooms\Action\JoinRoomAction;
use Stories\Slices\Rooms\Action\KickParticipantAction;
use Stories\Slices\Rooms\Action\LeaveRoomAction;
use Stories\Slices\Rooms\Action\ListLobbiesAction;
use Stories\Slices\Rooms\Action\BanParticipantAction;
use Stories\Slices\Rooms\Action\RegenerateInviteCodeAction;
use Stories\Slices\Rooms\Action\ReadyAction;
use Stories\Slices\Rooms\Action\TransferOwnershipAction;
use Stories\Slices\Rooms\Action\UpdateRoomSettingsAction;

return static function (App $app): void {
    $app->getRouteCollector()->setDefaultInvocationStrategy(new RequestResponse());

    $app->get('/', UiIndexAction::class);

    $app->get('/health', static function (ServerRequestInterface $request, ResponseInterface $response): ResponseInterface {
        $response->getBody()->write((string) json_encode(['status' => 'ok']));

        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/auth/register', RegisterAction::class);
    $app->post('/auth/login', LoginAction::class);
    $app->get('/auth/me', MeAction::class);
    $app->patch('/auth/me', UpdateMeAction::class);
    $app->post('/auth/change-password', ChangePasswordAction::class);

    $app->post('/rooms', CreateRoomAction::class);
    $app->get('/lobbies', ListLobbiesAction::class);
    $app->post('/rooms/{roomId}/join', JoinRoomAction::class);
    $app->post('/rooms/join-by-code', JoinByInviteCodeAction::class);
    $app->post('/rooms/{roomId}/leave', LeaveRoomAction::class);
    $app->post('/rooms/{roomId}/ready', ReadyAction::class);
    $app->get('/rooms/current', GetCurrentRoomAction::class);
    $app->get('/rooms/{roomId}', GetRoomStateAction::class);
    $app->patch('/rooms/{roomId}/settings', UpdateRoomSettingsAction::class);
    $app->post('/rooms/{roomId}/invite-code/regenerate', RegenerateInviteCodeAction::class);
    $app->post('/rooms/{roomId}/participants/{userId}/transfer-ownership', TransferOwnershipAction::class);
    $app->post('/rooms/{roomId}/participants/{userId}/kick', KickParticipantAction::class);
    $app->post('/rooms/{roomId}/participants/{userId}/ban', BanParticipantAction::class);
};
