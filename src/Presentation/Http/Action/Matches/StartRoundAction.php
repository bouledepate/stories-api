<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Matches;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Application\Matches\StartRound\StartRoundHandler;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Presentation\Http\Auth\AuthContext;
use Stories\Presentation\Http\Response\JsonResponder;

final class StartRoundAction extends JsonAction
{
    public function __construct(
        private readonly StartRoundHandler $handler,
        private readonly AuthContext $auth,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $matchId = $this->routeParam($request, 'matchId');

            return $this->respond($request, $response, $this->handler->handle($matchId, $this->auth->user($request)));
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}

