<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Rooms;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Application\Rooms\ListLobbies\ListLobbiesHandler;
use Stories\Presentation\Http\Response\JsonResponder;

final class ListLobbiesAction extends JsonAction
{
    public function __construct(
        private readonly ListLobbiesHandler $handler,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $query = $request->getQueryParams();

        $visibility = (string) ($query['visibility'] ?? 'all');
        if (!in_array($visibility, ['all', 'public', 'private'], true)) {
            $visibility = 'all';
        }

        $passwordFilter = (string) ($query['password'] ?? 'all');
        if (!in_array($passwordFilter, ['all', 'with_password', 'without_password'], true)) {
            $passwordFilter = 'all';
        }

        $limit = max(1, min(100, (int) ($query['limit'] ?? 12)));
        $offset = max(0, (int) ($query['offset'] ?? 0));

        return $this->respond($request, $response, $this->handler->handle($visibility, $passwordFilter, $limit, $offset)->toArray());
    }
}
