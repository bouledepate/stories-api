<?php

declare(strict_types=1);

namespace Stories\Shared\Http;

use Psr\Log\LoggerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;
use Yiisoft\Translator\TranslatorInterface;

final class JsonResponder
{
    private const DEFAULT_LOCALE = 'en';

    public function __construct(
        private readonly TranslatorInterface $translator,
        private readonly LoggerInterface $logger
    )
    {
    }

    /** @param array<string, mixed> $payload */
    public function respond(ResponseInterface $response, array $payload, int $status = 200, ?string $locale = null): ResponseInterface
    {
        $response->getBody()->write((string) json_encode($payload, JSON_UNESCAPED_UNICODE));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Content-Language', $this->normalizeLocale($locale))
            ->withStatus($status);
    }

    /** @param array<string, mixed> $payload */
    public function respondFromRequest(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $payload,
        int $status = 200
    ): ResponseInterface {
        return $this->respond($response, $payload, $status, $this->resolveLocale($request));
    }

    public function respondError(
        ServerRequestInterface $request,
        ResponseInterface $response,
        Throwable $error,
        int $status
    ): ResponseInterface {
        $locale = $this->resolveLocale($request);
        $code = ApiErrorCode::fromThrowable($error);
        $auth = $request->getAttribute('auth');
        $userId = (is_object($auth) && property_exists($auth, 'id') && is_string($auth->id)) ? $auth->id : null;

        $this->logger->error('http.respond_error', [
            'method' => $request->getMethod(),
            'path' => $request->getUri()->getPath(),
            'status' => $status,
            'errorCode' => $code->value,
            'errorMessage' => $error->getMessage(),
            'errorClass' => $error::class,
            'locale' => $locale,
            'userId' => $userId,
        ]);

        return $this->respond($response, [
            'error' => $this->translator->translate('error.' . $code->value, category: 'app', locale: $locale),
            'errorCode' => $code->value,
        ], $status, $locale);
    }

    private function resolveLocale(ServerRequestInterface $request): string
    {
        $preferred = trim($request->getHeaderLine('Locale'));
        if ($preferred === '') {
            $preferred = trim($request->getHeaderLine('Language'));
        }

        return $this->normalizeLocale($preferred);
    }

    private function normalizeLocale(?string $locale): string
    {
        $normalized = strtolower(trim((string) $locale));
        if (str_starts_with($normalized, 'ru')) {
            return 'ru';
        }

        return self::DEFAULT_LOCALE;
    }
}
