<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Action;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Validation\InputValidator;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Auth\Dto\UpdateProfileRequest;
use Stories\Slices\Auth\Service\AuthService;

final class UpdateMeAction
{
    public function __construct(
        private readonly AuthService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder,
        private readonly InputValidator $validator
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $user = $this->auth->user($request);
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $dto = UpdateProfileRequest::fromArray($body);
            $this->validator->validate($dto);

            return $this->responder->respond($response, $this->service->updateProfile($user->id, $dto));
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
