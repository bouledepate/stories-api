<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Handlers\Strategies\RequestResponse;
use Stories\Presentation\Http\Action\Auth\ChangePasswordAction;
use Stories\Presentation\Http\Action\Auth\LoginAction;
use Stories\Presentation\Http\Action\Auth\MeAction;
use Stories\Presentation\Http\Action\Auth\RegisterAction;
use Stories\Presentation\Http\Action\Auth\UpdateMeAction;
use Stories\Presentation\Http\Action\Matches\CreateMatchAction;
use Stories\Presentation\Http\Action\Matches\GetMatchStateAction;
use Stories\Presentation\Http\Action\Matches\PlayCardAction;
use Stories\Presentation\Http\Action\Matches\StartRoundAction;
use Stories\Presentation\Http\Action\Rooms\BanParticipantAction;
use Stories\Presentation\Http\Action\Rooms\CreateRoomAction;
use Stories\Presentation\Http\Action\Rooms\GetCurrentRoomAction;
use Stories\Presentation\Http\Action\Rooms\GetRoomMatchAction;
use Stories\Presentation\Http\Action\Rooms\GetRoomStateAction;
use Stories\Presentation\Http\Action\Rooms\JoinByInviteCodeAction;
use Stories\Presentation\Http\Action\Rooms\JoinRoomAction;
use Stories\Presentation\Http\Action\Rooms\KickParticipantAction;
use Stories\Presentation\Http\Action\Rooms\LeaveRoomAction;
use Stories\Presentation\Http\Action\Rooms\ListLobbiesAction;
use Stories\Presentation\Http\Action\Rooms\ReadyAction;
use Stories\Presentation\Http\Action\Rooms\RegenerateInviteCodeAction;
use Stories\Presentation\Http\Action\Rooms\TransferOwnershipAction;
use Stories\Presentation\Http\Action\Rooms\UpdateRoomSettingsAction;
use Stories\Presentation\Web\UiIndexAction;

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
    $app->get('/rooms/{roomId}/match', GetRoomMatchAction::class);
    $app->patch('/rooms/{roomId}/settings', UpdateRoomSettingsAction::class);
    $app->post('/rooms/{roomId}/invite-code/regenerate', RegenerateInviteCodeAction::class);
    $app->post('/rooms/{roomId}/participants/{userId}/transfer-ownership', TransferOwnershipAction::class);
    $app->post('/rooms/{roomId}/participants/{userId}/kick', KickParticipantAction::class);
    $app->post('/rooms/{roomId}/participants/{userId}/ban', BanParticipantAction::class);

    $app->post('/matches', CreateMatchAction::class);
    $app->post('/matches/{matchId}/start-round', StartRoundAction::class);
    $app->get('/matches/{matchId}', GetMatchStateAction::class);
    $app->post('/matches/{matchId}/play-card', PlayCardAction::class);
};
