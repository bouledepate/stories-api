<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Stories\Shared\Http\JsonResponder;
use Stories\Slices\Rooms\Service\RoomService;

final class ListLobbiesAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly JsonResponder $responder,
    ) {
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

        return $this->responder->respond($response, $this->service->listLobbies($visibility, $passwordFilter, $limit, $offset));
    }
}
