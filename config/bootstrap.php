<?php

declare(strict_types=1);

use Stories\Shared\Database\ConnectionFactory;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Shared\Security\JwtService;
use Stories\Slices\Admin\Action\ListCardsAction;
use Stories\Slices\Admin\Action\ListEffectsAction;
use Stories\Slices\Admin\Action\PatchCardAction;
use Stories\Slices\Admin\Service\AdminService;
use Stories\Slices\Auth\Action\LoginAction;
use Stories\Slices\Auth\Action\MeAction;
use Stories\Slices\Auth\Action\RegisterAction;
use Stories\Slices\Auth\Service\AuthService;
use Stories\Slices\Rooms\Action\CreateRoomAction;
use Stories\Slices\Rooms\Action\GetRoomStateAction;
use Stories\Slices\Rooms\Action\JoinRoomAction;
use Stories\Slices\Rooms\Action\LeaveRoomAction;
use Stories\Slices\Rooms\Action\ReadyAction;
use Stories\Slices\Rooms\Action\StartGameAction;
use Stories\Slices\Rooms\Action\SubmitAction;
use Stories\Slices\Rooms\Service\RoomService;

$dbPath = (string) ($_ENV['DB_PATH'] ?? (__DIR__ . '/../var/data.sqlite'));
$dir = dirname($dbPath);
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

$db = ConnectionFactory::create($dbPath);
$responder = new JsonResponder();
$jwt = new JwtService((string) ($_ENV['JWT_SECRET'] ?? 'change-me'));
$authContext = new AuthContext($jwt);

$authService = new AuthService($db, $jwt);
$roomService = new RoomService($db, (int) ($_ENV['DISCONNECT_GRACE_SECONDS'] ?? 30));
$adminService = new AdminService($db);

return [
    'registerAction' => new RegisterAction($authService, $responder),
    'loginAction' => new LoginAction($authService, $responder),
    'meAction' => new MeAction($authService, $authContext, $responder),

    'createRoomAction' => new CreateRoomAction($roomService, $authContext, $responder),
    'joinRoomAction' => new JoinRoomAction($roomService, $authContext, $responder),
    'leaveRoomAction' => new LeaveRoomAction($roomService, $authContext, $responder),
    'readyAction' => new ReadyAction($roomService, $authContext, $responder),
    'startGameAction' => new StartGameAction($roomService, $authContext, $responder),
    'getRoomStateAction' => new GetRoomStateAction($roomService, $authContext, $responder),
    'submitAction' => new SubmitAction($roomService, $authContext, $responder),

    'listCardsAction' => new ListCardsAction($adminService, $authContext, $responder),
    'patchCardAction' => new PatchCardAction($adminService, $authContext, $responder),
    'listEffectsAction' => new ListEffectsAction($adminService, $authContext, $responder),
];
