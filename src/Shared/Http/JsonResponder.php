<?php

declare(strict_types=1);

namespace Stories\Shared\Http;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Yiisoft\Translator\TranslatorInterface;

final class JsonResponder
{
    private const DEFAULT_LOCALE = 'en';

    public function __construct(private readonly TranslatorInterface $translator)
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

    public function respondError(
        ServerRequestInterface $request,
        ResponseInterface $response,
        string $message,
        int $status
    ): ResponseInterface {
        $locale = $this->resolveLocale($request);
        $code = ApiErrorCode::fromMessage($message);

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
